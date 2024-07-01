---
title: Hacking the XNA Asset File Format
description: "I needed to do some cursed stuff with XNA game asset files. Here's how I did it."
pubDate: "Jun 30 2024"
category: Reverse engineering
---

Recently, I started [porting Socially Distant from Unity to MonoGame](https://github.com/sociallydistantgame/sociallydistant/issues/8) for several reasons best explained in a future article. That port is well underway, but one of the big challenges was porting the game's Content Manager. Socially Distant recently started using Unity asset bundles, which don't exist in MonoGame and there's no equivalent. So what's a poor Ritchie to do about that without completely rewriting the game's Content Manager? I'll tell you what a Ritchie does, he starts reverse-engineering. Let's talk about that.

## A short history lesson
If you were an Xbox kid back in the 360 days, you may remember the Xbox Live Arcade. A lot of the games on there were made by indie developers, using the long-defunct XNA Game Studio 4. If you don't remember those days, then you may know of at least a few games that also used it - Terraria and Hacknet.

When XNA was retired, two new projects were spun up by the community. For absolute compatibility with the original XNA, there was FNA to the rescue - this is what Terraria and Hacknet were ultimately ported to. For completely new games, and games that want to target mobile, there's MonoGame. While FNA and MonoGame have different goals (FNA to stay XNA-compatible, MonoGame to be a superset of XNA), they share a mostly-identical API.

As a result of this legacy, all three platforms use the exact same file format for shipped game assets. For this reason, I will now refer to MonoGame and FNA as XNA - because in this case, it doesn't matter which one you're using.

## How XNA Stores Assets
Let's say you have three game assets. A texture of Ritchie, a sound effect of a fart, and a shader for a bloom effect.

As a developer, you place these files in a well-known location in your project. You then tell XNA how to read and process these files, and then you tell it to build them when you build your game.

When built, the assets will typically be copied to a `Content` folder in your game's build output. If you look at this folder, you will see three `.xnb` files named after the three assets we mentioned earlier. These are the asset files you ship with the game.

Then, in your game's code, you may load the Ritchie texture like this:

```csharp
public class MyGame : Game
{
    private Texture2D ritchie;
    
    public Game()
    {
        Content.RootDirectory = "Content";
    }
    
    protected override void LoadContent()
    {
        base.LoadContent();
        ritchie = Content.Load<Texture2D>("Ritchie");
    }
}
```

And if all goes well, your game starts, loads the Ritchie texture, and you can render it. Great.

## Limitations and the problem I needed to solve
While this workflow is great for small and static games (games where all the needed assets are known at dev-time), there are some serious limitations with the XNA content pipeline if you're used to full game engines like Unity.

### No discovery system
Assets are loaded by path, by you. This means you need to know exactly where they are before you can load them. This makes it hard to implement DLC and user mods, since you'll need to write your own code to find those assets. With DLC, you can absolutely bundle the assets with the game, but that's not the case with mods.

A discovery system solves this problem by doing the heavy lifting for you. It will locate and catalog all assets in various well-known locations you (or your engine) define(s). This lets you do things like query all missions in the game.

### No virtual filesystem
Outside of exceptional cases like mobile or console where you don't have filesystem access, XNA expects assets to be stored on disk as individual files. This is great if you know the path to the asset. Even a discovery system can work with this.

However, in some cases, this isn't enough. Sometimes you want to load assets from a package or compressed folder (for example, reading assets in a Steam Workshop package). Without a virtual filesystem, you need to unpack these assets onto disk and load them as regular files. This takes time, disk IO, and disk space. It can be done, but is yucky.

With a virtual filesystem, you can still absolutely load individual assets from disk. But you can also read assets from packages, compressed folders, encrypted packages, and even the Internet, if you wanted to. The virtual filesystem abstracts all of that away, and allows the game to load those assets **as if** they were just regular files.

### No Type Discovery
This is part of what's needed for a discovery system, and XNA lacks this. In order for you to load an asset, you must know at compile-time what kind of asset it is. Is it a texture? Is it audio? Is it a font?

Without type discovery, you can't ask what kind of asset is in an asset file. You must *try* to load the asset in, have it fail, or have it succeed and then have to immediately unload it. This is very wasteful, not to mention slow.

## Solving the issues one at a time
I needed to solve all three of these issues while porting Socially Distant. And you bet your ass I did.

### Virtual filesystem
This is extremely easy. XNA lets you subclass its `ContentManager` class and override the `OpenStream` method. This method takes an asset path, and you are expected to return a readable `Stream` for XNA to load the asset from.  Socially Distant has its own implementation of a VFS as needed by the in-game operating system, so I piggybacked off that.

```csharp
using SociallyDistant.Core.OS.FileSystems;

namespace SociallyDistant.Core.ContentManagement;

public sealed class ContentPipeline : Microsoft.Xna.Framework.Content.ContentManager
{
    private readonly IVirtualFileSystem vfs;
    
    public ContentPipeline(IServiceProvider serviceProvider) : base(serviceProvider, "/")
    {
        var memoryFileSystem = new InMemoryFileSystem();

        this.vfs = new PipelineFileSystem(memoryFileSystem);
    }

    protected override Stream OpenStream(string assetName)
    {
        return vfs.OpenRead(assetName);
    }
}
```

Then, getting XNA to use it is as simple as the following code in the `Game` constructor.

```csharp
Content = new ContentPipeline(this.Services);
```

Congrats, we've now added a virtual filesystem to XNA's content pipeline and can now read from anything we have a VFS driver for.

### The discovery system
No code yet for this, but it's easy.

After mounting all VFS drivers, asset discovery is as simple as recursing through the directory tree and reading the type data off each asset file. Then you keep track of it in an in-memory database. If reading from a custom package format, you could even store part of the database in the package file itself.

### Type discovery
XNA has no built-in API for determining what's inside an asset. It's just not possible. Or is it? Because it obviously needs to know how to read the file, which means the file must store some information about how it should be read. The real problem is there's no public API for reading that information.

Solving this problem requires some reverse-engineering of the `.xnb` file format.

## Understanding XNB files
Since we can't rely on any existing API for dealing with these pesky `.xnb` files, is it possible that we could write that code ourselves? It turns out that, yes, it is. If you're up for some hacking.

Understanding the XNB format itself is easy enough. [There is archived documentation of the binary format on GitHub.](https://github.com/SimonDarksideJ/XNAGameStudio/wiki/Compiled-(XNB)-Content-Format). Download the archive on that page, and there's a nice little Microsoft Word file containing everything you could possibly know about an XNA asset file. Someone in my community converted it to HTML, and I have published the HTML version [over here](/stuff/xnb.html).

So, using a random texture asset from my copy of Hacknet, I got to work writing a custom XNB reader.

### Reading the file header
When writing a file loader, you must always determine whether you're given a file that actually makes sense. This is why many file types have a format identifier at the start of the file. XNB is no exception, it starts with three ASCII bytes that happen to read `XNB`. The next byte after that is the platform identifier, which is irrelevant in our case. So, assuming we're reading it with a C# `BinaryReader`, here's what that code looks like.

```csharp
// Expected format identifier
private static readonly byte[] expectedFormatIdentifier = new byte[]
{
    (byte)'X',
    (byte)'N',
    (byte)'B'
};

// Struct to hold the file header info
private struct HeaderInformation
{
    public byte PlatformIdentifier;
    public byte FormatVersion;
    public XnbFlags Flags;
    public uint CompressedSize;
    public uint DecompressedSize;
}

[Flags]
private enum XnbFlags : byte
{
    None = 0,
    HiDefProfile = 0x01,
    Lz4Compressed = 64,
    LzxCompressed = 128,
    Compressed = LzxCompressed | Lz4Compressed
}

// Reader code
byte[] formatIdentifier = reader.ReadBytes(3);
if (!formatIdentifier.SequenceEqual(expectedFormatIdentifier))
    throw new FormatException("The data in the XNB stream does not appear to be an actual XNB file.");

HeaderInformation header = new();
header.PlatformIdentifier = reader.ReadByte();
```

That's great, now we know we're reading an XNA asset.

The next byte tells us the format version, which must be either 4 or 5. But we can safely skip validating that in our case.

```csharp
header.FormatVersion = reader.ReadByte();
```

Now it's onto that `XnbFlags` enum. This tells us how to interpret the rest of the data in the file. The available flags aren't well-documented, but a quick look at the MonoGame source code gave me all the info we need. We need to determine whether the asset is Lzx-compressed, Lz4-compressed, or uncompressed.

```csharp
header.Flags = (XnbFlags)reader.ReadByte();
```

Regardless of the compression type, we read the compressed filesize.

```csharp
header.CompressedSize = reader.ReadUInt32();
```

If, and only if, either of those two compression flags are set, we then read the file's decompressed size. If the file isn't compressed, this won't be present - so we can treat the compressed size as the decompressed size.

```csharp
if (header.Flags.HasFlag(XnbFlags.LzxCompressed) || header.Flags.HasFlag(XnbFlags.Lz4Compressed))
    header.DecompressedSize = reader.ReadUInt32();
else
    header.DecompressedSize = header.CompressedSize;
```

And that's all we need for reading the header!

### A small problem...
What's all this talk about compression? And where's the info about what's actually inside an asset? We've read the file header, and none of that info is inside it. At this point, we have hit a roadblock because, according to the file's specification:

> If the file is compressed (flag bit 0x80 is set), data from this point on is packed using the Xbox XMemCompress API

There's that Xbox heritage kicking in. And this is a problem, because I'm on Linux. Linux is not Windows, and Linux is ABSOLUTELY not an Xbox. XMemCompress just doesn't exist. To make matters worse, this isn't the only compression format used in the wild. So even if I had access to that API, I likely can't read other XNB files using different compression methods.

So here's the deal.

MonoGame's source code tells me everything about how to decompress these files. It has to, because it also has to read them. The problem is, these reading routines are completely opaque and hidden from the game developer. There's no way to modify them, there's no way to use them directly either. The only way I could touch any of this code at runtime is by forking MonoGame, and that means I now have to maintain it. And maybe my build isn't ABI-compatible with any NuGet packages I happen to use. This is hell.

### A little self-reflection...
So I took a deep breath. I thought for a moment. I remembered that I wrote a modding system for the game that uses C#'s reflection system to find mod code, even if it's marked as private. I then remembered that you just cannot out-Ritchie the Ritchie, even if the programming language you write your code in allows you to try.

Maybe MonoGame has two `Stream` implementations that can decompress these compressed XNB files. Maybe they marked those classes as `internal` so you can't instantiate them at compile time. But it's open-source, and not obfuscated, so I know what types I'm looking for.

If the file is Lzx-compressed, we need `MonoGame.Framework.Utilities.LzxDecoderStream`. For Lz4-compressed files, we need `Lz4DecoderStream` in the same namespace.

```csharp
private static readonly Type lzxDecoderStreamType = typeof(Microsoft.Xna.Framework.Content.ContentManager)
    .Assembly.GetType("MonoGame.Framework.Utilities.LzxDecoderStream")!;
private static readonly Type lz4DecoderStreamType = typeof(Microsoft.Xna.Framework.Content.ContentManager)
    .Assembly.GetType("MonoGame.Framework.Utilities.Lz4DecoderStream")!;
```

Hippity hoppity, your internal type data's now my property.

We can then use the MonoGame source code as a reference for writing a reflection-based constructor for these streams, based on the file header we just read.

```csharp
private Stream OpenContentDecoder(HeaderInformation header)
{
    if (header.Flags.HasFlag(XnbFlags.Lz4Compressed))
    {
        return (Stream) Activator.CreateInstance(lz4DecoderStreamType, new object[] { xnbStream })!;
    }
    else if (header.Flags.HasFlag(XnbFlags.LzxCompressed))
    {
        return (Stream)Activator.CreateInstance(lzxDecoderStreamType,
            new object[] { xnbStream, (int)header.DecompressedSize, (int)header.CompressedSize - 14 })!;
    }

    return xnbStream;
}
```

> **Note:** When dealing with the Lzx compression mode, we need to pass in two parameters as `int` values. These parameters are known in the file header, the first one is the decompressed file size and the second is the compressed filesize minus 14 bytes. We subtract the 14 bytes because that's the size of the file header. Why we need to do that is beyond me, ask the megacorp that wrote this file format.
 
With that out of the way, we can open a BinaryReader on top of the decoder stream and read the file's body.

### Finally discovering the asset types
We want to know what content is in the asset file. Looking at the specification, this data isn't directly stored in the file. However, there is a Content Reader Table at the very start of the file's body. This table tells XNA what .NET classes can be used to actually unpack the asset, all of which must derive from `Microsoft.Xna.Framework.Content.ContentReader<T>`. Knowing this, we should easily be able to use reflection to find out what that `T` is. I'll give you a hint, it's exactly what we're looking for - the type of asset stored in the file.

So, how do we read that info?

Well, first we need to figure out how large the table is. This is stored as a `7BitEncodedInt`, whatever the fuck that means. I made an educated guess, and it turns out that it's just a signed byte.

```csharp
sbyte contentReaderCount = bodyReader.ReadSByte();
```

Testing this on a random Duck texture from Hacknet, we get a value of 1. This means our file header is being read correctly, we're decompressing the file properly, and my educated guess got a 100% final grade. 

Knowing this, we can loop through and read the content reader table.

```csharp
string[] readerTypeNames = new string[contentReaderCount];
for (var i = 0; i < readerTypeNames.Length; i++
{
    // ???    
}
```

Reading each entry is easy, it's documented in the spec. First we read a .NET type string, then we read a 32-bit int that's irrelevant to us.

```csharp
readerTypeNames[i] = bodyReader.ReadString();
reader.ReadInt32(); // skip it
```

We can now close the file.

## Resolving the content types
So we can read the content reader table of an XNB file, that's great. But we don't want to know how to read the assets in the file, we want to know what assets are in the file. All we have right now is a list of strings representing assembly-qualified .NET types for XNA content readers.

Well, all of these content readers will subclass `ContentReader<T>` directly. And, knowing the API for creating custom content readers, `T` will be the type of asset being read by the reader. So we just need to load the types and reflect over their base class's type parameters. Right?

Well, yes - with some nuance. It turns out that there are some MINOR differences between a MonoGame asset, an FNA asset, and an XNA asset. The differences being how these type names actually map to .NET assemblies. If you try to resolve an XNA or FNA content reader in MonoGame, it'll fail because MonoGame is made of a single `MonoGame.Framework` assembly. FNA and XNA use separate assemblies, none of which are named `MonoGame.Framework`, and none of which exist in MonoGame. I don't expect to be loading ancient XNA assets or any assets from Hacknet into Socially Distant, but it'd be nice if I could handle this edge case anyway since I don't know where your modded assets came from. However we can take advantage of the fact that the C# namespace and type names will be the same across all three SDKs.

So here's the code I wrote to resolve these type names:

```csharp
private Type? GetContentType(string readerTypeName)
{
    Type? readerType = Type.GetType(readerTypeName);

    if (readerType == null)
    {
        // Try again, with a name-only lookup.
        string name = readerTypeName.Split(", ").First();
        readerType = AppDomain.CurrentDomain.GetAssemblies()
            .Select(x => x.GetType(name))
            .FirstOrDefault(x => x != null);
    
        // Still null? We're fucked.
        if (readerType == null)
            return null;
    }

    Type? readerBase = readerType.BaseType;
    if (readerBase == null)
        return null;

    if (readerBase.GenericTypeArguments.Length != 1)
        return null;

    return readerBase.GenericTypeArguments[0];
}
```

First, we try to read the type string as an assembly-qualified type. If the correct assembly is present in our current app domain, which will be the case if we're an FNA game loading an FNA asset, this will succeed.

```csharp
Type? readerType = Type.GetType(readerTypeName);
```

If not, we'll get null. So we can try looking up the type by C# class name instead, which involves querying each assembly in the AppDomain for any matching type. We use the first non-null result. If we don't get any hit, then we assume that the asset is just incompatible with the game and return null.

```csharp
if (readerType == null)
{
    // Try again, with a name-only lookup.
    string name = readerTypeName.Split(", ").First();
    readerType = AppDomain.CurrentDomain.GetAssemblies()
        .Select(x => x.GetType(name))
        .FirstOrDefault(x => x != null);
    
    // Still null? We're fucked.
    if (readerType == null)
        return null;
}
```

If you know your way around .NET, you'll know that assembly-qualified type strings are comma-separated strings. Everything before the first comma is the C# type name, including namespace. So that's the reason behind that yucky-looking `string.Split()`.

If all goes well, and we haven't failed and bailed, then we now have a valid content reader type. We can use reflection to get its base class.

```csharp
Type? readerBase = readerType.BaseType;
if (readerBase == null)
    return null;
```

If that comes back as null, I have no idea why or how but we'll treat the asset as unloadable. Because it is.

Now we can look at the type parameters of the base class. If there's one, then it's that `T` we're looking for.

```csharp
if (readerBase.GenericTypeArguments.Length != 1)
    return null;

return readerBase.GenericTypeArguments[0];
```

Throwing that same Hacknet duck texture in to test, even though Socially Distant uses MonoGame, I was successfully able to determine that the duck texture is a valid `Texture2D` without ever needing to load the actual texture. And that's type discovery. Especially since the only thing that tipped _me_ off about it being a texture was that it was in a folder called `Sprites`.

## Problem solved.
Now that I can identify the types of assets stored in single `.xnb` files at runtime, this means I can implement Unity-like asset bundles complete with a type database, and even let you upload them to Steam Workshop. I can read them using my virtual filesystem, and I didn't have to write any custom tools for creating the xnb files themselves nor did I have to write my own asset loader routines. This means that this whole system is compatible with any NuGet package I happen to use, or any MonoGame pipeline extension I happen to write.

The only caveat is this will only work in MonoGame. Anyone using FNA, or god forbid, XNA for some reason, will need to deal with those pesky decompression streams. The method I used is only possible in MonoGame.

Anyway, I have a game to port. And if you like what I do and want to support me through the porting effort, feel free to [support me on Patreon](https://patreon.com/acidiclight). Because this cursed reverse-engineering of ancient Microsoft file formats requires a lot of coffee. :) 