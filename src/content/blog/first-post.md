---
title: 'Plans for a rewrite – why, and what went wrong with the current code'
description: 'Although Socially Distant sounds like a simple game idea at first glance, the programming required to make it work isn’t. Being an operating system simulation game at its core, it comes with many of the same challenges associated with building an actual desktop environment – with the added complexity of turning that into a game, and adding other functionality required by a game such as a robust save system, while also making the game run well and be visually appealing. It is quite an undertaking for a small team of hobbyists, and it’s time for us to regroup.'
pubDate: 'Feb 17 2023'
category: Socially Distant
tags: devlog
---

Although Socially Distant sounds like a simple game idea at first glance, the programming required to make it work isn’t. Being an operating system simulation game at its core, it comes with many of the same challenges associated with building an actual desktop environment – with the added complexity of turning that into a game, and adding other functionality required by a game such as a robust save system, while also making the game run well and be visually appealing. It is quite an undertaking for a small team of hobbyists, and it’s time for us to regroup.

## Our current situation
Development of the game hasn’t progressed for some time now. The project has remained dormant, with no significant changes or progress since late 2022. Unfortunately, this is ironically the result of trying to move too quickly as a team while focusing on the wrong aspects of development first. This has resulted in many of us, including myself as lead programmer and creative director, just not knowing where to go with the project and what to do with the current code. It’s essentially the Longhorn Effect, for those of you who like to look back at Windows development history. As a codebase, Socially Distant is held together with the preverbial duct-tape and that’s not up to my standard as a programmer.

## My plan to fix it
I’ve learned quite a lot about Unity and C# in general thanks to working on Trixel Creative’s Restitched, which uses the same engine and general architecture as Socially Distant, as a result of me being lead programmer of both titles for some time. In fact, both games share an audio system in the form of TrixelAudio, an open-source Unity audio framework also written by yours truly. Needless to say, I’ve learned a lot – and I’m confidently I could do better with Socially Distant this time around. That’s why I’ve chosen to rewrite the game from scratch, still using Unity. One could almost get a laugh by calling it “Socially Distant: Restitched,” but I’ll refrain.

## Fixing more than just the code
The codebase isn’t the only problem that needs to be solved – in fact, it’s not nearly the hardest either. There are other problems with Socially Distant that I aim to fix with this fresh start as well, mostly related to project structure and organization.

I’d like to start by making sure there’s a **clear end-goal** for the project, as well as concise and easy-to-reach milestones that the community can track progress with. That way, we all know where we’re headed and how we’re going to get there.

I also want to build the game with maintainability in mind from the start. This means making it easy for other people to join the project and for me to come back to it with fresh eyes and not feel lost in the code. Many portions of the Socially Distant source code today haven’t been substantially touched since older projects of mine from 2015, and I don’t know how they work.

## How we’ll approach development this time
Although this is in no way a concrete or set-in-stone plan, I’ll give you all an idea of what development will ideally look like for new Socially Distant.

First stage will be putting together a solid foundation and codebase. The game won’t look unique or pretty, nor will it have a story or any reason to play it beyond testing, but it’ll be a workable prototype we can further polish later. It’ll be more like building a basic operating system/desktop environment instead of a game.

Once we have a solid “OS” to work with, we’ll gameify it and bring in things like the game’s story. It still won’t look like a pretty “OS,” but it’ll work well and it’ll be a playable game.

Once we have a game, we’ll focus on making it look visually interesting. Luckily, I have a perfect idea in my head of what it’ll look like – so I’ll get it on paper, and by the time we need to worry about it, we’ll hopefully be able to get the resources needed to bring this idea to life.

Obviously, plans change over time – so the most important part is how we **begin** things. The foundation of Socially Distant’s code is important to get right, and we’ll design it in a way that can adapt to change.

## What happens to the old code?
Parts of it are salvageable, but we’ll likely use it as a spiritual base rather than directly re-using old code in the new game. The old code is on a private Git repository, and will be archived. Assets from the old game, such as the logo and wallpaper, will come along with us for the ride, but most of the code won’t.

## So….that’s that.
I’ve got a lot of work to do as a programmer, and there’s no better time to start than now. So let’s start.