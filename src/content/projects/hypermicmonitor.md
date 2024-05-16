---
title: hypermicmonitor
description: "Command-line utility for controlling Mic Monitoring on the HyperX Cloud Alpha Wireless headset"
startDate: "May 15 2024"
type: Utility
links:
 - name: Source code
   url: https://github.com/acidiclight/hypermicmonitor
   icon: mdi:github
 - name: AUR Package
   url: https://aur.archlinux.org/packages/hypermicmonitor-git
   icon: mdi:linux
trailers:
 - name: Demo video
   youtube: HEHGJC0jfoI
 - name: AUR installation
   youtube: ZNT325NNId4
---

This is a simple command-line tool I wrote for controlling the Mic Monitoring feature on my HyperX Cloud Alpha Wireless headset.

Mic Monitoring is a feature of many gaming headsets. It lets you take the audio your mic hears, and pipe it directly through the headset's earpieces. It's done in hardware, so it doesn't speech jam you. For me, I use it to help me type more accurately despite my blindness, since I rely on the sound and feeling of keys being pressed.

The problem is, like many headsets, mine requires a driver and crappy software to control features like mic monitoring. These drivers usually only work on Windows, and if you're extremely lucky, macOS. But almost never Linux. And even if you get Linux support, these apps are generally very bloated and annoying to use. Just opening HyperX NGINUITY on my system drops the framerate to below 20, yuck.

So I used Wireshark to reverse-engineer the protocol that NGINUITY and the headset use to communicate. I then wrote hypermicmonitor to replay the packets sent to the headset when turning on/off Mic Monitoring.

### How to install
The correct way to install it is to build it from source with `dotnet publish`. But, if you're on Arch Linux, you can install my AUR package:

```bash
yay -S hypermicmonitor-git
```

There are no binary releases of hypermicmonitor at the time of writing.

### How to use
I have plns to expand hypermicmonitor's features, but for now...

```bash
# Print help info
hypermicmonitor

# Turn monitoring on
hypermicmonitor true 

# Turn it off
hypermicmonitor false
```

### Bugs
There are some bugs

 - When re-plugging the headset, your mic monitoring setting gets forgotten. Blame HyperX for that, it's a bug in their driver too.
 - On Linux, udev rules for the headset don't apply automatically until you re-plug the receiver or reboot your device.
 - After a receiver re-plug, the first packet sent by hypermicmonitor will be ignored by the headset. You'll need to run the command a second time.