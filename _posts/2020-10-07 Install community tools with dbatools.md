---
title: Install community tools with dbatools
tags: [dbatools, community, tools, sqlfamily]
excerpt: Take advantege of others' work and experience
lang: en
ref: communitydbatools
---

# Install community tools with dbatools

> Roses are red,  
Violets are blue,  
Community loves dbatools  
dbatools love it too

Author unknown

## what dbatools are?

dbatools.io is a set of PowerShell commands to manage SQL Server, contained in a module. Plus, it is open-source, created by people who work with the SQL Server and PowerShell for years. Some say it is a [command-line version of SQL Server Management Studio](https://www.bronowski.it/blog/2020/06/dbatools-io-command-line-sql-server-management-studio/) but I think it is more than that.

## what SQL community is?

SQL community (or [#SQLFamily](https://twitter.com/search?q=%23SQLFamily)) is a group of data professionals gathered mainly around Microsoft SQL Server.

## X’s and O’s

Those two sets of people have a common part – people who are active members of the community and who contribute to the dbatools, hence all the affection. In most cases it is a win-win situation.

## heritage

In this section I am going to present you a few community tools that are available via dbatools.

### [Install-DbaFirstResponder](https://docs.dbatools.io/#Install-DbaFirstResponderKit)

A collection of scripts originally written by people behind Brent Ozar Unlimited ([blog](http://www.brentozar.com/blog/)|[twitter](https://twitter.com/BrentOzarULTD)), and later on released as an open-source tool.

### install the FRK straight from GitHub

```powershell
Install-DbaFirstResponderKit -SqlInstance $server -Branch main -Database master -WhatIf
<#
What if: Performing the operation "Downloading zip file" on target "https://github.com/BrentOzarULTD/SQL-Server-First-Responder-Kit/archive/main.zip".
What if: Performing the operation "Copying extracted files to the local module cache" on target "LocalCachedCopy".
What if: Performing the operation "Connecting to localhost,1433" on target "localhost,1433".
What if: Performing the operation "Installing FRK procedures in master on localhost,1433" on target "master".
#>
```

#### resources

[SQL Server First Responder Kit on GitHub](https://github.com/BrentOzarULTD/SQL-Server-First-Responder-Kit)  
www.brentozar.com/responder/

### [Install-DbaMaintenanceSolution](http://docs.dbatools.io/#Install-DbaMaintenanceSolution)

A very powerful set of functions to manage maintenance activities on SQL Server (backups, indexing, checkdbs) made by Ola Hallengren.

```powershell
Install-DbaMaintenanceSolution -SqlInstance $server -Database master -InstallJobs -LogToTable -WhatIf 
<#
PS C:\dbatools> Install-DbaMaintenanceSolution -SqlInstance $server -Database master -InstallJobs -LogToTable -WhatIf 
What if: Performing the operation "Installing CommandLog.sql" on target "localhost,1433".
What if: Performing the operation "Installing MaintenanceSolution.sql" on target "localhost,1433".
#>
```

#### resources

[Sql Server Maintenance Solution on GitHub](https://github.com/olahallengren/sql-server-maintenance-solution)  
ola.hallengren.com

### [Install-DbaWhoIsActive](http://docs.dbatools.io/#Install-DbaWhoIsActive)

Adam Machanic ([blog](http://dataeducation.com/)|[twitter](https://twitter.com/AdamMachanic)) created a stored procedure without which it would be very sad when you are about to troubleshoot your SQL server.

```powershell
Install-DbaWhoIsActive -SqlInstance $server -Database master -WhatIf  
<#  
What if: Performing the operation "Downloading sp_WhoisActive" on target "DESKTOP-VDRVEN3".
What if: Performing the operation "Unpacking zipfile" on target "DESKTOP-VDRVEN3".
What if: Performing the operation "Reading SQL file into memory" on target "DESKTOP-VDRVEN3".
What if: Performing the operation "Installing sp_WhoisActive" on target "localhost,1433".
#>
```

#### resources

[sp_whoisactive on GitHub](https://github.com/amachanic/sp_whoisactive)
http://whoisactive.com

### [Invoke-DbaDiagnosticQuery](http://docs.dbatools.io/#Invoke-DbaDiagnosticQuery)

Glenn Berry ([blog](https://glennsqlperformance.com/)|[twitter](https://twitter.com/GlennAlanBerry)) changed the DBA world by combining all the useful queries in one place. Whenever there is a performance issue on the server run them and see where it hurts.

#### resources
https://glennsqlperformance.com/resources/ 
https://github.com/ktaranov/sqlserver-kit/tree/master/Scripts

### [Install-DbaSqlWatch](http://docs.dbatools.io/#Install-DbaSqlWatch)

The 'youngster' among community tools within the module. Open-source monitoring solution created by Marcin Gminski ([blog](https://marcin.gminski.net/)|[twitter](https://twitter.com/marcingminski)).

#### Resources
[sqlwatch on GitHub](https://github.com/marcingminski/sqlwatch)  
sqlwatch.io