---
ref: dbatools_ssmscmd_see
title: dbatools.io = SQL Server Management Studio jako wiersz poleceń - Pokaż mi
excerpt: 
permalink: /blog/:year/:month/:title
tags: [polski, seria, dbatools, społeczność, narzędzia, sqfamily]
categories: [polski, seria, dbatools]
lang: pl
locale: pl-PL
toc: true
---

![dbatools.io = command-line SQL Server Management Studio](dbatools_ssmscmd.png)

Ten wpis jest częścią serii ukazującej praktyczne przykłady użycia modułu. Główny wpis zawierający odnośniki do pozostałych wpisów serii można znaleźć tutaj: [dbatools.io = SQL Server Management Studio jako wiersz poleceń - spis treści](/blog/2020/06/dbatools-io-sql-server-management-studio-jako-wiersz-polecen-spis-tresci/).

## Zobacz bazy danych

Kiedy potrzebuję na szybko sprawdzić bazy danych w SSMS używam tego:

![Get-DbaDatabase](dbatools_ssmscmd_0201_db.png)

Z modułem dbatools wystarczy, że użyję następującego polecenia:

### [Get-DbaDatabase](https://docs.dbatools.io/#Get-DbaDatabase)

```powershell
# pokaż wszystkie bazy danych
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

W podobny sposób możemy zobaczyć szczegóły pojedynczej bazy danych:

![Get-DbaDbFile](dbatools_ssmscmd_0202_dbfile.png)

### [Get-DbaDbFile](https://docs.dbatools.io/#Get-DbaDbFile)

```powershell
# pokaż szczegóły plików bazy danych
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
# pokaż dodatkowe informacje o wolnej/zajętej przestrzeni w plikach
Get-DbaDbSpace -SqlInstance $server -Database tempdb| Format-Table

<#
ComputerName InstanceName SqlInstance  Database FileName FileGroup PhysicalName                    FileType UsedSpace   FreeSpace
------------ ------------ -----------  -------- -------- --------- ------------                    -------- ---------   ---------
localhost    MSSQLSERVER  4dc570825344 tempdb   tempdev  PRIMARY   /var/opt/mssql/data/tempdb.mdf  ROWS     3.00 MB     5.00 MB  
localhost    MSSQLSERVER  4dc570825344 tempdb   templog            /var/opt/mssql/data/templog.ldf LOG      1,024.00 KB 7.00 MB      
#>
```

## Zobacz zadania agenta SQL

Agent SQL jest istotnym komponentem i możliwość zobaczenia co się dzieje w środku jest bardzo ważna. W SSMS poklikamy tu i ówdzie i zobaczymy następujące okienko:

![Get-DbaAgentJob](dbatools_ssmscmd_0203_job.png)

Podejrzenie szczegółowych informacji konkretnego zadania, to kwestia kilku kliknięć i przejścia paru zakładek:

![Get-DbaAgentJob](dbatools_ssmscmd_0203_job2.png)

Teraz przejdźmy do modułu dbatools i zobaczmy, co mają w ofercie.

### [dbatools: Get-DbaAgentJob](https://docs.dbatools.io/#Get-DbaAgentJob)

```powershell
# pokaż zadania
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
# pokaż szczegóły kroków zadań
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

Z kilkoma modyfikacjami możemy szybko zobaczyć jakie polecenie będzie wykonywane w zadaniu.

```powershell
# pokaż polecenie w wybranym kroku zadania
Get-DbaAgentJobStep -SqlInstance $server -Job Ajob| SELECT AgentJob, Name, Command | Out-GridView
```

![Get-DbaAgentJobStep](dbatools_ssmscmd_0204_jobstep.png)

## Pokaż loginy/użytkowników/role

Innym ważnym elementem dbania o serwer jest zarządzanie użytkownikami. W tej części zobaczymy jak szybko sprawdzić podstawowe informacje o loginach, użytkownikach i rolach. Na początek zobaczmy loginy:

![Get-DbaLogin](dbatools_ssmscmd_0205_login.png)

### [Get-DbaLogin](https://docs.dbatools.io/#Get-DbaLogin)

```powershell
# pokaż loginy na serwerze
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

…następnie użytkowników baz danych.

![Get-DbaDbUser](dbatools_ssmscmd_0206_user.png)

### [Get-DbaDbUser](https://docs.dbatools.io/#Get-DbaDbUser)

```powershell
# pokaż wszystkich użytkowników wybranej bazy danych
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

…kolejnie, role, zarówno na poziomie serwera, jak i bazy

![Get-DbaServerRole](dbatools_ssmscmd_0207_serverrole.png)

### [Get-DbaServerRole](https://docs.dbatools.io/#Get-DbaServerRole)

```powershell
# zobacz role na poziomie serwera
Get-DbaServerRole -SqlInstance $server | Format-Table

# lub użyj tego by zobaczyć członków tych ról
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
# zobacz role bazodanowe
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

W końcu, zobacz członków rol bazodanowych:

![Get-DbaDbRoleMember](dbatools_ssmscmd_0208_dbrole.png)

### [Get-DbaDbRoleMember](https://docs.dbatools.io/#Get-DbaDbRoleMember)

```powershell
# zobacz członków ról bazodanowych
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

"Teraz mnie widzisz" - rzekł serwer SQL. Oczywiście poza tymi kilkoma przykładami na serwerze jest wiele więcej obiektów, które możemy podglądnąć. Myślę jednak, że ten wpis może zachęcić do sprawdzenia modułu dbatools i używania go na codzień.

Dziękuję,

Mikey
