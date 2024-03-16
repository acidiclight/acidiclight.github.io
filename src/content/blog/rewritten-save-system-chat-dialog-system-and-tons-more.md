---
title: "Rewritten Save System, Chat Dialog System, and lots more!"
description: "This post was migrated from the old website, some images have unfortunately been lost to time. We have curated all broken portions of this post and replaced them with descriptions of the content that was once there. We apologize for the broken devlog!"
pubDate: 'Jan 11 2022'
heroImage: '/assets/blog/img_GK6QkhAr6ohTo.png'
category: "Socially Distant"
tags: devlog
---

This post was migrated from the old website, some images have unfortunately been lost to time. We have curated all broken portions of this post and replaced them with descriptions of the content that was once there. We apologize for the broken devlog!

Saying that Socially Distant has gone through a major facelift over  the past few weeks would be a massive understatement and wouldn’t even  begin to describe the amount of work that’s been done in the past month.  No, not only has the game gone through a major facelift, but we’ve  unstitched and restitched the entire core codebase to be far more  flexible and extensible. That’s what this dev update’s about.

Let’s dive deep into this month’s build. Let’s start with the visual,  front-facing stuff, and work our way down into the code to the bits  that do the heavy lifting. Are you well-caffeinated? Great, then let’s  go.

## New Main Menu
Though unfinished, this is the first build of the game with the  redesigned Main Menu. Functionally, it’s still the same as the old one  from 2021. However, the layout has been substantially improved and  cleaned up.

## Backdrop and Layout Changes
The game’s menu has always had a static backdrop image, however the  new main menu will soon have an animated/video backdrop. Because of  this, we have vastly increased the amount of whitespace where the  backdrop is able to show through.

In the previous menu layout, the left side of the screen would have  been dedicated to all menu options and interactive elements – with the  right 3/4ths of the screen dedicated to community announcements.

Now, all menu elements are placed in the bottom 3rd of the screen,  with the game’s logo showing just above the menu UI. If you’re in a  sub-menu, that menu’s title text will be displayed in place of the  game’s logo.

The general layout of the menus themselves are now grid-based,  insteadof list-based. In the main menu, sub-menus (such as “Career,”  “Settings,” and “Terminate”) are placed in a horizontal row at the top  of the menu. Community announcements, as well as future information  panels, are displayed in a grid below the main menu options.

## Community Announcements
Many games I play nowadays have a massive amount of community  integration in their UIs. You’ll always see the main menu of a game when  you first launch it, so it makes sense to place community updates right  there in the menu. That’s why I’ve decided to implement them in this  build.

If you’re connected to the Internet when you launch the game, Socially Distant will download the latest announcements from the Community Forum’s Announcements section.  It’ll then display the three most recent announcements in the  “Community Forum” section of the menu. You can then click on them to  open the forum threads in your browser.

What I won’t ever do though, is pop up an annoying dialog box telling  you to read them. Maybe people have different opinions than me on this,  but I find it really annoying when I launch a game for the first time  and it obliterates me with all this other stuff I should do. Just let me  get to the menu and play the game, if I want to explore those extra  features, I will. You should still definitely consider joining the  community though, since you’ll see these devlogs right when they go  live!

## CustomizableShell and other UI facelifts
Another big focus in this build has been standardizing and  redesigning the game’s UI. Ideally, all UI elements in the game should  be set up in such a way that they can be globally styled and customized,  even by the player, but still look consistent.

This build of the game is the first to include the still-experimental and unfinished **CustomizableShell**,  an improvement on the game’s desktop UI which supports player  customization – and, above all, enforces consistency across all of the  in-game programs and tools.

In the original version of the post on the old website, there would be a screenshot of the Customizable Shell with its default skin here. That screenshot has unfortunately been lost. The original screenshot had a caption that read “Screenshot of the CustomizableShell’s default skin, with a few application windows open.”

## Customizability
This improved UI is fully customizable, even by the player. The game  supports a powerful user themeing system, and each theme can have a  light and dark mode. Themes can define application colors, window  decorator styles (the look of the borders around windows), Status Bar  skins, and can even contain light and dark Wallpapers.

Support has also been added for importing ShiftOS skins from versions  0.0.7, 0.0.8, 0.1.0, and 1.0 of the now-defunct game. ShiftOS skins  will be converted to Socially Distant’s format, allowing you to make  further edits and take advantage of new features such as dark mode.

When this post was originally written, two example ShiftOS skins were imported and screenshotted. These screenshots have also been lost. However, both a Windows 8 and Windows 8.1 skin were shown.

A new Desktop Showcase section was added to the Community Forum, where you can post screenshots of skins you’ve made for Socially Distant. These Aero Light skins can be found there as the first ever post. Skins can also be published to the Steam Workshop, though this has not been implemented in this build of the game.

