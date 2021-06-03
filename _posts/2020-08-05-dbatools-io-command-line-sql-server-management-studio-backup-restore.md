---
ref: dbatools_ssmscmd_backup
title: dbatools.io = command-line SQL Server Management Studio - Backup-Restore
excerpt: 
permalink: /blog/:year/:month/:title
tags: [english, dbatools, community, tools, sqlfamily]
categories: [english, dbatools, series]
lang: en
locale: en-GB
toc: true
---

![dbatools.io = command-line SQL Server Management Studio](dbatools_ssmscmd.png)

This post is part of the series showing practical usage examples. The main post covering links to all posts can be found here: [dbatools.io = command-line SQL Server Management Studio: Table of contents](https://www.bronowski.it/blog/2020/06/dbatools-io-command-line-sql-server-management-studio-table-of-contents/).

## Backup

Taking backup is an essential task for everyone working with any kind of data. SSMS offers a wide range of options for taking backups, and at least the same you can achieve using dbatools.

![Backup-DbaDatabase](dbatools_ssmscmd_0601_backup.png)

### [Backup-DbaDatabase](https://docs.dbatools.io/#Backup-DbaDatabase)

```powershell
# take a full copy-only backup
Backup-DbaDatabase -SqlInstance $server -Database BackMeUp -Type Full -CopyOnly -CompressBackup

<#
SqlInstance  Database Type TotalSize DeviceType Start                   Duration End                    
-----------  -------- ---- --------- ---------- -----                   -------- ---                    
e6928404da5d BackMeUp Full 2.71 MB   Disk       2020-08-04 21:44:00.000 00:00:01 2020-08-04 21:44:01.000
#>
# take a differential backup and save as multiple files
# take regular FULL first - not copy-only
Backup-DbaDatabase -SqlInstance $server -Database BackMeUp -Type Full
```

```powershell
# take a DIFF now
Backup-DbaDatabase -SqlInstance $server -Database BackMeUp -Type Diff -FileCount 2

<#
SqlInstance  Database Type         TotalSize DeviceType Start                   Duration End                    
-----------  -------- ----         --------- ---------- -----                   -------- ---                    
e6928404da5d BackMeUp Differential 485.00 KB Disk       2020-08-04 21:47:30.000 00:00:01 2020-08-04 21:47:31.000
#>
```

```powershell
# take a T-LOG backup
Backup-DbaDatabase -SqlInstance $server -Database BackMeUp -Type Log

<#
SqlInstance  Database Type TotalSize DeviceType Start                   Duration End                    
-----------  -------- ---- --------- ---------- -----                   -------- ---                    
e6928404da5d BackMeUp Log  80.00 KB  Disk       2020-08-04 21:48:51.000 00:00:00 2020-08-04 21:48:51.000
#>
```

## Restore

The whole purpose of taking a backup is to restore it if needed.

![Restore-DbaDatabase](dbatools_ssmscmd_0602_restore.png)

### [Restore-DbaDatabase](https://docs.dbatools.io/#Restore-DbaDatabase)

```powershell
# restore a backup next to the existing database (rename database and files)
Restore-DbaDatabase -SqlInstance $server -DatabaseName BackMeUp -WithReplace -Path 'C:\var\opt\mssql\data\BackMeUp_202008042347.bak' -RestoredDatabaseNamePrefix Restored -ReplaceDbNameInFile

<#
ComputerName         : localhost
InstanceName         : MSSQLSERVER
SqlInstance          : e6928404da5d
BackupFile           : C:\var\opt\mssql\data\BackMeUp_202008042347.bak
BackupFilesCount     : 1
BackupSize           : 2.71 MB
CompressedBackupSize : 2.71 MB
Database             : RestoredBackMeUp
Owner                : sa
DatabaseRestoreTime  : 00:00:03
FileRestoreTime      : 00:00:03
NoRecovery           : False
RestoreComplete      : True
RestoredFile         : RestoredBackMeUp.mdf,RestoredBackMeUp_log.ldf
RestoredFilesCount   : 2
Script               : {RESTORE DATABASE [RestoredBackMeUp] FROM  DISK = N'C:\var\opt\mssql\data\BackMeUp_202008042347.bak' WITH  FILE = 1,  MOVE N'BackMeUp' 
                       TO N'/var/opt/mssql/data/RestoredBackMeUp.mdf',  MOVE N'BackMeUp_log' TO N'/var/opt/mssql/data/RestoredBackMeUp_log.ldf',  NOUNLOAD,  
                       REPLACE,  STATS = 10}
RestoreDirectory     : /var/opt/mssql/data
WithReplace          : True
#>
```

## See it

Once backup is taken, or while you are preparing to restore you might want to take a peak what is inside of these magical BAK / TRN files.

![Get-DbaDbBackupHistory](dbatools_ssmscmd_0603_history.png)

### [Get-DbaDbBackupHistory](https://docs.dbatools.io/#Get-DbaDbBackupHistory)

```powershell
# see the backup history including copy-only
Get-DbaDbBackupHistory -SqlInstance $server -Database BackMeUp -IncludeCopyOnly

<#
SqlInstance  Database Type         TotalSize DeviceType Start                   Duration End                    
-----------  -------- ----         --------- ---------- -----                   -------- ---                    
e6928404da5d BackMeUp Differential 485.00 KB Disk       2020-08-04 21:47:30.000 00:00:01 2020-08-04 21:47:31.000
e6928404da5d BackMeUp Log          80.00 KB  Disk       2020-08-04 21:48:51.000 00:00:00 2020-08-04 21:48:51.000
e6928404da5d BackMeUp Full         2.71 MB   Disk       2020-08-04 21:47:25.000 00:00:01 2020-08-04 21:47:26.000
e6928404da5d BackMeUp Full         2.71 MB   Disk       2020-08-04 21:44:00.000 00:00:01 2020-08-04 21:44:01.000
#>
```

### [Get-DbaBackupInformation](https://docs.dbatools.io/#Get-DbaBackupInformation)

```powershell
# see the details of the backup file with this extra command
Get-DbaBackupInformation -SqlInstance $server -Path 'C:\var\opt\mssql\data\BackMeUp_202008042347.bak'

<#
SqlInstance  Database Type     TotalSize DeviceType Start                   Duration End                    
-----------  -------- ----     --------- ---------- -----                   -------- ---                    
e6928404da5d BackMeUp Database 2.71 MB   Disk       2020-08-04 21:47:25.000 00:00:01 2020-08-04 21:47:26.000
#>
```

### [Get-DbaLastBackup](https://docs.dbatools.io/#Get-DbaLastBackup)

```powershell
# get overall details of the last backup on the instance
Get-DbaLastBackup -SqlInstance $server | Format-Table

<#
ComputerName InstanceName SqlInstance  Database         LastFullBackup          LastDiffBackup          LastLogBackup          
------------ ------------ -----------  --------         --------------          --------------          -------------          
localhost    MSSQLSERVER  e6928404da5d BackMeUp         2020-08-04 21:47:26.000 2020-08-04 21:47:31.000 2020-08-04 21:48:51.000
localhost    MSSQLSERVER  e6928404da5d master                                                                                  
localhost    MSSQLSERVER  e6928404da5d model                                                                                   
localhost    MSSQLSERVER  e6928404da5d msdb                                                                                    
localhost    MSSQLSERVER  e6928404da5d RestoredBackMeUp     
#>
```

### [Get-DbaDbRestoreHistory](http://docs.dbatools.io/#Get-DbaDbRestoreHistory)

```powershell
# see the restore history
Get-DbaDbRestoreHistory -SqlInstance $server | Format-Table

<#
BackupFinishDate    ComputerName Database         Date                From                                            InstanceName RestoreType SqlInstance  To  
----------------    ------------ --------         ----                ----                                            ------------ ----------- -----------  --  
04/08/2020 21:47:26 localhost    RestoredBackMeUp 04/08/2020 22:17:56 C:\var\opt\mssql\data\BackMeUp_202008042347.bak MSSQLSERVER  Database    e6928404da5d /...
#>
```

### [Measure-DbaBackupThroughput](http://docs.dbatools.io/#Measure-DbaBackupThroughput)

```powershell
# see some stats about backup performance
Measure-DbaBackupThroughput -SqlInstance $server -Database BackMeUp | FT

<#
ComputerName InstanceName SqlInstance  Database AvgThroughput AvgSize AvgDuration MinThroughput MaxThroughput MinBackupDate          
------------ ------------ -----------  -------- ------------- ------- ----------- ------------- ------------- -------------          
localhost    MSSQLSERVER  e6928404da5d BackMeUp 2.71 MB       2.71 MB 00:00:01    2.71 MB       2.71 MB       2020-08-04 21:47:25.000
#>
```

## Bonus: Snapshots

Snapshot might be considered as special kind of backup and while SSMS does not help you to create them easily without T-SQL, dbatools can help here.

![New-DbaDbSnapshot](dbatools_ssmscmd_0604_snapshot.png)

### [New-DbaDbSnapshot](https://docs.dbatools.io/#New-DbaDbSnapshot)

```powershell
# create a new snapshot
New-DbaDbSnapshot -SqlInstance $server -Database BackMeUp
```

### [Get-DbaDbSnapshot](https://docs.dbatools.io/#Get-DbaDbSnapshot)

```powershell
# get all the snapshots 
Get-DbaDbSnapshot -SqlInstance $server -Database BackMeUp
```

### [Restore-DbaDbSnapshot](https://docs.dbatools.io/#Restore-DbaDbSnapshot)

```powershell
# restore from snapshot
Restore-DbaDbSnapshot -SqlInstance $server -Database BackMeUp
```

### [Remove-DbaDbSnapshot](https://docs.dbatools.io/#Remove-DbaDbSnapshot)

```powershell
# finally, remove the snapshot
Remove-DbaDbSnapshot -SqlInstance $server -Database BackMeUp
```

That should sum up this week. dbatools have your back 🙂

Thank you,

Mikey
