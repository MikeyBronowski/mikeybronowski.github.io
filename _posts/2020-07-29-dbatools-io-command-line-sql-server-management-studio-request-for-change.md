---
title: dbatools.io = command-line SQL Server Management Studio - Request for change
tags: [dbatools, community, tools, sqlfamily]
excerpt: 
lang: en
ref: dbatools_ssmscmd_change
permalink: /:year/:month/:title
locale: en-GB
---
![dbatools.io = command-line SQL Server Management Studio](dbatools_ssmscmd.png)

This post is part of the series showing practical usage examples. The main post covering links to all posts can be found here: [dbatools.io = command-line SQL Server Management Studio: Table of contents](https://www.bronowski.it/blog/2020/06/dbatools-io-command-line-sql-server-management-studio-table-of-contents/).

dbatools commands used in this post:

* [Rename-DbaDatabase](https://www.bronowski.it/blog/2020/07/dbatools-io-command-line-sql-server-management-studio-request-for-change/#Rename-DbaDatabase)
* [Set-DbaDbOwner](https://www.bronowski.it/blog/2020/07/dbatools-io-command-line-sql-server-management-studio-request-for-change/#Rename-DbaDatabase)
* [Set-DbaDbCompatibility](https://www.bronowski.it/blog/2020/07/dbatools-io-command-line-sql-server-management-studio-request-for-change/#Rename-DbaDatabase)
* [Set-DbaDbRecoveryModel](https://www.bronowski.it/blog/2020/07/dbatools-io-command-line-sql-server-management-studio-request-for-change/#Rename-DbaDatabase)
* [Set-DbaDbQueryStoreOption](https://www.bronowski.it/blog/2020/07/dbatools-io-command-line-sql-server-management-studio-request-for-change/#Rename-DbaDatabase)
* [Set-DbaTempDbConfig](https://www.bronowski.it/blog/2020/07/dbatools-io-command-line-sql-server-management-studio-request-for-change/#Rename-DbaDatabase)
* [Rename-DbaLogin](https://www.bronowski.it/blog/2020/07/dbatools-io-command-line-sql-server-management-studio-request-for-change/#Rename-DbaLogin)
* [Set-DbaLogin](https://www.bronowski.it/blog/2020/07/dbatools-io-command-line-sql-server-management-studio-request-for-change/#Rename-DbaLogin)
* [Set-DbaAgentJob](https://www.bronowski.it/blog/2020/07/dbatools-io-command-line-sql-server-management-studio-request-for-change/#Set-DbaAgentJob)
* [Set-DbaAgentJobStep](https://www.bronowski.it/blog/2020/07/dbatools-io-command-line-sql-server-management-studio-request-for-change/#Set-DbaAgentJob)
* [Set-DbaAgentJobOutputFile](https://www.bronowski.it/blog/2020/07/dbatools-io-command-line-sql-server-management-studio-request-for-change/#Set-DbaAgentJob)
* [Set-DbaAgentJobOwner](https://www.bronowski.it/blog/2020/07/dbatools-io-command-line-sql-server-management-studio-request-for-change/#Set-DbaAgentJob)
* [Invoke-DbaCycleErrorLog](https://www.bronowski.it/blog/2020/07/dbatools-io-command-line-sql-server-management-studio-request-for-change/#Invoke-DbaCycleErrorLog)
* [Set-DbaErrorLogConfig](https://www.bronowski.it/blog/2020/07/dbatools-io-command-line-sql-server-management-studio-request-for-change/#Invoke-DbaCycleErrorLog)

## Change database
The reasons to alter the database might be as many as different users. Some want to rename the old database, or maybe change the owner or recovery model after restoring the database. Enabling features like Query Store is also common. Most of this can be done from the Database Properties screen and as well with dbatools.

### SSMS
![Rename-DbaDatabase](dbatools_ssmscmd_0501_db.png)
dbatools: [Rename-DbaDatabase](https://docs.dbatools.io/#Rename-DbaDatabase)

```powershell
# rename the database
Rename-DbaDatabase -SqlInstance $server -Database ChangedMyMind -DatabaseName IDidItAgain
<#
ComputerName   : localhost
Database       : [IDidItAgain]
DBN            : {ChangedMyMind}
FGN            : {}
FNN            : {}
InstanceName   : MSSQLSERVER
LGN            : {}
PendingRenames : 
SqlInstance    : e6928404da5d
Status         : FULL
#>
# the database name is changed, but the files stay the same
Get-DbaDbFile -SqlInstance $server -Database IDidItAgain | Select-Object Database, LogicalName, PhysicalName | Format-Table
<#
Database    LogicalName       PhysicalName                             
--------    -----------       ------------                             
IDidItAgain ChangedMyMind     /var/opt/mssql/data/ChangedMyMind.mdf    
IDidItAgain ChangedMyMind_log /var/opt/mssql/data/ChangedMyMind_log.ldf
#>
```
```powershell
# rename the database using templates.
Rename-DbaDatabase -SqlInstance $server -Database IDidItAgain -DatabaseName "Oops<DBN>" -FileName "<FNN>_ItIsAMess" -LogicalName "<LGN><DATE>"
<#
ComputerName   : localhost
Database       : [OopsIDidItAgain]
DBN            : {IDidItAgain}
FGN            : {}
FNN            : {/var/opt/mssql/data/ChangedMyMind.mdf, /var/opt/mssql/data/ChangedMyMind_log.ldf}
InstanceName   : MSSQLSERVER
LGN            : {ChangedMyMind_log, ChangedMyMind}
PendingRenames : {@{Source=/var/opt/mssql/data/ChangedMyMind.mdf; Destination=\var\opt\mssql\data\ChangedMyMind_ItIsAMess.mdf; ComputerName=localhost}, 
                 @{Source=/var/opt/mssql/data/ChangedMyMind_log.ldf; Destination=\var\opt\mssql\data\ChangedMyMind_log_ItIsAMess.ldf; ComputerName=localhost}}
SqlInstance    : e6928404da5d
Status         : PARTIAL
#>
# see the changes
Get-DbaDbFile -SqlInstance $server -Database OopsIDidItAgain | Select-Object Database, LogicalName, PhysicalName | Format-Table
<#
Database        LogicalName               PhysicalName                                       
--------        -----------               ------------                                       
OopsIDidItAgain ChangedMyMind20200728     \var\opt\mssql\data\ChangedMyMind_ItIsAMess.mdf    
OopsIDidItAgain ChangedMyMind_log20200728 \var\opt\mssql\data\ChangedMyMind_log_ItIsAMess.ldf
#>
```
### dbatools: [Set-DbaDbOwner](https://docs.dbatools.io/#Set-DbaDbOwner)
```powershell
# change the database owner 
Set-DbaDbOwner -SqlInstance $server -Database ChangedMyMind -TargetLogin sa
<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : e6928404da5d
Database     : ChangedMyMind
Owner        : sa
#>
```
### dbatools: [Set-DbaDbCompatibility](https://docs.dbatools.io/#Set-DbaDbCompatibility)
```powershell
# change the compatibility level
Set-DbaDbCompatibility -SqlInstance $server -Database ChangedMyMind -TargetCompatibility 14
<#
ComputerName  : localhost
InstanceName  : MSSQLSERVER
SqlInstance   : e6928404da5d
Database      : ChangedMyMind
Compatibility : Version140
#>
```
### dbatools: [Set-DbaDbRecoveryModel](http://docs.dbatools.io/#Set-DbaDbRecoveryModel)
```powershell
# change the recovery model
Set-DbaDbRecoveryModel -SqlInstance $server -Database ChangedMyMind -RecoveryModel Simple -Confirm:$false
<#
ComputerName   : localhost
InstanceName   : MSSQLSERVER
SqlInstance    : e6928404da5d
Name           : ChangedMyMind
Status         : Normal
IsAccessible   : True
RecoveryModel  : Simple
LastFullBackup : 01/01/0001 00:00:00
LastDiffBackup : 01/01/0001 00:00:00
LastLogBackup  : 01/01/0001 00:00:00
#>
```
### dbatools: [Set-DbaDbQueryStoreOption](http://docs.dbatools.io/#Set-DbaDbQueryStoreOption)
```powershell
# enable Query Store
Set-DbaDbQueryStoreOption  -SqlInstance $server -Database ChangedMyMind -State ReadOnly
<#
ComputerName                          : localhost
InstanceName                          : MSSQLSERVER
SqlInstance                           : e6928404da5d
Database                              : ChangedMyMind
ActualState                           : ReadOnly
DataFlushIntervalInSeconds            : 900
StatisticsCollectionIntervalInMinutes : 60
MaxStorageSizeInMB                    : 100
CurrentStorageSizeInMB                : 0
QueryCaptureMode                      : All
SizeBasedCleanupMode                  : Auto
StaleQueryThresholdInDays             : 30
MaxPlansPerQuery                      : 200
WaitStatsCaptureMode                  : ON
#>
```
There is one special database that is cool enough to have a dedicated function. Dear Readers, please welcome TempDB!

### dbatools: [Set-DbaTempDbConfig](https://docs.dbatools.io/#Set-DbaTempDbConfig)
```powershell
# change TempDB config and generate the T-SQL script
Set-DbaTempDbConfig -SqlInstance $server -DataFileCount 2 -DataFileSize 1024 -LogFileSize 512 -OutputScriptOnly
```
## Change login
Login changes might not be as often as other changes, but they happen too. dbatools offer functions to rename the login and set other properties.

### SSMS
![Rename-DbaLogin](dbatools_ssmscmd_0502_login.png)
### dbatools: [Rename-DbaLogin](http://docs.dbatools.io/#Rename-DbaLogin)
```powershell
# rename the login
Rename-DbaLogin -SqlInstance $server -Login MyNameIs -NewLogin MyNameIsNew
<#
ComputerName  : localhost
InstanceName  : MSSQLSERVER
SqlInstance   : e6928404da5d
Database      : 
PreviousLogin : MyNameIs
NewLogin      : MyNameIsNew
Status        : Successful
#>
```
Besides renaming logins have some other properties that you might want to change.

### SSMS
![Set-DbaLogin](dbatools_ssmscmd_0503_setlogin.png)
### dbatools: [Set-DbaLogin](https://docs.dbatools.io/#Set-DbaLogin)
```powershell
# change the login
Set-DbaLogin -SqlInstance $server -Login MyNameIs -DefaultDatabase model -Disable -DenyLogin
<#
ComputerName           : localhost
InstanceName           : MSSQLSERVER
SqlInstance            : e6928404da5d
LoginName              : MyNameIs
DenyLogin              : True
IsDisabled             : True
IsLocked               : False
PasswordPolicyEnforced : False
MustChangePassword     : False
PasswordChanged        : 
ServerRole             : 
Notes                  : 
#>
```
## Change agent job
Updating jobs or job steps are quite common activities and it is good to have handy scripts. dbatools offer a broad range of functions to make this task easier.

### SSMS
![Set-DbaAgentJob](dbatools_ssmscmd_0504_job.png)
### dbatools: [Set-DbaAgentJob](http://docs.dbatools.io/#Set-DbaAgentJob)
```powershell
# update the job
Set-DbaAgentJob -SqlInstance $server -Job DoWeHaveAJob -NewName WeDoHaveAJob -Enabled -StartStepId 2 -Description 'I never use this' -OwnerLogin sa
<#
ComputerName           : localhost
InstanceName           : MSSQLSERVER
SqlInstance            : e6928404da5d
Name                   : WeDoHaveAJob
Category               : [Uncategorized (Local)]
OwnerLoginName         : sa
CurrentRunStatus       : Idle
CurrentRunRetryAttempt : 0
Enabled                : True
LastRunDate            : 01/01/0001 00:00:00
LastRunOutcome         : Unknown
HasSchedule            : False
OperatorToEmail        : 
CreateDate             : 27/07/2020 00:19:54
#>
```
### dbatools: [Set-DbaAgentJobStep](http://docs.dbatools.io/#Set-DbaAgentJobStep)
```powershell
# update the job step
Set-DbaAgentJobStep -SqlInstance $server -Job WeDoHaveAJob -StepName Step2 -NewName StepToo -Command 'SELECT 2' -OnSuccessAction QuitWithSuccess -RetryAttempts 5
```
### dbatools: [Set-DbaAgentJobOutputFile](http://docs.dbatools.io/#Set-DbaAgentJobOutputFile)
```powershell
# changing the output file for the job step
Set-DbaAgentJobOutputFile -SqlInstance $server -Job WeDoHaveAJob -Step StepToo -OutputFile 'C:\Temp' -WhatIf
<#
ComputerName   : localhost
InstanceName   : MSSQLSERVER
SqlInstance    : e6928404da5d
Job            : WeDoHaveAJob
JobStep        : StepToo
OutputFileName : 
#>
```
### dbatools: [Set-DbaAgentJobOwner](http://docs.dbatools.io/#Set-DbaAgentJobOwner)
```powershell
# changing the job owner
Set-DbaAgentJobOwner -SqlInstance $server -Job WeDoHaveAJob -Login MyNameIsNew
<#
ComputerName   : localhost
InstanceName   : MSSQLSERVER
SqlInstance    : e6928404da5d
Name           : WeDoHaveAJob
Category       : [Uncategorized (Local)]
OwnerLoginName : MyNameIsNew
Status         : Successful
Notes          : 
#>
```
## Cycle the logs
I have decided to place this function here as it is very useful and in some way changes SQL Server objects, i.e. SQL Server and Agent logs. There is a way to cycle the agent log from the SSMS, but thanks to dbatools you can do this on both files.

### SSMS
![Invoke-DbaCycleErrorLog](dbatools_ssmscmd_0505_cyclelog.png)
### dbatools: [Invoke-DbaCycleErrorLog](https://docs.dbatools.io/#Invoke-DbaCycleErrorLog)
```powershell
# cycle the SQL Server log
Invoke-DbaCycleErrorLog -SqlInstance $server -Type instance
<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : e6928404da5d
LogType      : instance
IsSuccessful : True
Notes        : 
#>
```
```powershell
# cycle the Agent log
Invoke-DbaCycleErrorLog -SqlInstance $server -Type agent
<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : e6928404da5d
LogType      : agent
IsSuccessful : True
Notes        : 
#>
```
### SSMS
![Invoke-DbaCycleErrorLog](dbatools_ssmscmd_0506_setlog.png)
### dbatools: [Set-DbaErrorLogConfig](https://docs.dbatools.io/#Set-DbaErrorLogConfig)
```powershell
# setting up the error log
Set-DbaErrorLogConfig -SqlInstance $server -LogCount 99 -LogSize 123
The change is complete.
```
Thank you,
Mikey