## Consistency
The general visual design of Socially Distant has been made  considerably more consistent as well. By creating a set of standard UI  element prefabs in Unity called `StandardGuiPrefabs`, it  has become far easier to rapidly put together new in-game application  windows. These common UI elements all integrate with the newly-added  Customization System, enforcing a consistent visual design based on the  active skin.

Prefabbing all of the game’s UI elements also makes it trivial to  make sweeping changes to the game’s visual design without needing to  update every single application window or UI element manually. So,  having this done in this early build will dramatically speed up  development!

## Chat System
The next big feature in this build is the addition of the new **Chat System**. This is a core gameplay mechanic that allows you to interact with various NPCs through a chat conversation.

The chat system is inspired by two other games: Emily is Away and Hyperbolica.

Other hacking games I’ve played have some sort of chat mechanic in  them, however I’ve yet to see one where the player is actively involved  in the conversation. Usually, the chat mechanic is part of a broader  mission system where the player is just given tasks and NPCs discuss  what’s going on in the mission at that time.

Socially Distant’s chat system is still part of its broader  (not-yet-implemented) mission system, just like the Email System before  it. However, as a player, NPCs will actually expect you to participate  in the conversation and make decisions on what to say. Effectively, this  is an RPG-style dialog system built into a hacking game.

In fact, here are some of the mechanics that the chat system brings to the table:

 - NPCs can block you.
 - They can also become your friend.
 - Being blocked by an NPC prevents you from receiving missions from them.
 - You also cannot view blocked NPCs’ social media posts or profiles without hacking.
 - Attachments can be sent in the chat.
 - Chat states can be saved to the save file, effectively meaning that NPCs can remember what you’ve said in a previous conversation. They can also know what you’ve said to others.
 - Group conversations are possible.
 - You can start chat encounters through social media profiles.
 - Chatting with NPCs adds them to your Contacts.
 - It is possible to hack into NPCs’ social media accounts to view other chats they’ve been in.
 - NPCs can be invited to, be kicked from, or leave the chat.
 - Chat encounters can start other chat encounters.

There are definitely going to be more mechanics that come out of this chat system as well!

