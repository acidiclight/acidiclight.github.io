---
title: 'Letters to my past self: Nullable reference types'
description: 'A letter to my past self about why you absolutely should use nullable reference types.'
pubDate: 'Jan 8 2024'
category: Letters to my past self
tags: "programming, nullability, types, code"
---

I’ve been lead programmer of **Restitched** for almost two years. While it’s still hard to believe I typed that and it’s actually true, it’s given me an opportunity to learn so much more about programming than I could’ve ever expected as a kid or even as an adult going into college. Some say that, if you truly understand something, you should be able to teach it to others. This post is the start of a series of posts I’d like to write where I try to teach what I learned to my past, less-experienced, self. Maybe you’ll learn something too. So, how about we start by talking about **nullable refernce types**?

## What is a nullable reference type?

I’ll start by saying I don’t actually like the name “nullable reference types.” It feels like the sort of name that, particularly if you’re a beginner programmer, doesn’t properly explain what it means or what it’s useful for. So I’ll try to do my best to explain it. I’ll do it by breaking down each term one by one…just in case.

### What’s a type?
In many languages, particularly ones you’d actually want to use, a **type** is just a way of describing a thing. A thing could be anything, but a chair or a person are both examples of types of things. In programming, a type essentially just describes what a thing is called, what it’s made of, and what it can do. A chair is a type of thing made of legs, a seat, and a backing, and it can have things sat on it. A person is a thing that is made up of….way too many things, that can think, move around, speak, and sit in a chair.

### Reference types
If a type is a thing, then what is a reference type? Personally, I find it easier to explain by reversing it. A reference type is also just… a **type reference**. Right now, I’m a person sitting in a chair. When I say that, I’m using the word “chair” to refer to a type of thing that I’m sitting on. Essentially, that in itself is a type reference.

To that end, in programming, a reference type is just a type of thing that you’re able to refer to.

### What does nullable mean?
This is much simpler for me to explain. If we want to continue the person + chair analogy, just consider that I can simply stop sitting on this chair.

In programming, most languages have a concept of a `null` value. Sometimes it’s `nil`, `nullptr`, and in Visual Basic, it’s `Nothing`. Because that’s what it is – a reference to nothing.

## Putting it all together
When you put all three terms together, the phrase “nullable reference type” does start to make sense. It just means a reference to a type of thing, where you could in fact be referring to nothing.

## Why I don’t like the phrase
The way I explained it above is actually incorrect. It may seem intuitive that a nullable reference type is just a reference to a type of thing where that thing could be nothing, but the problem is that all reference types (at least in C#) are nullable from the start. If you’ve ever used any programming language ever where reference types are a thing, you’ve almost certainly crashed your program because you tried to access a null reference. If reference types weren’t nullable by default by my definition, this would not be possible. This is why, when I first learned about nullable reference types, I thought the idea was completely stupid.

So let’s try again. What **actually is** a nullable reference type?

## Here’s some code.
My up-coming hacking game, [Socially Distant](https://sociallydistantgame.com/), has a windowing system in it that lets me create draggable windows for all of the in-game hacking tools you’ll end up using. Let’s look at an example of what a Window class would look like.

```cs
public class Window
{
    public string Title { get; set; }
    public Sprite Icon { get; set; }
    public bool CanClose { get; set; }
    public bool CanResize { get; set; }
    public bool CanHide { get; set; }
    public Panel Content { get; set; }

    public void Open()
    {
        // ...
    }

    public void Close()
    {
        // ...
    }
}
```

The window class has two methods and several properties. The two methods let you open and close the window, and the properties let you set attributes on it such as the window’s title and icon, and what UI is displayed inside it.

I might create a window like this:

```cs
Panel terminal = CreateTerminal();
Sprite terminalIcon = GetIcon("Terminal");

var window = new Window
{
    Title = "Terminal",
    Icon = terminalIcon,
    CanClose = true,
    CanResize = true,
    CanHide = true,
    Content = terminal
};

window.Open();
```

This works great. We create the terminal’s UI somehow, we get a window icon for it, create a window with the right attributes assigned, assign the terminal and icon to the window, and open it.

The issue is, you don’t know what the various methods I’m calling actually do under the hood. For example, when we call `GetIcon()` to fetch the icon for the Terminal, we don’t know where it’s getting the icon from. What if there just isn’t one called “Terminal”? In this case, the method may return a `null` reference.

Furthermore, we don’t know what the Icon property’s setter will do on the window. Nor do we know what happens when we call the Open method. Without either relying on code documentation or actually reading source code, we can’t guarantee that 1) we will never get a null reference back from GetIcon, and 2) the window class will be okay with having a null reference for the icon property. This scenario is exactly what nullable reference types are for.

