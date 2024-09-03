---
title: "The Plight of Blind Windows"
description: "I had to use Windows for an extended amount of time, and it really grinded my gears. And I promised you guys this was next."
category: "Gear Grinders"
pubDate: "Sep 2 2024"
---

This is the story of a severely visually impaired Ritchie trying to use his computer. Our story starts with a problem causing Ritchie to need to troubleshoot. As a hail-mary effort, it involved replacing a well-configured usable Linux desktop with the barely-functioning goliath turd that is....Microsoft Windows. It is a story of pain, suffering, and a comical revelation.

## Our story starts before first boot.
I have a very long history installing Windows on my own. I know my way around it, I'm used to installing Linux which can definitely seem a lot harder. There is no reason why, if I weren't blind, that I shouldn't be able to have a functioning Windows system in under 10-15 minutes...from no OS whatsoever to being able to write this article in Notepad. But because of my blindness, installing Windows on a modern system is a major effort that, in some cases, involves me calling a friend so they can help me do it. Let's look into why.

Installing Windows is simple enough to do. Grab your flash drive, plug it in, boot from it, hit "Install," agree to an EULA, select the right disk drive, and boom. Wait a while, go through first-time setup, and you're at a desktop in a reasonable amount of time.

If you're me, however, and cannot see well, then the most dangerous part of the install process - selecting your disk drive - where you can actually cause data loss if you choose the wrong one by accident - is also the least blind-accessible part of installing Windows. That's right - the **most important** part that **needs to be as user-friendly as possible** is borderline unusable if something is wrong with your eyesight.

Thanks to Dominic Hayes for providing the screenshots you'll see in this section....except for the second-last one, that's stolen from some random site that had the image.

