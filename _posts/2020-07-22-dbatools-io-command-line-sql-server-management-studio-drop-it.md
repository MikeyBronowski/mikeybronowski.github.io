---
ref: dbatools_ssmscmd_drop
title: dbatools.io = command-line SQL Server Management Studio - Drop it
excerpt: 
permalink: /blog/:year/:month/:title/
tags: [english, dbatools, community, tools, sqlfamily]
categories: [english, dbatools, series]
lang: en
locale: en-GB
toc: true
---

![dbatools.io = command-line SQL Server Management Studio](/assets/images/dbatools_ssmscmd.png)

This post is part of the series showing practical usage examples. The main post covering links to all posts can be found here: [dbatools.io = command-line SQL Server Management Studio: Table of contents](https://www.bronowski.it/blog/2020/06/dbatools-io-command-line-sql-server-management-studio-table-of-contents/).

One note before we start dropping objects on the SQL Server. The dbatools commands support a -WhatIf switch (more about that [here](https://docs.microsoft.com/en-us/exchange/whatif-confirm-and-validateonly-switches-exchange-2013-help)). I would encourage you to test it out, especially with commands that are removing things.

## Drop database

Who does not like to drop databases? Or, better, who have not dropped the database accidentally? That part is for all of you DbDroppers.

In this very first example, I will demonstrate how the -WhatIf switch works. For the other commands, I am going to put the WhatIf message only.

![Remove-DbaDatabase](/assets/images/dbatools_ssmscmd_0401_db.png)

### [Remove-DbaDatabase](https://docs.dbatools.io/#Remove-DbaDatabase)

```powershell
# use the command with -WhatIf switch
Remove-DbaDatabase -SqlInstance $server -Database TheDatabaseToDrop -Confirm:$false -WhatIf

<# See what is going to be done
What if: Performing the operation "KillDatabase" on target "[TheDatabaseToDrop] on [localhost,1433]".
#>

# now, drop the database without a confirmation prompt -Confirm:$false
Remove-DbaDatabase -SqlInstance $server -Database TheDatabaseToDrop -Confirm:$false

<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : 4dc570825344
Database     : TheDatabaseToDrop
Status       : Dropped
#>
```

## Drop login/user/role

Keep the ball rolling and drop some logins, users, even roles. The SSMS screens will look very similar, so I am going to skip some of them.

![Remove-DbaLogin](/assets/images/dbatools_ssmscmd_0402_login.png)

### [Remove-DbaLogin](https://docs.dbatools.io/#Remove-DbaLogin)

```powershell
# drop the login
Remove-DbaLogin -SqlInstance $server -Login LoginToDrop -Confirm:$false 
# What if: Performing the operation "KillLogin" on target "[LoginToDrop] on [localhost,1433]".

<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : 4dc570825344
Login        : LoginToDrop
Status       : Dropped
#>
```

![Remove-DbaDbUser](/assets/images/dbatools_ssmscmd_0403_dbuser.png)

### [Remove-DbaDbUser](https://docs.dbatools.io/#Remove-DbaDbUser)

```powershell
# drop the user
Remove-DbaDbUser -SqlInstance $server -Database TheDatabaseToDrop -User UserToDrop

#What if: Performing the operation "Removing user from Database [TheDatabaseToDrop]" on target "[UserToDrop]".

<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : 4dc570825344
Database     : TheDatabaseToDrop
User         : [UserToDrop]
Status       : Dropped
#>
```

![Remove-DbaDbRoleMember](/assets/images/dbatools_ssmscmd_0404_dbrolemember.png)

### [Remove-DbaDbRoleMember](https://docs.dbatools.io/#Remove-DbaDbRoleMember)

```powershell
Remove-DbaDbRoleMember -SqlInstance $server -Database TheDatabaseToDrop -User UserToDrop -Role db_owner

# What if: Performing the operation "Removing User UserToDrop from role: [db_owner] in database [TheDatabaseToDrop]" on target "[localhost,1433]".
```

### [Remove-DbaDbRole](https://docs.dbatools.io/#Remove-DbaDbRole)

```powershell
# in a very similar way we can drop the database roles
Remove-DbaDbRole -SqlInstance $server -Database TheDatabaseToDrop -Confirm:$false

# What if: Performing the operation "Remove role [DbRoleToDrop] from database [TheDatabaseToDrop]" on target "[localhost,1433]".
```

### [Remove-DbaServerRole](https://docs.dbatools.io/#Remove-DbaServerRole)

```powershell
# ... or server roles
Remove-DbaServerRole -SqlInstance $server -ServerRole ServerRoleToDrop -Confirm:$false

# What if: Performing the operation "Dropping the server-role named ServerRoleToDrop on " on target "".

<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : 4dc570825344
ServerRole   : ServerRoleToDrop
Status       : Success
#>
```

## Drop agent job/step

Once we dropped all the databases, and logins, why not to cleanup some SQL Agent jobs.

![Remove-DbaAgentJobStep](/assets/images/dbatools_ssmscmd_0405_jobstep.png)

### [Remove-DbaAgentJobStep](https://docs.dbatools.io/#Remove-DbaAgentJobStep)

```powershell
# drop the step
Remove-DbaAgentJobStep -SqlInstance $server -Job JobToDrop -StepName StepToDrop

# What if: Performing the operation "Removing the job step StepToDrop for job JobToDrop" on target "localhost,1433".
```

![Remove-DbaAgentJob](/assets/images/dbatools_ssmscmd_0406_job.png)

### [Remove-DbaAgentJob](https://docs.dbatools.io/#Remove-DbaAgentJob)

```powershell
# drop the whole job
Remove-DbaAgentJob -SqlInstance $server -Job JobToDrop

# What if: Performing the operation "Removing the job JobToDrop from [localhost,1433]" on target "localhost,1433".

<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : 4dc570825344
Name         : JobToDrop
Status       : Dropped
#>
```

That was quite a cleaning service – we have dropped few interesting objects.

Thank you,

Mikey