## Technical Details
Chat encounters in Socially Distant are scripted. They’re scripted in  a custom programming language built for the game. This language is an improved version of the one seen in [acidiclight/hamlet-redux](https://github.com/acidiclight/hamlet-redux), a rewrite of my “Cynical Hamlet” demo game.

The script files, in debug versions of Socially Distant, can be found in the `Socially Distant_Data\StreamingAssets\ChatScripts` folder in the game files. For example, the script forthe chat shown in an above screenshot is as follows:

```ini
[meta]
    id=dev_welcome_chat
    name=Welcome to Socially Distant

[members]
    akln=yes
    
[main]
    possess akln
    say "Hey, looks like you've just started a new Career." to player
    say "I don't mean to break the fourth wall, but this is a very early development build of the game."
    say "So I thought, as the developer, I would tell you a little bit about the game."
    say "How to play, where things are, etc."
    say "Because I don't feel like writing a tutorial mission."
    say "...Okay...maybe this IS the tutorial mission, but, eh, whatever."
    
    sleep 3000
    
    choice "Alright, tell me more" goto continued
    choice "Not interested" goto not_interested
    
[not_interested]
    possess player
    say "I'm not interested" to akln
    
    possess akln
    say "Alright, just let me know if you change your mind."
    
    clear_choices
    return
    
[continued]
    possess player
    say "Alright, tell me more" to akln

    possess akln
    say "Not yet implemented"
    
    return
```

For a more technical deep-dive into the structure and syntax of the language, documentation has been added for it on the no-longer-maintained Modder’s Wiki. Suffice to say, however, that the language is Turing-complete.

## New Save System
Because of the rapid additions of new gameplay mechanics, we needed to rethink the way our save system works.

In Socially Distant, saves have always been treated like a relational database of tables called `DataStores` containing vast amounts of queryable, serialized C# objects. This has not changed.

What has changed is the way the data’s serialized. This is going to  be very technical but I think one  can learn from this. Below are two  screenshots of Socially Distant save files. The left is the old format  and the right is the new one.

Originally, there were two images comparing the old save file with the new save file format inside a hex editor. The old save file format had a much higher file size.

<div class="grid grid-cols-1 md:grid-cols-2">
<div>
### Old format
In the old format, each datastore is stored as a separate datastore file. Their format is simple.

- The first 8 bytes are the file’s magic header, which is a UTF8-encoded string. The string contains hacker-speak of the word “Trixeln’t”. Why? Because I was bored and thought it was funny.
- Next is a 4-byte signed integer containing the object count. In this case, it’s 4.
- Then there’s that many UTF8-encoded strings.
- Each string is a JSON object that the game can deserialize.

The purpose of this format is to allow the game to load each object  one-by-one into the DataStore. That way, objects can be deserialized  across multiple frames in a Unity coroutine without hanging the game.

Inside the old format, there is also the playerdata file – which looks like this:

```json
{"HasSeenOobe":false,"AgentId":"7281127f-1078-4434-883c-14f77a7d07cd","LocalDeviceId":"bb2ab574-6dd1-451a-83f1-46a97f3f4615"}
```

As you can see, it’s just JSON. This file contains game state that  pertains to the player, but that does not make sense being stored in a  DataStore.  DataStores that only ever contain one object, should not be  DataStores.

</div>

<div>
### New format
The new format is slightly more advanced, but is still simple.

 - 7-byte UTF8-encoded magic number: “ritchie” – Why “ritchie”? Because that’s the name of my profile picture on Discord and the Community Forum. Ritchie is cool. Why 7 bytes and not 8? Because it’s fun.
 - Next is the playerdata length. This is an 8-byte signed integer saying how many bytes long the playerdata section is.
 - Next is the playerdata section itself. This is a BSON-encoded version of the old “playerdata” file.
 - Next is the DataStore Identifier Table Offset. This is an 8-byte unsigned integer telling the game where to look for the DataStore Identifier Table.
 - After this are all of the DataStores. Since the length is impossible to know, the DataStores section itself isn’t length-prefixed.
 - After the DataStores section is the DataStore Identifier Table Length. This is an 8-byte signed integer declaring how many DataStores are contained in the save file.
 - For each DataStore in the table, it has a UTF8-encoded string followed by an 8-byte unsigned integer. The string is the name of the DataStore, and the integer is the offset in the save file where the DataStore can be found.

When you jump to a DAtaStore offset, this is the format:

 - First is an 8-byte integer declaring the number of objects in the DataStore.
 - Then, for each object, there’s an 8-byte length prefix that you need to read.
 - This prefix tells you how many bytes to read to get the object’s BSON data.

</div>

</div>

### What are the advantages of the new format?
Before I can answer that, we should first understand what the key differences between the two formats are. So what are they?

<div class="grid grid-cols-1 md:grid-cols-2">
<div>
#### Old format

- Each DataStore is a separate file.
 - Player data is stored in a separate JSON file.
 - Each data object is serialized using JSON.
 - DataStores are identified by C# type.

</div>

<div>
#### New format

 - There is only one single “.sars” file.
 - Player Data and DataStores are stored in the same file.
 - PlayerData and DataStore objects are serialized using BSON.
 - DataStores are identified by an arbitrary name.

</div>
</div>

Now that you understand what the differences are, let’s talk about why these changes were made.

 - Serialization with JSON in the old format worked and required minimal effort to implement. However, JSON is text-based and not very space-efficient. BSON, on the other hand, is essentially just binary JSON. It has all the advantages of JSON, but is a binary format that’s far more space-efficient. It’s also the serialization format used by MongoDB.
 - Having data spread across multiple files made it easy to inspect the contents of each DataStore, but was also not nearly as space-efficient. A DataStore might only have a couple hundred bytes of data stored in it, but some filesystems might over-allocate space for the file. Consolidating everything to a single file cuts down on this nasty cluster-slack.
 - Binary data is much faster to load than text data. That means, even if the game still does load data across multiple frames, it can load more data in a single frame. That means save files load significantly faster.
 - The new format also supports snapshotting. That is, a temporary version of the save file can be encoded in RAM or a tempfile and restored later on. This is an effective way to add a Mission Checkpoint system.
 - Because DataStores can now be arbitrarily named, it is now possible to have multiple data collections that store the same type of data. More on that later.
 - Binary data isn’t human-readable, unless you really know what you’re doing. It’s easy to corrupt the save file by trying to manually edit it and cheat. If you don’t feel safe in a hex editor, then mwahaha, I’ve just forced you to play the game as intended. If you do know what you’re doing with a hex editor though, I can still at least guilt you into playing the game as intended by saying that I spent a lot of time designing this game. And….don’t be thinking I won’t be adding more cheater mitigations to the format 🙂

### About named DataStores…
It may seem trivial, but the way you name things in a save file is actually really important. You might have an `InventoryItem` class in your game’s code, and your save file might have a list of these objects stored in it. What do you name the list?

If it’s a simple game, you might not even need to name the list. You  could just store the data in whatever serialization format you choose.  But, for larger games, like Socially Distant, where people may  potentially mod the game and want to store their own data in the save  file, you suddenly do need to consider how that data is named. Why?  Because everybody needs to know where they can find their data, and  where they can safely store it – without trampling on other peoples’  data.

In Socially Distant, each DataStore was named after the C# class name of the data stored in the `DataStore`. For example, for the `Agent` data store, which contains the NPC agent data for that save’s world, the  DataStore was simply named “Agent_Data”. This worked fine for Agents,  because there is and only ever will be one Agent DataStore. But this  approach breaks down quickly, in two scenarios:

 - **You refactor your code**: You rename the Agent class to something like “NpcData”. You’ve just corrupted all previous save files without realizing it, since they don’t have an NpcData DataStore. Oops. You could rename the Agent_Data DataStore, but only for your saves. You can’t control what other players do. So therefore you cannot rename these data types.
 - **You want to have multiple DataStores storing the same type of data**: Consider the two thread-based systems in Socially Distant (Chat and Email). Both systems need a Thread and an Entity table, both systems store the exact same data in their Thread tables, but both have different data stored in their Entity tables. Ideally, they should share a single ThreadData class. But this is not possible in the old save system, leadibg to the existence of distinct ChatThread and EmailThread classes.

A better approach is to allow data stores to be arbitrarily named, which is what the new format does. That way, you can:

 - Rename a C# class but still preserve the DataStore name, so the data will still load.
 - Have a single “Threads” table for chat and email (and other kinds of) threads.
 - Remove “duplicate” C# classes (classes that store the exact same data in them and have no difference in behaviour)

Being able to do these things allows you to save space in the save  file and also remove complexity in the game’s code. So that’s why we did  it.

## Bugs and Bugfixes
Of course, this being a development build, there are for sure bugs.  But there are also fixes to previous builds’ bugs as well. Here’s what  you need to know.

### Fixes

 - Entering an invalid command or a syntax error in the Terminal would cause the shell to not print your shell prompt until hitting Enter a second time. This has been fixed.
 - The exit command has been added and now closes the Terminal.
 - Clicking on windows now brings them to the “top” of the workspace (they will appear in front of other windows)
 - Toggling Dark Mode is now possible.
 - System Settings can be accessed as an in-game program during gameplay.
 - Various placeholder strings have been removed from Neofetch.
 - The Fortune Cookie table has been replaced with non-placeholder fortunes.
 - It is now possible to launch graphical tools from Terminal.
 - The system’s hostname displays in the Terminal shell prompt now, instead of the system’s Network Map name.
 - The player system’s name is no longer hardcoded to “You”.
 - Various UI scaling inconsistencies have been fixed.
 - Terminals will now no longer persist in the Shell System when their windows are closed.
 - Auto-saving has been added.
 - Fixed a race condition where the Main Menu could load before the save system, resulting in the “Continue Career” button being missing despite a valid career save being present.
 - Fixed an issue in Steam builds being launched without Steam, where the game would load past the splash screen and then restart using Steam. The game will now restart before ever showing the game window if it detects it’s not being run by the Steam client.

### Known issues

 - Closing a Terminal using the shell’s exit command does not remove that window’s Panel Button from the UI.
 - Clicking on one of these ghost Panel Buttons willcrash the game with a C# NullReferenceException.
 - Occasionally, using the <alt>T hotkey to open a Terminal will cause the modifier key (Alt) to get stuck as active in the CustomizableShell. That means that typing the letter “t” will spawn a new Terminal even though you’ve let go of the Alt key. To fix this, just press the Alt key and immediately let go – this will reset the mod-key state in CustomizableShell.
 - On Windows, using the mod-key to perform window operations causes the host shell to play a warning sound indicating that the hotkey doesn’t exist.
 - The System Menu texture is missing in the default skin.
 - Starting a new Career in Main Menu doesn’t load into CustomizableShell. You must close the game, restart, and select “Continue Career.”
 - System Settings window refuses to open in Main Menu.
 - Community Announcements section of the Main Menu displays Discourse system threads (e.x. “About the Announcements category”) that can’t be deleted but still should not be displayed.
 - Game configuration has a tendency to not apply properly until opening System Settings once.

## Next Steps
Here’s what we’ll be working on next:

 - Mission System: Adding a few demo missions to the game, as well as setting up the Mission System itself.
 - Save File optimization: Removing duplicate types as described above, re-modelling certain DataStores to be more efficient to work with.
 - Rebranding: Redesigning the game’s logo and designing its first official Key Art.
 - System Menu: Adding the ability to exit a game, view mission acquisitions, see system notifications, modify quick settings, view player stats, etc.
 - Skill/Upgrades: Ability to upgrade your system’s hardware, acquire new hacking tools and programs, ability to earn skill points for completing various tasks in-game
 - System Tray: Notifications, status indicators, etc.

Last but not least, Weekly Dev Streams will be coming back next week as well. I’ll see you there. 🙂