![Screenshot of the disk selection screen in Windows XP (2001)](https://cdn.acidiclight.dev/original/1X/bb0dbbdae4e8ba8e4421cdaa74e2104c1a1532f0.png)

If you're as old as me, or you're a nerd and get bored sometimes, then the above screen should be very familiar to you. That's the disk partitioning screen from Windows XP's setup. For the most part, every version of Windows since 1985, as well as versions of DOS from even earlier, share a UI somewhat similar to this. This is the starting point. And by absolutely no means is this blind-friendly. It stands to reason you would expect things to get better after this point with the introduction of a GUI, but here's my take on this ancient text mode UI from 30 years ago.

| The Good | The Bad |
|----------|---------|
| Because this is standard VGA text mode, the font size will be absolutely huge even on a 4K screen. | Gray on blue is not an ideal contrast ratio |
| This is keyboard-navigatable, there is no mouse cursor to lose. | Neither is blue on gray, as used on the controls strip and the highlighted option. |
| | No audio, so no way to screen read it. |

Unless you absolutely need a screen reader, or really struggle with the blue background, even someone with vision as bad as mine could very reasonably get through this without data loss.

...But it's 2024, which is AT LEAST a few years later than 2007, so we should probably look at installing Vista instead.

![Screenshot of Windows Vista (2007)](https://cdn.acidiclight.dev/original/1X/cd04b7b83a51c29dbe873b691076c439d1fa1fbd.jpeg)

Bam. Quite the difference. We have gone from a text-mode UI to a graphical installer based on the Aero design language. And as far as ease of use, it's genuinely better. And....for what it's trying to convey, it looks really nice. It pulls off the Aero look within the constraints of low-memory software-rendered environments.

However... we have gone from a somewhat-poor-contrast dark color scheme with minor color-related accessibility concerns, to Aero. And Aero is not easier for me to read. It just isn't. I can't read the font, I can't read the dark text on the light background, I can't tell where the highlight is unless I strain, there's now a mouse cursor I have to worry about not losing, and the keyboard control has been compromised solely by the fact that GUIs often do not translate well to keyboard-only input. They just don't, that's why hotkeys are used instead.  And remember that we are still partitioning a hard drive here. This needs to be blind-accessible, because the alternative is data loss.

Obviously, this was 2007 and the first time Windows has had a graphical installer all the way through, and that's fine. Things could get better. .......... but it has been 17 years and... they didn't.

This was Windows 7, two years later.

![Screenshot of Windows 7](https://cdn.acidiclight.dev/original/1X/c1171377b136a2ccece2366a878164032d637fa6.jpeg)

Wallpaper and logo change, but otherwise an identical UI.

This is Windows 8, four years later. But it's also Windows 10 and earlier builds of Windows 11. You know what that means.

![Screenshot of Windows 8, 10, and 11](https://cdn.acidiclight.dev/original/1X/43b5a1e6b736332d27f2e69c4f9b05987444c09b.png)

Just like Windows 7, this is the same UI as Vista other than a branding change. We've gone from a wallpaper to solid blue, the Aero decorations no longer look translucent, and....something else....looks different. Things seem......smaller.

And there's a reason for this. Windows 8 came out in 2012, which was during the transition from legacy BIOS systems to UEFI firmware. This was also when the Surface started to exist, as well as other Windows tablets, that had portrait screens. The advantage to UEFI firmware over BIOS in this context is the firmware can more easily talk to your device's GPU. This means you are no longer constrained by standard VGA, and can more-easily render boot managers and installation environments at higher and different resolutions. 

And for the two people clean-installing Windows on their tablet that want to do that in portrait mode, that's great. You can read it without breaking your spine. I also suppose there are people like Brodie Robertson who have vertical monitors that could benefit from this, but I'd also wager that people like him have no interest installing Windows on bare metal anyway. I don't have a vertical display or the need for a weird aspect ratio, but what I do have, is a UEFI firmware that is perfectly happy rendering UIs at native resolution on my 3840x2160 monitor. **Sighted people** struggle to read that.

Clearly, Microsoft was willing to spend the time to write an EFI framebuffer driver for the modern Windows setup screen. Windows 8 was also the first build of Windows to have fullscreen zoom and full Desktop Window Manager (DWM, the thing that makes Aero work) functionality even with the standard framebuffer driver built into Windows that you get when you haven't installed your GPU's bloatware yet.

The problem is, although you have access to basic necessities like zooming into the screen with a lens even in Vista, and access to High Contrast and even Narrator if you have sound drivers, **none of this is packaged as part of Windows PE.** And what is Windows PE? You guessed it - the mini operating system used to run that fucking disk partitioning UI! And other than branding changes and support for higher resolutions, **this has not been fixed for over 17 years.** This is unacceptable! Seriously! Linux and macOS have had this figured out since 2012! Did you know I can boot into any Linux distribution that runs KDE Plasma in their installation media, and zoom into the screen **as much as I want?**

## And it's not getting better.
I'm not sure what a Neowin is but that watermark isn't part of the point I'm trying to make. Here's a screenshot of a newer Windows 11 partitioning screen.

![Screenshot of Windows 11 but newer](https://cdn.acidiclight.dev/original/1X/06b0464b7c22b5cb5f7d8f73cb31c3ac73e17f44.png)

I have never seen this in person, even though I installed Windows just yesterday with a fresh USB. I suspect Media Creation Tool just doesn't download this build yet.

But the UI is different. Aero is gone, the highlight of the selected disk is much more obvious and that's great. Some font sizes have been increased, notably the heading text, but not any of the elements that actually matter like the names of each disk.

If you've developed muscle memory for the previous UI, you can forget about it because everything's been flipped vertically.

And the use of the Windows Basic decorations suggests a lack of DWM in the build, which means fullscreen Magnifier is likely not functioning. Since I don't have this build, I can't go in and check the files to verify. But given everything from Vista to the previous Windows 11 variant never had any accessibility tools as part of the PE environment, **I highly doubt they're present now.**

## This suggests a lack of care.
You can't tell me Microsoft has done not one, but **two**, major UI redesigns of the Windows installation flow and tell me that entire team has **forgotten** about blind accessibility. To tell me that would suggest that nobody is willing to program the UI because the old Windows XP variant works well enough. And if that's not the case, then it would suggest that bundling the accessibility tools in the build just isn't technically possible. That's provably incorrect, however, because they were talented enough to make fake Aero look real. Oh, and need I remind you, that the other desktop operating systems figured that out.

I wholeheartedly believe that Microsoft just doesn't care about making Windows user-friendly anymore. I could have excused Vista's installer because of the time it was released, and the hardware constraints it was limited to. But at this point it feels nothing like that.

I won't comment on the privacy issues and borderline malware-like functionality Windows has, other than to say that it exists and there's a reason it does. All I'll say is there's a reason Windows Product Activation no longer locks you out of booting the system after 30 days, and that reason is also the reason there are advertisements for other Microsoft products all over Windows. Microsoft just simply **does not care** how Windows was acquired and installed onto your system as long as their product continues to make profit for them, and let me tell you, Windows is no longer the product. If you think that it is, then I'd urge you to check your system's privacy settings and say that with a straight face again. You, your usage metrics, your data, and your browsing habits, and your willingness to pay for OneDrive and other products in the ecosystem, are the product.

The reality is, I can ask a friend to help me through these shitty installers. There are things I can do to work around the utter lack of blind accessibility tools inside them. And chances are, if I bought a prebuilt system, all of that is moot - as the OEM partitioned the drive for me.

Microsoft knows that this will be worked around, and if I'm enough of a power user to workaround the accessibility issues on my own (which I am), then I'm also enough of a power user to bypass all of their attempts to make me their product. So I don't offer any reason for them to dedicate a team to making it easier for me to install Windows. If it were good will making that decision, it would have been done several years ago as it was in the open-source community with Linux.

## None of this matters.
I want to be independent and to be able to install an operating system on my own without help or without fighting it. But I don't make Microsoft profitable, and that's the bottom line. This article will make no difference, I'll be lucky if it gets a few boosts on Mastodon. And I haven't even covered what it's like to use Windows blind **after** it has been installed. But it pisses me off, and damnit, why shouldn't it?

And before you tell me...

1. that I can unplug drives that I don't want to overwrite by accident
2. that I can ask a friend for help
3. that I can use another operating system

You're missing the point. I'm using Windows because I need to, not because I want to. I don't want to bug somebody to help me read drive names OR figure out which drive is the correct one to pick. And I don't want to take apart my computer and remove NVMe drives just to install a fucking operating system, because I'm blind, and doing that is even harder. The purpose of an operating system is to provide user-friendly access to a machine so the human can complete whatever task they are trying to complete. If my operating system actively makes it harder for me to **install it**, then it is failing at its goal. Windows is doing that, and that's the point.

## And this really grinds my gears.
Microsoft,

You are a multi-billion-dollar company with an extremely large market-share in the desktop operating system space. You know damn well there are people whose lives depend on Windows, and you and I both know you can afford to fix the accessibility problems in it. Stop putting it off. This shouldn't even be about money, about profitability, or about target demographics. It should be as simple as elevators being legally mandated in high-rise buildings because some people depend on wheelchairs. Software needs to be accessible, not only to the blind but to as many people as possible. You absolitely have the resources to make sure Windows is. 

And, again, let me be clear: This article only covered the experience doing a clean install. I will admit the need to do this is rare. But this is not the only part of Windows that needs to be fixed. I'm not done. And until whatever issue I was having under Linux has been troubleshooted and fixed, if I'm going to be forced to use Windows then I'm going to be vocal about everything about it that **pisses me off**.

So while I'm still here, you know what really grinds my gears? You, Windows. **Screw you.**