---
title: 'Socially Distant May 2022 Devlog'
description: 'This is the first ever entry in the monthly Socially Distant Devlog series.'
pubDate: 'May 17 2022'
heroImage: '/assets/blog/img_kmdhDj2XcIkrM.png'
category: Socially Distant
tags: devlog
---

Hey there, I’m Michael, lead programmer and community manager of  Socially Distant – and if you’re reading this, then chances are you’ve  just stumbled on this up-and-coming game and are probably wondering how  development’s going right now. Either that or you’ve been here a while  and are wondering the same thing. Either way, I hope that I can deliver.

Usually, these devlogs would be in the form of dev update videos on  my personal YouTube channel. But I find it’s much easier to share  progress through a text-based article like this, since I can go more  in-depth into the game’s programming and techniques. Much more so than  in a video. So this’ll be the first of many. In the future I’d like to  make these available through a future Patreon as an early access sort of  thing, but this one’s a freebie 🙂 – So let’s get started.

## Linux Support
Recently, I’ve switched my main development system to Linux. I run  Arch by the way, yes, I said it. Up until this point, Socially Distant was able to run somewhat fine under Valve’s **Proton** compatibility layer, however I do not see this as acceptable given this  is a new game that can easily be ported to Linux natively. What better  time to do it than when I’m actually running Linux on my main system?

Though a proper native Linux build has yet to be compiled, the game  can be seen running inside the Unity Editor natively in the image below.

![Socially Distant running on Linux](/assets/blog/img_xOAJvs5WsHbTJ.png)

This mostly involved upgraing Unity to the latest 2021 LTS, with  minimal work on my part. Though there are some game-breaking bugs that I  need to iron out.

 - Mouse scrolling sensitivity is really low.
 - Scrolling is reversed.
 - Discord Rich Presence fails to connect.
 - File select dialogs do not work.

It shouldn’t be too hard to iron these out, though.

## The Great UI Redesign
Socially Distant is a hacking game that takes place inside of a Linux-based operating system, simply called the **Socially Distant OS**. Needless to say, the look, feel and layout of this game’s UI is incredibly important. Without a good user experience and user interface, this game cannot exist.

Throughout development, we have gone through many prototypes and  concepts for what Socially Distant OS should be like. It’s a tough, but  important, thing to get right. But it’s time to come up with something  consistent, cohesive, and final. That’s what these next few months are  all about.

### The VM metaphor
I’ve always liked hacking games that try to immerse you completely in  the experience. If done right, you should be able to easily forget that  you’re playing a game. Socially Distant OS should start to feel as  though it is actually installed on your system, that it is real.

I can’t just outright build an operating system from the ground up  and force-install it on your computer. But what we can do is try to  design the game’s UI in a way where it feels like you’re booting into a  virtual machine, from the moment you click “Play” in Steam.

That means going away with the traditional main menus and loading  screens of past builds of the game. Instead, we’re thinking in terms of  login screens, boot screens, and even a first time setup screen. With  that in mind, the entire game’s UI is being reimagined to create a more  VM-like experience.

### cONCEPT aRT
Some concepts have been made for various UIs in the game by **The Pixel Polygon** and **11pixels**.

![Socially Distant first-time setup in dark mode - Concept](/assets/blog/img_xEaeILJT4fuae.png)

![The Pixel Polygon grey-boxing the main menu](/assets/blog/img_2ndhSc0ILi9Re.png)

![More gray-boxing](/assets/blog/img_nAklKcwXUrsOA.png)

![A more visual concept of the main menu](/assets/blog/img_c4fZ8SHG8DJ4h.png)

## Saving The World
A large portion of the game’s code needed to be rewritten to  accomodate these upcoming UI changes. While we were at it, I went ahead  and completely rewrote the game’s core save system.

Rewriting the save system was necessary to provide a much more  streamlined development experience and to help further prevent issues  related to save corruption across future game updates, or as new  features are added.

Here are some of the changes that were made:

 - **Revisions** were added to the save format, which allow the game to know what data is actually available in a given save file. This ensures that, when a new feature is added, the game can skip loading data for that feature in an older save file.
 - **BSON serialization** was removed. For the programmers out there, BSON stands for “Binary JSON” and is exactly what it sounds like. Unfortunately, it is very limited in what data types are supported. We wrote our own serialization code this time to accomodate support for revisions and our custom data types.
 - **Planfiles have been added**. Planfiles are used to seed the game’s world with initial data, including all of its NPCs and hackables. Creating planfiles allows you to create custom game modes/stories, and we have full intentions on making that a friendly experience.
 - **Better home directory management**: There’s too much to talk about here, but basically this means that your in-game computer’s file system is now far more reliable and less directories are forced into read-only.

## A Great Loss…
It’s always been a debate during development – will we use a floating  window manager or a tiling window manager? Linux users will know the  difference. The decision has been very divisive among the existing  community, and even among the dev team. However, the team has decided to  go with floating windows and really work to make them work well in a  hacking game.

## So that’s basically it!
Quite a lot of work has been done in both the UI and programming  departments. I’m excited for what’s to come in the next devlog, but this  is a great start.