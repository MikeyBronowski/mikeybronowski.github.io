---
title: dbatools.io = command-line SQL Server Management Studio - Something new
tags: [dbatools, community, tools, sqfamily]
excerpt: 
lang: en
ref: dbatools_ssmscmd_new
permalink: /:year/:month/:title
locale: en-GB
---
![dbatools.io = command-line SQL Server Management Studio](dbatools_ssmscmd.png)

This post is part of the series showing practical usage examples. The main post covering links to all posts can be found here: [dbatools.io = command-line SQL Server Management Studio: Table of contents](https://www.bronowski.it/blog/2020/06/dbatools-io-command-line-sql-server-management-studio-table-of-contents/).

dbatools commands used in this post:

* [New-DbaDatabase]()
* [New-DbaLogin]()
* [New-DbaDbRole]()
* [New-DbaDbUser]()
* [New-DbaAgentJob]()
* [New-DbaAgentJobStep]()
* [New-DbaAgentSchedule]()
* [New-DbaDbMailAccount]()
* [New-DbaDbMailProfile]()

## New database
Request for a new database is a pretty standard and repeatable task. It can be either a simple database based on the model database or more complex with multiple data files and filegroups.

### SSMS
![New-DbaDatabase](dbatools_ssmscmd_0301_db1.png)
![New-DbaDatabase](dbatools_ssmscmd_0302_db2.png)
### dbatools: New-DbaDatabase
```powershell
# simple database creation based on the model database
New-DbaDatabase -SqlInstance $server -Name NewDatabaseBasedOnModel
<#
ComputerName       : localhost
InstanceName       : MSSQLSERVER
SqlInstance        : 4dc570825344
Name               : NewDatabaseBasedOnModel
Status             : Normal
IsAccessible       : True
RecoveryModel      : Full
LogReuseWaitStatus : Nothing
SizeMB             : 16
Compatibility      : Version140
Collation          : SQL_Latin1_General_CP1_CI_AS
Owner              : sa
LastFullBackup     : 01/01/0001 00:00:00
LastDiffBackup     : 01/01/0001 00:00:00
LastLogBackup      : 01/01/0001 00:00:00
#>
```
```powershell
# database with more customizations
# using PowerShell splat for better readability
# define parameters
$Params = @{
    SqlInstance = $server;
    Name = 'BrandNewAndShinyDb';
    Recoverymodel = 'Simple';
    Owner = 'sa';
    PrimaryFilesize = 64;
    PrimaryFileGrowth = 128;
    LogSize = 64;
    LogGrowth = 64;
    SecondaryFileCount = 2;
    SecondaryFilesize = 64;
    SecondaryFileGrowth = 128;
    DefaultFileGroup = 'Secondary';
}
# create database based on parameters
New-DbaDatabase  @Params 
<#
ComputerName       : localhost
InstanceName       : MSSQLSERVER
SqlInstance        : 4dc570825344
Name               : BrandNewAndShinyDb
Status             : Normal
IsAccessible       : True
RecoveryModel      : Simple
LogReuseWaitStatus : Nothing
SizeMB             : 320
Compatibility      : Version140
Collation          : SQL_Latin1_General_CP1_CI_AS
Owner              : sa
LastFullBackup     : 01/01/0001 00:00:00
LastDiffBackup     : 01/01/0001 00:00:00
LastLogBackup      : 01/01/0001 00:00:00
#>
```
## New login/user/role
Another piece of the request could be granting access to the new database. So we would need to create a new login on the SQL instance and then user and a custom role (like db_executor):

### SSMS
![New-DbaLogin](dbatools_ssmscmd_0303_login.png)
![New-DbaDbRole](dbatools_ssmscmd_0304_dbrole.png)
![New-DbaDbUser](dbatools_ssmscmd_0305_dbuser.png)
### dbatools: [New-DbaLogin](http://docs.dbatools.io/#New-DbaLogin)
```powershell
# set the password for the SQL login
$password = '<It is a str0ng! password>' | ConvertTo-SecureString -asPlainText -Force
# add a new login
New-DbaLogin -SqlInstance $server -Login PSRulez -SecurePassword $password
<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : 4dc570825344
Name         : PSRulez
LoginType    : SqlLogin
CreateDate   : 09/07/2020 07:32:28
LastLogin    : 
HasAccess    : True
IsLocked     : False
IsDisabled   : False
#>
```
### dbatools: [New-DbaDbRole](http://docs.dbatools.io/#New-DbaDbRole)
```powershell
# create a new database role
$roleName = 'db_executor'
New-DbaDbRole -SqlInstance $server -Database BrandNewAndShinyDb -Role $roleName
<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : 4dc570825344
Name         : db_executor
Parent       : BrandNewAndShinyDb
Owner        : dbo
#>
# configure the role with GRANT EXECUTE (this is not part of the dbatools... yet)
$databasePermissionSet = New-Object Microsoft.SqlServer.Management.Smo.DatabasePermissionSet
$databasePermissionSet.Execute = $true
$database = $instance.databases['BrandNewAndShinyDb']
$database.Grant($databasePermissionSet,$roleName)
```
### dbatools: [New-DbaDbUser](http://docs.dbatools.io/#New-DbaDbUser)
```powershell
# add a new user to the database
New-DbaDbUser -SqlInstance $server -Database BrandNewAndShinyDb -Login PSRulez  -Username PSRulez
<#
ComputerName       : localhost
InstanceName       : MSSQLSERVER
SqlInstance        : 4dc570825344
Database           : BrandNewAndShinyDb
CreateDate         : 09/07/2020 07:42:13
DateLastModified   : 09/07/2020 07:42:13
Name               : PSRulez
Login              : PSRulez
LoginType          : SqlLogin
AuthenticationType : Instance
State              : Existing
HasDbAccess        : True
DefaultSchema      : db
#>
```
### dbatools: [Add-DbaDbRoleMember](http://docs.dbatools.io/#Add-DbaDbRoleMember)
```powershell
# add the new user to the newly created database role
# use -Confirm:$false to skip the prompt
Add-DbaDbRoleMember -SqlInstance $server -Database BrandNewAndShinyDb -Role db_executor -User PSRulez -Confirm:$false
```
## New agent job
Configuring a SQL agent job can be easy too. With a few lines, you can have a brand new job with its steps and schedule. Let’s see how:

### SSMS
![New-DbaAgentJob]()
![New-DbaAgentJobStep]()
![New-DbaDbMaiDbaAgentSchedulelProfile]()
### dbatools:[ New-DbaAgentJob](http://docs.dbatools.io/#New-DbaAgentJob)
```powershell
# create a new empty job
New-DbaAgentJob -SqlInstance $server -Job ANewJob -Description 'Just a description'
```
### dbatools: [New-DbaAgentJobStep](http://docs.dbatools.io/#New-DbaAgentJobStep)
```powershell
# add some steps to the job
New-DbaAgentJobStep -SqlInstance $server -Job ANewJob -StepName FirstStep -Command 'SELECT @@VERSION'
New-DbaAgentJobStep -SqlInstance $server -Job ANewJob -StepName SecondStep -Command 'SELECT @@servername'
```
### dbatools: [New-DbaAgentSchedule](https://docs.dbatools.io/#New-DbaAgentSchedule)
```powershell
# create a new schedule for the job
# Job done!
New-DbaAgentSchedule -SqlInstance $server -Job ANewJob -Schedule DailySchedule -FrequencyType Daily -FrequencyInterval 1 -StartTime '080000' -Force
```
## New mail account/profile
Finally, the last thing I wanted to show you is how easy we can configure mail service with dbatools.

### SSMS
![New-DbaDbMailProfile]()
![New-DbaDbMailAccount]()
### dbatools: [New-DbaDbMailAccount](http://docs.dbatools.io/#New-DbaDbMailAccount)
```powershell
New-DbaDbMailAccount -SqlInstance $server -Name MailAccountForMikey -DisplayName 'Mikey Bronowski' -EmailAddress 'mikey@bronowski.it'
<#
ComputerName   : localhost
InstanceName   : MSSQLSERVER
SqlInstance    : 4dc570825344
Id             : 1
Name           : MailAccountForMikey
DisplayName    : Mikey Bronowski
Description    : 
EmailAddress   : mikey@bronowski.it
ReplyToAddress : 
IsBusyAccount  : False
MailServers    : {}
#>
```
### dbatools: [New-DbaDbMailProfile](http://docs.dbatools.io/#New-DbaDbMailProfile)
```powershell
New-DbaDbMailProfile -SqlInstance $server -Name MailProfile -MailAccountName MailAccountForMikey
<#
ComputerName  : localhost
InstanceName  : MSSQLSERVER
SqlInstance   : 4dc570825344
Id            : 1
Name          : MailProfile
Description   : 
IsBusyProfile : False
#>
```
That would be all new stuff I have for you this week.

Thank you,
Mikey