---
ref: dbatools_ssmscmd_see
title: dbatools.io = command-line SQL Server Management Studio - Let me see
excerpt: 
permalink: /blog/:year/:month/:title/
tags: [english, dbatools, community, tools, sqlfamily]
categories: [english, dbatools, series]
lang: en
locale: en-GB
toc: true
---

![dbatools.io = command-line SQL Server Management Studio](dbatools_ssmscmd.png)

This post is part of the series showing practical usage examples. The main post covering links to all posts can be found here: [dbatools.io = command-line SQL Server Management Studio: Table of contents](https://www.bronowski.it/blog/2020/06/dbatools-io-command-line-sql-server-management-studio-table-of-contents/).

## See the databases

When I want to quickly check the databases in the SSMS I would use this:

![Get-DbaDatabase](dbatools_ssmscmd_0201_db.png)
With dbatools I can run the following command:

### [Get-DbaDatabase](https://docs.dbatools.io/#Get-DbaDatabase)

```powershell
# see all the databases
Get-DbaDatabase -SqlInstance $server | Format-Table

<#
ComputerName InstanceName SqlInstance  Name   Status IsAccessible RecoveryModel LogReuseWaitStatus SizeMB Compatibility Collation                    Owner LastFullBackup
------------ ------------ -----------  ----   ------ ------------ ------------- ------------------ ------ ------------- ---------                    ----- --------------
localhost    MSSQLSERVER  4dc570825344 master Normal         True        Simple            Nothing      6    Version140 SQL_Latin1_General_CP1_CI_AS sa    01/01/0001 ...
localhost    MSSQLSERVER  4dc570825344 tempdb Normal         True        Simple            Nothing     16    Version140 SQL_Latin1_General_CP1_CI_AS sa    01/01/0001 ...
localhost    MSSQLSERVER  4dc570825344 model  Normal         True          Full            Nothing     16    Version140 SQL_Latin1_General_CP1_CI_AS sa    01/01/0001 ...
localhost    MSSQLSERVER  4dc570825344 msdb   Normal         True        Simple        Transaction   15.5    Version140 SQL_Latin1_General_CP1_CI_AS sa    01/01/0001 ...
#>
```

In a comparable way we can see details of a single database:

![Get-DbaDbFile](dbatools_ssmscmd_0202_dbfile.png)

### [Get-DbaDbFile](https://docs.dbatools.io/#Get-DbaDbFile)

```powershell
# get the files details
Get-DbaDbFile -SqlInstance $server -Database tempdb | Format-Table

<#
ComputerName InstanceName SqlInstance  Database FileGroupName ID Type TypeDescription LogicalName PhysicalName                   
------------ ------------ -----------  -------- ------------- -- ---- --------------- ----------- ------------                   
localhost    MSSQLSERVER  4dc570825344 tempdb   PRIMARY        1    0 ROWS            tempdev     /var/opt/mssql/data/tempdb.mdf 
localhost    MSSQLSERVER  4dc570825344 tempdb                  2    1 LOG             templog     /var/opt/mssql/data/templog.ldf
#>
```

### [Get-DbaDbSpace](https://docs.dbatools.io/#Get-DbaDbSpace)

```powershell
# get extra information on free/used space in files
Get-DbaDbSpace -SqlInstance $server -Database tempdb| Format-Table

<#
ComputerName InstanceName SqlInstance  Database FileName FileGroup PhysicalName                    FileType UsedSpace   FreeSpace
------------ ------------ -----------  -------- -------- --------- ------------                    -------- ---------   ---------
localhost    MSSQLSERVER  4dc570825344 tempdb   tempdev  PRIMARY   /var/opt/mssql/data/tempdb.mdf  ROWS     3.00 MB     5.00 MB  
localhost    MSSQLSERVER  4dc570825344 tempdb   templog            /var/opt/mssql/data/templog.ldf LOG      1,024.00 KB 7.00 MB      
#>
```

## See the jobs

The SQL Server Agent is crucial component and being able to see what is happening inside is important. In SSMS we would click here and there and see windows like that:

![Get-DbaAgentJob](dbatools_ssmscmd_0203_job.png)

Getting job's details is as easy as opening one and navigating few tabs:

![Get-DbaAgentJob](dbatools_ssmscmd_0203_job2.png)

Now, let's switch to dbatools and see what they offer.

### [dbatools: Get-DbaAgentJob](https://docs.dbatools.io/#Get-DbaAgentJob)

```powershell
# see the jobs
Get-DbaAgentJob -SqlInstance $server | Format-Table

<#
ComputerName InstanceName SqlInstance  Name                                      Category             OwnerLoginName CurrentRunStatus CurrentRunRetryAttempt Enabled
------------ ------------ -----------  ----                                      --------             -------------- ---------------- ---------------------- -------
localhost    MSSQLSERVER  4dc570825344 AJob                                      Database Maintenance sa                         Idle                      0    True
localhost    MSSQLSERVER  4dc570825344 CommandLog Cleanup                        Database Maintenance sa                         Idle                      0    True
localhost    MSSQLSERVER  4dc570825344 DatabaseBackup - SYSTEM_DATABASES - FULL  Database Maintenance sa                         Idle                      0    True
localhost    MSSQLSERVER  4dc570825344 DatabaseBackup - USER_DATABASES - DIFF    Database Maintenance sa                         Idle                      0    True
localhost    MSSQLSERVER  4dc570825344 DatabaseBackup - USER_DATABASES - FULL    Database Maintenance sa                         Idle                      0    True
localhost    MSSQLSERVER  4dc570825344 DatabaseBackup - USER_DATABASES - LOG     Database Maintenance sa                         Idle                      0    True
localhost    MSSQLSERVER  4dc570825344 DatabaseIntegrityCheck - SYSTEM_DATABASES Database Maintenance sa                         Idle                      0    True
localhost    MSSQLSERVER  4dc570825344 DatabaseIntegrityCheck - USER_DATABASES   Database Maintenance sa                         Idle                      0    True
localhost    MSSQLSERVER  4dc570825344 IndexOptimize - USER_DATABASES            Database Maintenance sa                         Idle                      0    True
localhost    MSSQLSERVER  4dc570825344 sp_delete_backuphistory                   Database Maintenance sa                         Idle                      0    True
localhost    MSSQLSERVER  4dc570825344 sp_purge_jobhistory                       Database Maintenance sa                         Idle                      0    True
#>
```

### [Get-DbaAgentJobStep](https://docs.dbatools.io/#Get-DbaAgentJobStep)

```powershell
# see the job steps details
Get-DbaAgentJobStep -SqlInstance $server | Format-Table

<#
ComputerName InstanceName SqlInstance  AgentJob                                  Name                                        SubSystem LastRunDate         LastRunOutcome
------------ ------------ -----------  --------                                  ----                                        --------- -----------         --------------
localhost    MSSQLSERVER  4dc570825344 AJob                                      AStep                                     TransactSql 01/01/0001 00:00:00         Failed
localhost    MSSQLSERVER  4dc570825344 AJob                                      BStep                                     TransactSql 01/01/0001 00:00:00         Failed
localhost    MSSQLSERVER  4dc570825344 CommandLog Cleanup                        CommandLog Cleanup                        TransactSql 01/01/0001 00:00:00         Failed
localhost    MSSQLSERVER  4dc570825344 DatabaseBackup - SYSTEM_DATABASES - FULL  DatabaseBackup - SYSTEM_DATABASES - FULL  TransactSql 01/01/0001 00:00:00         Failed
localhost    MSSQLSERVER  4dc570825344 DatabaseBackup - USER_DATABASES - DIFF    DatabaseBackup - USER_DATABASES - DIFF    TransactSql 01/01/0001 00:00:00         Failed
localhost    MSSQLSERVER  4dc570825344 DatabaseBackup - USER_DATABASES - FULL    DatabaseBackup - USER_DATABASES - FULL    TransactSql 01/01/0001 00:00:00         Failed
localhost    MSSQLSERVER  4dc570825344 DatabaseBackup - USER_DATABASES - LOG     DatabaseBackup - USER_DATABASES - LOG     TransactSql 01/01/0001 00:00:00         Failed
localhost    MSSQLSERVER  4dc570825344 DatabaseIntegrityCheck - SYSTEM_DATABASES DatabaseIntegrityCheck - SYSTEM_DATABASES TransactSql 01/01/0001 00:00:00         Failed
localhost    MSSQLSERVER  4dc570825344 DatabaseIntegrityCheck - USER_DATABASES   DatabaseIntegrityCheck - USER_DATABASES   TransactSql 01/01/0001 00:00:00         Failed
localhost    MSSQLSERVER  4dc570825344 IndexOptimize - USER_DATABASES            IndexOptimize - USER_DATABASES            TransactSql 01/01/0001 00:00:00         Failed
localhost    MSSQLSERVER  4dc570825344 sp_delete_backuphistory                   sp_delete_backuphistory                   TransactSql 01/01/0001 00:00:00         Failed
localhost    MSSQLSERVER  4dc570825344 sp_purge_jobhistory                       sp_purge_jobhistory                       TransactSql 01/01/0001 00:00:00         Failed
#>
```

With some modification we can even get the Command quickly.

```powershell
# see the command of a selected job step
Get-DbaAgentJobStep -SqlInstance $server -Job Ajob| SELECT AgentJob, Name, Command | Out-GridView
```

![Get-DbaAgentJobStep](dbatools_ssmscmd_0204_jobstep.png)

## See the logins/users/roles

Another important aspect of taking care of the server is user management. In this part, we will see how to quickly check basic information about users, logins, and roles. First, start with logins:

![Get-DbaLogin](dbatools_ssmscmd_0205_login.png)

### [Get-DbaLogin](https://docs.dbatools.io/#Get-DbaLogin)

```powershell
# see the logins on the server
Get-DbaLogin -SqlInstance $server | Format-Table

<#
ComputerName InstanceName SqlInstance  Name                                 LoginType CreateDate          LastLogin           HasAccess IsLocked IsDisabled
------------ ------------ -----------  ----                                 --------- ----------          ---------           --------- -------- ----------
localhost    MSSQLSERVER  4dc570825344 ##MS_PolicyEventProcessingLogin##     SqlLogin 30/11/2018 15:04:10                          True    False       True
localhost    MSSQLSERVER  4dc570825344 ##MS_PolicyTsqlExecutionLogin##       SqlLogin 30/11/2018 15:04:10                          True    False       True
localhost    MSSQLSERVER  4dc570825344 BUILTINAdministrators            WindowsGroup 30/11/2018 15:06:30                          True               False
localhost    MSSQLSERVER  4dc570825344 Hacker                                SqlLogin 04/07/2020 04:23:27                          True    False      False
localhost    MSSQLSERVER  4dc570825344 Mikey                                 SqlLogin 04/07/2020 04:22:13                          True    False      False
localhost    MSSQLSERVER  4dc570825344 NT AUTHORITYNETWORK SERVICE       WindowsUser 06/06/2020 20:31:21                          True               False
localhost    MSSQLSERVER  4dc570825344 NT AUTHORITYSYSTEM                WindowsUser 06/06/2020 20:31:21 04/07/2020 04:50:23      True               False
localhost    MSSQLSERVER  4dc570825344 sa                                    SqlLogin 08/04/2003 09:10:35 04/07/2020 04:51:04      True    False      False
#>
```

…then database users

![Get-DbaDbUser](dbatools_ssmscmd_0206_user.png)

### [Get-DbaDbUser](https://docs.dbatools.io/#Get-DbaDbUser)

```powershell
# see all users of the given database
Get-DbaDbUser -SqlInstance $server -Database MikeyDatabase | Format-Table

<#
ComputerName InstanceName SqlInstance  Database      CreateDate          DateLastModified    Name               Login LoginType AuthenticationType    State HasDbAccess DefaultSchema
------------ ------------ -----------  --------      ----------          ----------------    ----               ----- --------- ------------------    ----- ----------- -------------
localhost    MSSQLSERVER  4dc570825344 MikeyDatabase 08/04/2003 09:10:42 04/07/2020 04:18:28 dbo                sa     SqlLogin           Instance Existing        True dbo          
localhost    MSSQLSERVER  4dc570825344 MikeyDatabase 08/04/2003 09:10:42 08/04/2003 09:10:42 guest                     SqlLogin               None Existing       False guest        
localhost    MSSQLSERVER  4dc570825344 MikeyDatabase 13/04/2009 12:59:11 13/04/2009 12:59:11 INFORMATION_SCHEMA        SqlLogin               None Existing       False              
localhost    MSSQLSERVER  4dc570825344 MikeyDatabase 04/07/2020 04:28:37 04/07/2020 04:28:37 Mikey              Mikey  SqlLogin           Instance Existing        True dbo          
localhost    MSSQLSERVER  4dc570825344 MikeyDatabase 13/04/2009 12:59:11 13/04/2009 12:59:11 sys                       SqlLogin               None Existing       False              
#>
```

…now roles, both server and database

![Get-DbaServerRole](dbatools_ssmscmd_0207_serverrole.png)

### [Get-DbaServerRole](https://docs.dbatools.io/#Get-DbaServerRole)

```powershell
# see the server roles
Get-DbaServerRole -SqlInstance $server | Format-Table

# or use this:
# Get-DbaServerRoleMember -SqlInstance $server | Format-Table

<#
ComputerName InstanceName SqlInstance  Role          Login                                                      Owner IsFixedRole DateCreated         DateModified       
------------ ------------ -----------  ----          -----                                                      ----- ----------- -----------         ------------       
localhost    MSSQLSERVER  4dc570825344 bulkadmin     {}                                                         sa           True 13/04/2009 12:59:06 13/04/2009 12:59:06
localhost    MSSQLSERVER  4dc570825344 dbcreator     {Mikey}                                                    sa           True 13/04/2009 12:59:06 13/04/2009 12:59:06
localhost    MSSQLSERVER  4dc570825344 diskadmin     {}                                                         sa           True 13/04/2009 12:59:06 13/04/2009 12:59:06
localhost    MSSQLSERVER  4dc570825344 processadmin  {}                                                         sa           True 13/04/2009 12:59:06 13/04/2009 12:59:06
localhost    MSSQLSERVER  4dc570825344 public        {}                                                         sa          False 13/04/2009 12:59:06 13/04/2009 12:59:06
localhost    MSSQLSERVER  4dc570825344 securityadmin {Mikey, Hacker}                                            sa           True 13/04/2009 12:59:06 13/04/2009 12:59:06
localhost    MSSQLSERVER  4dc570825344 serveradmin   {}                                                         sa           True 13/04/2009 12:59:06 13/04/2009 12:59:06
localhost    MSSQLSERVER  4dc570825344 setupadmin    {}                                                         sa           True 13/04/2009 12:59:06 13/04/2009 12:59:06
localhost    MSSQLSERVER  4dc570825344 sysadmin      {sa, BUILTINAdministrators, NT AUTHORITYNETWORK SERVICE} sa           True 13/04/2009 12:59:06 13/04/2009 12:59:06
#>
```

### [Get-DbaDbRole](https://docs.dbatools.io/#Get-DbaDbRole)

```powershell
# see database roles
Get-DbaDbRole -SqlInstance $server -Database MikeyDatabase | Format-Table

<#
ComputerName InstanceName Database      Name              IsFixedRole
------------ ------------ --------      ----              -----------
localhost    MSSQLSERVER  MikeyDatabase db_accessadmin           True
localhost    MSSQLSERVER  MikeyDatabase db_backupoperator        True
localhost    MSSQLSERVER  MikeyDatabase db_datareader            True
localhost    MSSQLSERVER  MikeyDatabase db_datawriter            True
localhost    MSSQLSERVER  MikeyDatabase db_ddladmin              True
localhost    MSSQLSERVER  MikeyDatabase db_denydatareader        True
localhost    MSSQLSERVER  MikeyDatabase db_denydatawriter        True
localhost    MSSQLSERVER  MikeyDatabase db_executor             False
localhost    MSSQLSERVER  MikeyDatabase db_owner                 True
localhost    MSSQLSERVER  MikeyDatabase db_securityadmin         True
localhost    MSSQLSERVER  MikeyDatabase public                  False
#>
```

Finally, database role members:

![Get-DbaDbRoleMember](dbatools_ssmscmd_0208_dbrole.png)

### [Get-DbaDbRoleMember](https://docs.dbatools.io/#Get-DbaDbRoleMember)

```powershell
# see the role members
Get-DbaDbRoleMember -SqlInstance $server -Database MikeyDatabase  | Format-Table

<#
ComputerName InstanceName SqlInstance  Database      Role              UserName Login  IsSystemObject LoginType
------------ ------------ -----------  --------      ----              -------- -----  -------------- ---------
localhost    MSSQLSERVER  4dc570825344 MikeyDatabase db_denydatareader Hacker   Hacker          False  SqlLogin
localhost    MSSQLSERVER  4dc570825344 MikeyDatabase db_denydatawriter Hacker   Hacker          False  SqlLogin
localhost    MSSQLSERVER  4dc570825344 MikeyDatabase db_owner          Mikey    Mikey           False  SqlLogin
localhost    MSSQLSERVER  4dc570825344 MikeyDatabase db_securityadmin  Mikey    Mikey           False  SqlLogin
localhost    MSSQLSERVER  4dc570825344 MikeyDatabase db_securityadmin  Hacker   Hacker          False  SqlLogin
#>
```

"Now You See Me" - said SQL Server. Of course there is more to see on the server, but I think it is a good teaser and an incentive to start using dbatools module.

Thank you,  

Mikey
