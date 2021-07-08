---
ref: dbatoolshowtocontribute
title: dbatools.io – how to contribute?
excerpt: Take advantage of others' work and experience
tags: [dbatools, community, tools, sqlfamily, wip]
categories: [english, dbatools]
lang: en
locale: en-GB
toc: true
permalink: /blog/:year/:month/:title/
---

## What dbatools.io is?

That's what you can find on their [website](https://dbatools.io/commands/).

> dbatools is a free PowerShell module with over 500 SQL Server best practice, administration, development and migration commands included. Currently, other components of SQL Server such as SSIS, SSRS and SSAS are not supported, but they are part of the overall goal.
The high number of commands may seem overwhelming but think of it like learning SQL Server. Start with the basics like Logins, Jobs, or Backup/Restore and later on, you can move on to Extended Events. To make it easier, we've included [simplified usage examples](https://dbatools.io/getting-started) that can help you get started.
Want to help build dbatools? We invite you to [join](https://dbatools.io/slack) the [team](https://dbatools.io/team).

Despite being aware of the tool for some time I only used the module for past two years. Without prior knowledge of the PowerShell you can start managing your estate with useful and efficient commands.

But… there will be a moment in your life when you hit a wall… where dbatools won't help you because they are missing the functionality, or you simply find a bug. What to do? How to live with that? Be brave and…

## Contribute to dbatools.io – introduction

The [team](https://dbatools.io/team) gives you [a guide](https://dbatools.io/contributing) how to do it and what's needed. I am sure they will address any questions you have via their recommended channels.

Since 2018 I've made some [small contributions](https://github.com/sqlcollaborative/dbatools/graphs/contributors), but my beginnings were not that shiny 🙂 Thankfully I had a pleasure to sit next to Rob Sewell ([blog](https://sqldbawithabeard.com/)\|[twitter](https://twitter.com/sqldbawithbeard)) who showed me the way to contribute. Rob also introduced me to another active contributor – Jess Pomfret ([blog](https://jesspomfret.com/)\|[twitter](https://twitter.com/jpomfret)) who helped me to understand how things are done in dbatools universe.

Meeting all those excellent people who share what they know with all of us has triggered this little thing in my head – I want to give something back to the community.

## Contribute to dbatools.io – tl;dr

If you're in a hurry look at this short animation. Otherwise, skip to the next paragraph.

<iframe width="560" height="315" src="https://www.youtube.com/embed/YjaTUXjdPDs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Contribute to dbatools.io – how to

I am going to show you my attempt to make a small change that addresses an issue raised on dbatools GitHub – all can be done in a browser without using PowerShell or any other tool.

### #1 Go to Issues on GitHub

First of all, the issues (opened/closed) can be found on the Issues page of the repository.

![dbatools@GitHub - main repo](/assets/images/dbatools_contribute_01_main_repo.png)

### #2 Find an issue to fix

Locate the issue that needs fixing, either by browsing all issues, or opening a new one, or go straight to the specific one you spotted earlier.

![dbatools@GitHub - find an issue](/assets/images/dbatools_contribute_02_issues.png)

### #3 Read the issue & the discussion

Sometimes the issue has a long discussion, so it is worth to go through the whole thing to better understand the nature of it.

In my case it was a simple thing that the example of one function was showing the parameter that does not exist.

![dbatools@GitHub - understand the issue](/assets/images/dbatools_contribute_03_issues_example.png)

### #4 Get a plan

As every issue has a different form finding a way that fits them all is a challenge. The issue I picked up looks like that:

>Azure SQL example for Write-DbaDbTableData references a non-existent parameter: ‘Credential'

I followed this little checklist:

find the example with non-existent parameter [-Credential]
verify the parameter does not exist for Write-DbaDbTableData function [-Credential]
check for parameters that might be similar (could be a typo)
make changes

### #5 Investigate

*All this could be done without leaving GitHub page, but I've decided to check the examples and parameters on dbatools.io too (I just like the docs).*

Let's see the examples (I've cheated as I've searched for word a phrase "-Credential" on the docs page):

![dbatools@GitHub - investigate the issue](/assets/images/dbatools_contribute_04_issues_example_investigate.png)

Here we have example #6 has the parameter called [-Credential]. Sweet.

```powershell
PS C:\> Write-DbaDbTableData -SqlInstance AzureDB.database.windows.net -InputObject $DataTable -Database mydb -Table customers -KeepNulls -Credential $AzureCredential -BulkCopyTimeOut 300
```

Let's go see the parameters at the top of the page:

![dbatools@GitHub - investigate the issue](/assets/images/dbatools_contribute_05_issues_example_investigate2.png)
None of the parameters is called [-Credential], we do see [-SqlCredential] though.

### #6 Fix the issue

Going back to GitHub repo. Now we need to fix the example within the Write-DbaDbTableData function. Let's find it under functions.

![dbatools@GitHub - fix the issue](/assets/images/dbatools_contribute_06_main_repo_functions.png)
Sitting at the very bottom. Click the link and open it up.

![dbatools@GitHub - fix the issue](/assets/images/dbatools_contribute_07_main_repo_functions_example.png)
Once the file is open on GitHub you can edit its content via browser.

![dbatools@GitHub - edit the code](/assets/images/dbatools_contribute_08_edit.png)
The area becomes editable and you can start your contribution.

Note: This will not edit the original code on dbatools – do not worry. It will create a dbatools fork under your GitHub account. When the change is submitted it will be written to a new branch in your fork. From there you can create a pull request (PR).

![dbatools@GitHub - change the code](/assets/images/dbatools_contribute_09_edit2.png)

In our case the fix would be to replace [-Credential] with [-SqlCredential] as you can see on the pictures below. After file is changed, we would need to describe what was done and why.

![dbatools@GitHub - describe the change](/assets/images/dbatools_contribute_10_edit3.png)

All done and ready to propose the change (remember, it is still in your repository).

![dbatools@GitHub - describe the change](/assets/images/dbatools_contribute_11_propose_change.png)

### #7 Create the pull request

The issue has been identified and fixed. It all took place in your own repository, so nothing has changed in the dbatools code. Since we want to help the community, we would need to push that change out. To do so, we will open a pull request.

First, we will have a change to compare the changes we've made. This screen will show you the direction of the change between branches. In my case
MikeyBronowski/dbatools (fork of dbatools) patch-1 (branch in that fork)
to
sqlcollaborative/dbatools (main repo) development (default branch).

![dbatools@GitHub - describe the change](/assets/images/dbatools_contribute_13_open_pull_request2.png)

Next step is to create a PR. Is as simple as hitting that green button above and filling out the form from the template.

The dbatools issues have a template that you can use, so it helps to understand what the change is.

In my example I've simply said what I've done, what kind of change it was and its purpose as well as the approach.

![dbatools@GitHub - describe the change](/assets/images/dbatools_contribute_12_open_pull_request.png)

### #8 Congratulations! You've contributed

If everything is OK with the pull request and its linked change the team will merge it into the development branch and you will be notified.

Congratulations, you've just contributed to the dbatools module. It may not be the biggest in number of code lines, but every contribution is valuable and important.

As a [#SQLFamily community](https://twitter.com/hashtag/sqlfamily) member I am grateful for your work, so the tool gets better and better with every commit 🙂

Thank you,
Mikey

PS: Thanks to Chrissy LeMaire ([blog](https://blog.netnerds.net/)\|[twitter](https://twitter.com/cl)) who suggested the blog post.
