---
ref: chocolatey_intro
title: Poznaj chocolatey
excerpt: 
tags: [polski, chocolatey, community, tools]
categories: [polski, tools, chocolatey]
lang: pl
locale: pl-PL
permalink: /blog/:year/:month/:title/
---

Recently, I have got a new laptop and decided to get all new software with the scripts – to avoid clicking and downloading stuff manually. I have heard about Chocolatey in the past but had no opportunity to use it. A new laptop was a great excuse to play with some chocolate.

# What is chocolatey?
Everyone I know loves chocolate, so in my mind, you cannot go wrong with anything **choco-**. Here is what they say about themselves on their [website](https://chocolatey.org/how-chocolatey-works);

> Chocolatey is a software management solution that gives you the freedom to create a simple software package and then deploy it anywhere you have Windows using any of your familiar configuration or system management tools.
> Designed to be simple to use, it provides a suite of powerful features that scale for your existing, and your future infrastructure. Power and flexibility in one simple product, that’s Chocolatey.

# Install chocolatey
The official guide can be found [here](https://chocolatey.org/install), as well as [extensive installation course](https://chocolatey.org/courses/installation/installing). If you are in a hurry, just follow this quick steps:

```powershell
# Run Get-ExecutionPolicy. If it returns Restricted, then run Set-ExecutionPolicy AllSigned or Set-ExecutionPolicy Bypass -Scope Process.
PS C:\> Get-ExecutionPolicy
<#
Restricted
#>

# Bypass. Nothing is blocked and there are no warnings or prompts.
PS C:\> Set-ExecutionPolicy Bypass -Scope Process -Force

# Now run the following command:
PS C:\> [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
<#
Getting latest version of the Chocolatey package for download.
Getting Chocolatey from https://chocolatey.org/api/v2/package/chocolatey/0.10.15.
Downloading 7-Zip commandline tool prior to extraction.
Extracting ...
Installing chocolatey on this machine
...
#>


# confirm the choco is in the house
PS C:\> choco -v
<#
0.10.15
#>
```

# Install packages

Great, you have got yourself some new shiny tool. What now? How to get other stuff?

One way would be to go to the [Chocolatey library](https://chocolatey.org/packages) and search for your package.


There is a way to get that list via PowerShell too:

```powershell
PS C:\> choco list
```

Once you find what you need, there is an easy way to install the packages.

```powershell
# This is just a sample from my build.
PS C:\> choco install slack -y
PS C:\> choco install docker-desktop -y
PS C:\> choco install grammarly -y
PS C:\> choco install sql-server-management-studio -y
PS C:\> choco install greenshot -y
PS C:\> choco install opera -y
PS C:\> choco install vscode -y
...
# There are even some vscode extensions
PS C:\> choco install vscode-powershell -y
PS C:\> choco install vscode-gitlens -y
PS C:\> choco install vscode-docker -y

# to see the installed packages run (note the -localonly switch)
PS C:\> choco list -localonly
```

You have probably noticed that switch at the end -y, and here is the reason :

```powershell
<#
The package putty.install wants to run 'chocolateyInstall.ps1'.
Note: If you don't run this script, the installation will fail.
Note: To confirm automatically next time, use '-y' or consider:
choco feature enable -n allowGlobalConfirmation
#>
```

# Upgrade packages

Getting newer version of the packages or even chocolatey itself is very easy too.

```powershell
# upgrade multiple packages at once
PS C:\> choco upgrade greenshot grammarly -y
<# One package was already on the latest version
Chocolatey upgraded 1/2 packages. 
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
#>

# to upgrade chocolatey run
PS C:\> choco upgrade chocolatey -y
```

# Uninstall packages
Removing packages follow the same pattern.

```powershell
# it is good to have a package installed, when showing how to uninstall it
PS C:\> choco uninstall putty.install

<# otherwise...
Uninstalling the following packages:
putty.install
putty.install is not installed. Cannot uninstall a non-existent package.
...
```

after a "fix" it should look like that

```powershell
...
putty.install v0.73
 Running auto uninstaller...
 Auto uninstaller has successfully uninstalled putty.install or detected previous uninstall.
 putty.install has been successfully uninstalled.

Chocolatey uninstalled 1/1 packages. 
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
#>
```

# Some issues

Since it was my first time with Chocolatey I observed some issues, but so far only two were noticeable enough to make a note. The first one was a missing **-y** switch, which is not a typical issue but stopped me for a while.

The other thing is that Chocolatey sometimes stalls for a long time. Like a really long time. At some point, after waiting 30 minutes I had to kill the choco process and that helped.

# More information

While I was doing my research on this subject I have found few interesting resources:

[List of the parameters with descriptions](https://gist.github.com/yunga/99d04694e2466e017c5502d7c828d4f4) in a short form. Kendra’s Kendra Little ([blog](http://sqlworkbooks.com/)|[twitter](https://twitter.com/Kendra_Little)) blog post about [Installing Redgate SQL Toolbelt with Chocolatey](https://littlekendra.com/2019/12/02/installing-redgate-sql-toolbelt-with-chocolatey/) + some interesting links and [Chocolatey GUI](https://chocolatey.github.io/ChocolateyGUI/about).

Thank you,

Mikey