## Why nullable reference types are awesome
The power of nullable reference types comes out when you treat reference types as never being allowed to be null by default. Some languages, notably **Kotlin**, enforce this at compile-time by throwing an error if you try to assign null to a reference type that isn’t explicitly marked as nullable. In C#, you can get this same effect by treating the nullability warning as an error.

When designing an API, nullable reference types force you as a developer to explicitly state whether null is allowed to be used as a value for a reference assignment. When using someone else’s API, nullable reference types act as a signal for you to expect null as a possible value. It replaces the need for a documentation comment or to look at exactly how the assigned reference is used, by building this information directly into the language you’re using.

Let’s rewrite the Window class with nullability in mind.

```cs
// opt into nullable reference types in this file
#nullable enable

public class Window
{
    public string? Title { get; set; }
    public Sprite? Icon { get; set; }
    public bool CanClose { get; set; }
    public bool CanResize { get; set; }
    public bool CanHide { get; set; }
    public Panel Content { get; set; }

    public void Open()
    {
        // ...
    }

    public void Close()
    {
        // ...
    }
}
```

Look at the Title and Icon properties. Notice how, unlike before, their types now have a question mark next to them. In C# and other languages, this signals to the compiler that this is a nullable reference type. In C#, you also need to opt into nullability either at a project level or file level, and opting in at a file level is done with a preprocessor directive. You may also opt out of nullable reference types with `#nullable disable` if your project has them turned on, but if I’m reviewing your code and see that, there’s a stabby knife with your name on it and it’s in my hand.

The above code clearly documents that the Window class is completely fine with havving no title or icon assigned. We may also want to annotate the return type of GetIcon() with a nullable reference type indicator as well, to document that the return value may be null.

```cs
public Sprite? GetIcon(string iconName)
{
    return null;
}
```

We’re not done yet – because the `Content` property of a window is not nullable. This means that a proper reference to a Panel must be assigned. But our code doesn’t guarantee that it will be. This is where a lot of peoplem including myself, will have probably gotten confused on how to handle this. This also makes dealing with legacy code and APIs, such as the entire Unity scripting system, a royal pain. But I still think that this is worth the trouble, since if nullable reference types are used correctly, debugging a NullReferenceException or writing null-checks out of panic becomes far less of a thing you need to worry about.

In this case, fixing the Content property is simple. Since it’s a requirement for a window to have content on it, we can require it as part of the window’s constructor. If you can’t provide a valid reference to some UI to show in the window, you can’t create a window.

```cs
public class Window
{
    public string Title { get; set; }
    public Sprite Icon { get; set; }
    public bool CanClose { get; set; }
    public bool CanResize { get; set; }
    public bool CanHide { get; set; }
    public Panel Content { get; private set; }

    public Window(Panel content)
    {
        this.Content = content;
    }

    public void Open()
    {
        // ...
    }

    public void Close()
    {
        // ...
    }
}
```

The Window class is now set up to work with nullability in mind. It’s okay to not specify an icon, and to not specify a title, but we must specify some content to show in the window. We’ve also prevented a window’s content from being changed directly, which in most cases is also what you want. But if you do want the non-nullable reference type to also be mutable, you could still leave the setter as public and the constructor’s parameter will still be required. This means that, short of blantantly ignoring nullability warnings (remember that knife in my hand when I review your code), it’s impossible for the Content property to ever have a null reference.

## You should program with nullability in mind. Always.
Whether you’re designing or using an API, you should program with nullability in mind. I’ll even go as far as to say that, in languages where nullability is an opt-in compiler warning, you should opt in project-wide and treat the warning as an error. Doing so forces you to program defensively, such that null reference accesses are stopped long before the code leaves your screen, while still letting you stay confident knowing that, at the very least, the type references you’re creating and passing around are in deed valid. Which means far less needless “if thing is null then crash” checks, and more code that actually does productive work for the end-user running your program.

The only time that use of nullability causes serious issues is when you are working with code that was written before the concept existed. In this case, if you wrote that code, fix it. But if you didn’t and thus can’t fix it, then you should treat any types going into the legacy code as non-nullable and any types coming out as nullable. This won’t catch all possible null reference accesses, but at least it won’t be your code at fault.