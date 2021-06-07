---
ref: dbatools_ssmscmd_import
title: dbatools.io = command-line SQL Server Management Studio - Export-Import
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

dbatools commands used in this post:

* [Export-DbaScript]()
* [Export-DbaUser]()
* [Export-DbaLogin]()
* [Export-DbaDacPackage]()
* [Publish-DbaDacPackage]()
* [Export-DbaInstance]()
* [Copy-DbaDbTableData]()
* [Export-DbaDbTableData]()
* [Import-DbaCsv]()

## Script it out

The SSMS offers to script out lots of the SQL Server objects, however it can be limited in some areas. Using Get-Dba* commands and piping them into Export-DbaScript may add few more options. For example SQL Agent jobs.

![Export-DbaScript](dbatools_ssmscmd_1001_exportscript.png)

### [Export-DbaScript](http://docs.dbatools.io/#Export-DbaScript)

```powershell
# create a job
New-DbaAgentJob -SqlInstance $server -Job ScriptMeOutBeforeYouGoGo -Description StuckInMyHead
New-DbaAgentJobStep -SqlInstance $server -Job ScriptMeOutBeforeYouGoGo -StepName OneStepCloser -Subsystem TransactSql -Command "SELECT 1"

# script out the job and save to file
Get-DbaAgentJob -SqlInstance $server -Job ScriptMeOutBeforeYouGoGo | Export-DbaScript -FilePath MikeyScriptsThings.sql

# want to script out a single step? can you do it in SSMS?
Get-DbaAgentJobStep -SqlInstance $server -Job ScriptMeOutBeforeYouGoGo | Export-DbaScript -FilePath MikeyScriptsThingsStepByStep.sql
```

Exported script will contain this piece, so it is clear where it is coming from:
```sql
/*
    Created by COMPUTER\Mikey using dbatools Export-DbaScript for objects on localhost,1433 at 09/01/2020 02:45:34
    See https://dbatools.io/Export-DbaScript for more information
*/
BEGIN TRANSACTION
...
..
. 
```
In a similar way you can export multiple objects from the server to the file – an alternative to Object Explorer Details in SSMS.

![Get-DbaDbStoredProcedure](dbatools_ssmscmd_1002_sproc.png)

### [Get-DbaDbStoredProcedure](http://docs.dbatools.io/#Get-DbaDbStoredProcedure)

```powershell
# export all user sprocs 
Get-DbaDbStoredProcedure -SqlInstance $server -Database master -ExcludeSystemSp| Export-DbaScript -FilePath MikeyScriptsLittleSprocsToo.sql
```

## Export logins/users
These functions are powerful. Exporting users with all the role membership or logins with users in the databases is easy. I do not think it is that simple in SSMS.

![Export-DbaUser](dbatools_ssmscmd_1003_user.png)

### [Export-DbaUser](https://docs.dbatools.io/#Export-DbaUser)

```powershell
# export user with role memberships
Export-DbaUser -SqlInstance $server -Database master -User MikeyHasBeenHere -FilePath MikeyHasBeenHere.sql
```

```sql
USE [master]
GO
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = N'MikeyHasBeenHere')
CREATE USER [MikeyHasBeenHere] FOR LOGIN [MikeyHasBeenHere] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [MikeyHasBeenHere]
GO
GRANT CONNECT TO [MikeyHasBeenHere]  AS [dbo];
GO
```
Exporting logins is even more impressive.

![Export-DbaLogin](dbatools_ssmscmd_1004_login.png)

### [Export-DbaLogin](http://docs.dbatools.io/#Export-DbaLogin)
```powershell
# even better, export login with all the users
Export-DbaLogin -SqlInstance $server -Login MikeyHasBeenHere -FilePath MikeyHasBeenThere.sql
```

```sql
/*
    Created by DESKTOP-VDRVEN3\Mikey using dbatools Export-DbaLogin for objects on localhost,1433 at 2020-09-01 23:45:07.664
    See https://dbatools.io/Export-DbaLogin for more information
*/
USE master
GO
IF NOT EXISTS (SELECT loginname FROM master.dbo.syslogins WHERE name = 'MikeyHasBeenHere') CREATE LOGIN [MikeyHasBeenHere] WITH PASSWORD = 0x02001FCDA0D223FE7279CF5D41A842DB240DA4D036A1F5908E0C4E73A447EAB4DC8C4C147A63CB4DA5F789D762DA6D3428DAABCA1E4224DDC7BFD38272A82342E6BAF0009E8E HASHED, SID = 0x24594378502A424D9732B93BD92729C5, DEFAULT_DATABASE = [master], CHECK_POLICY = OFF, CHECK_EXPIRATION = OFF, DEFAULT_LANGUAGE = [us_english]
GO
USE master
GO
Grant CONNECT SQL TO [MikeyHasBeenHere]  AS [sa]
GO
USE [master]
GO
CREATE USER [MikeyHasBeenHere] FOR LOGIN [MikeyHasBeenHere] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [MikeyHasBeenHere]
GO
Grant CONNECT TO [MikeyHasBeenHere]  AS [dbo]
GO
```

## Manage the data-tier application/DACPAC
There are scenarios where one would like to use DACPACs, so either use SSMS wizards or handy dbatools commands.

![Export-DbaDacPackage](dbatools_ssmscmd_1005_dacpac.png)

### [Export-DbaDacPackage](https://docs.dbatools.io/#Export-DbaDacPackage)
```powershell
# export DacPac
Export-DbaDacPackage -SqlInstance $server2 -Database Imported -AllUserDatabases -Path MyDacPac

<#
Database    : Imported
Elapsed     : 14.54 s
Path        : C:\Users\micha\MyDacPac\localhost,14333-20200902112209-dacpackage.dacpac
Result      : Extracting schema (Start)
              Gathering database credentials
              Gathering database options
              Gathering generic database scoped configuration option
              Gathering users
              Gathering roles
              Gathering application roles
              Gathering role memberships
              Gathering filegroups
              Gathering full-text catalogs
              Gathering assemblies
              Gathering certificates
              Gathering asymmetric keys
              Gathering symmetric keys
              Gathering encrypted symmetric keys
              Gathering schemas
              Gathering XML schema collections
              Gathering user-defined data types
              Gathering user-defined types
              Gathering table types
              Gathering unique keys for table types
              Gathering primary keys for table types
              Gathering indexes for table types
              Gathering check constraints for table types
              Gathering default constraints for table types
              Gathering partition functions
              Gathering partition schemes
              Gathering functions
              Gathering encrypted functions
              Gathering aggregates
              Gathering procedures
              Gathering encrypted procedures
              Gathering tables
              Gathering primary keys
              Gathering unique constraints
              Gathering foreign keys
              Gathering default constraints
              Gathering check constraints
              Gathering views
              Gathering encrypted views
              Gathering indexes
              Gathering statistics
              Gathering full-text index stoplists
              Gathering search property lists
              Gathering search properties
              Gathering full-text indexes
              Gathering column store indexes
              Gathering spatial indexes
              Gathering XML indexes
              Gathering Selective XML indexes
              Gathering encrypted triggers
              Gathering triggers
              Gathering encrypted and clr ddl triggers
              Gathering ddl triggers
              Gathering synonyms
              Gathering defaults
              Gathering data constraint uddt bindings
              Gathering rules
              Gathering message types
              Gathering queues
              Gathering contracts
              Gathering services
              Gathering event notifications
              Gathering remote service bindings
              Gathering broker priorities
              Gathering signatures
              Gathering data compression options
              Gathering sequence types
              Gathering security policies
              Gather column encryption keys
              Gathering column master keys
              Gathering external data sources
              Gathering external file formats
              Gathering external tables
              Gathering extended properties
              Gathering credentials
              Gathering logins
              Gathering server audits
              Extracting schema (Complete)

SqlInstance : 37f6c33a9599
#>
```
![Publish-DbaDacPackage](dbatools_ssmscmd_1006_dacpac2.png)

### [Publish-DbaDacPackage](https://docs.dbatools.io/#Publish-DbaDacPackage)

```powershell
# publish DacPac to the database
Publish-DbaDacPackage -SqlInstance $server2 -Path 'C:\Temp\MyDacPac\localhost,14333-20200902112209-dacpackage.dacpac' -Database Imported

<#
ComputerName         : localhost
InstanceName         : MSSQLSERVER
SqlInstance          : localhost:14333
Database             : Imported
Dacpac               : C:\Temp\MyDacPac\localhost,14333-20200902112209-dacpackage.dacpac
PublishXml           : 
Result               : Initializing deployment (Start)
                       Initializing deployment (Complete)
                       Analyzing deployment plan (Start)
                       Analyzing deployment plan (Complete)
                       Reporting and scripting deployment plan (Complete)
                       Reporting and scripting deployment plan (Start)
                       Updating database (Start)
                       Creating [dbo].[syscategories]...
                       Update complete.
                       Updating database (Complete)
DeployOptions        : @{AdditionalDeploymentContributorPaths=; AdditionalDeploymentContributors=; AdditionalDeploymentContributorArguments=; 
                       AllowDropBlockingAssemblies=False; AllowIncompatiblePlatform=False; BackupDatabaseBeforeChanges=False; BlockOnPossibleDataLoss=True; 
                       BlockWhenDriftDetected=True; CommandTimeout=60; LongRunningCommandTimeout=0; DatabaseLockTimeout=60; CommentOutSetVarDeclarations=False; 
                       CompareUsingTargetCollation=False; CreateNewDatabase=False; DatabaseSpecification=Microsoft.SqlServer.Dac.DacAzureDatabaseSpecification; 
                       DeployDatabaseInSingleUserMode=False; DisableAndReenableDdlTriggers=True; DoNotAlterChangeDataCaptureObjects=True; 
                       DoNotAlterReplicatedObjects=True; DoNotDropObjectTypes=; DropConstraintsNotInSource=True; DropDmlTriggersNotInSource=True; 
                       DropExtendedPropertiesNotInSource=True; DropIndexesNotInSource=True; DropObjectsNotInSource=False; DropPermissionsNotInSource=False; 
                       DropRoleMembersNotInSource=False; DropStatisticsNotInSource=True; GenerateSmartDefaults=False; IgnoreAnsiNulls=True; 
                       IgnoreAuthorizer=False; IgnoreColumnCollation=False; IgnoreColumnOrder=False; IgnoreComments=False; 
                       IgnoreCryptographicProviderFilePath=True; IgnoreDdlTriggerOrder=False; IgnoreDdlTriggerState=False; IgnoreDefaultSchema=False; 
                       IgnoreDmlTriggerOrder=False; IgnoreDmlTriggerState=False; IgnoreExtendedProperties=False; IgnoreFileAndLogFilePath=True; 
                       IgnoreFilegroupPlacement=True; IgnoreFileSize=True; IgnoreFillFactor=True; IgnoreFullTextCatalogFilePath=True; IgnoreIdentitySeed=False; 
                       IgnoreIncrement=False; IgnoreIndexOptions=False; IgnoreIndexPadding=True; IgnoreKeywordCasing=True; IgnoreLockHintsOnIndexes=False; 
                       IgnoreLoginSids=True; ExcludeObjectTypes=; IgnoreNotForReplication=False; IgnoreObjectPlacementOnPartitionScheme=True; 
                       IgnorePartitionSchemes=False; IgnoreTablePartitionOptions=False; IgnorePermissions=False; IgnoreQuotedIdentifiers=True; 
                       IgnoreRoleMembership=False; IgnoreRouteLifetime=True; IgnoreSemicolonBetweenStatements=True; IgnoreTableOptions=False; 
                       IgnoreUserSettingsObjects=False; IgnoreWhitespace=True; IgnoreWithNocheckOnCheckConstraints=False; IgnoreWithNocheckOnForeignKeys=False; 
                       AllowUnsafeRowLevelSecurityDataMovement=False; IncludeCompositeObjects=False; IncludeTransactionalScripts=False; 
                       NoAlterStatementsToChangeClrTypes=False; PopulateFilesOnFileGroups=True; RegisterDataTierApplication=False; 
                       RunDeploymentPlanExecutors=False; ScriptDatabaseCollation=False; ScriptDatabaseCompatibility=False; ScriptDatabaseOptions=True; 
                       ScriptDeployStateChecks=False; ScriptFileSize=False; ScriptNewConstraintValidation=True; ScriptRefreshModule=True; 
                       TreatVerificationErrorsAsWarnings=False; UnmodifiableObjectWarnings=True; VerifyCollationCompatibility=True; VerifyDeployment=True}
SqlCmdVariableValues : {}
#>
```

## Crème de la crème – export everything
Imagine you would like to script out the whole instance, what would be the best way to do it in the SSMS?

### [Export-DbaInstance](https://docs.dbatools.io/#Export-DbaInstance)

```powershell
# one of the best one-liners
Export-DbaInstance -SqlInstance $server -Path MySQLOops

<#
    Directory: C:\Users\micha\MySQLOops\localhost,1433-09012020004734
Mode                 LastWriteTime         Length Name                                                                                                          
----                 -------------         ------ ----                                                                                                          
-a----        02/09/2020     10:47           3844 1-sp_configure.sql                                                                                            
-a----        02/09/2020     10:47            540 2-serverroles.sql                                                                                             
-a----        02/09/2020     10:47           1365 3-dbmail.sql                                                                                                  
-a----        02/09/2020     10:47              0 4-databases.sql                                                                                               
-a----        02/09/2020     10:47            584 5-logins.sql                                                                                                  
-a----        02/09/2020     10:47            458 6-resourcegov.sql                                                                                             
-a----        02/09/2020     10:47          11968 7-extendedevents.sql                                                                                          
-a----        02/09/2020     10:47           4338 8-sqlagent.sql                                                                                                
-a----        02/09/2020     10:47            680 9-userobjectsinsysdbs.sql      
#>
```

## Import/Export data
SQL Server objects are not the only thing you can export or import. Every now and then DBA would need to shuffle some data. For this reason the Import and Export Wizard can be used or dbatools commands.

![Copy-DbaDbTableData](dbatools_ssmscmd_1007_tabledatacopy.png)

### [Copy-DbaDbTableData](https://docs.dbatools.io/#Copy-DbaDbTableData)

```powershell
# copy data between SQL Server instances
Copy-DbaDbTableData -SqlInstance $server -Database msdb -Table syscategories -Destination $server2 -DestinationDatabase model -AutoCreateTable

<#
SourceInstance      : localhost,1433
SourceDatabase      : msdb
SourceSchema        : dbo
SourceTable         : syscategories
DestinationInstance : localhost,14333
DestinationDatabase : model
DestinationSchema   : dbo
DestinationTable    : syscategories
RowsCopied          : 21
Elapsed             : 311.11 ms
#>
```
![Export-DbaDbTableData](dbatools_ssmscmd_1008_tabledataexport.png)

### [Export-DbaDbTableData](https://docs.dbatools.io/#Export-DbaDbTableData)

```powershell
# export table as a collection of INSERT INTO statements
Get-DbaDbTable -SqlInstance $server -Database msdb -Table syscategories | Export-DbaDbTableData -FilePath MikeyDoesData.sql
```
![Import-DbaCsv](dbatools_ssmscmd_1009_csvimport.png)

### [Import-DbaCsv](https://docs.dbatools.io/#Import-DbaCsv)

```powershell
# import CSV file into SQL Server instance
Import-DbaCsv -Path 'pigeon-racing.csv' -SqlInstance $server2 -Database imported -AutoCreateTable

<#
ComputerName  : localhost
InstanceName  : MSSQLSERVER
SqlInstance   : 37f6c33a9599
Database      : imported
Table         : pigeon-racing
Schema        : dbo
RowsCopied    : 400
Elapsed       : 622.27 ms
RowsPerSecond : 648
Path          : C:\Users\micha\pigeon-racing.csv
#>

# import multiple CSV files at once
Get-ChildItem -Path . -Filter *CSV* | Import-DbaCsv -SqlInstance $server2 -Database imported -AutoCreateTable

<#
ComputerName  : localhost
InstanceName  : MSSQLSERVER
SqlInstance   : 37f6c33a9599
Database      : imported
Table         : chopstick-effectiveness
Schema        : dbo
RowsCopied    : 186
Elapsed       : 228.21 ms
RowsPerSecond : 817
Path          : C:\Users\micha\chopstick-effectiveness.csv
ComputerName  : localhost
InstanceName  : MSSQLSERVER
SqlInstance   : 37f6c33a9599
Database      : imported
Table         : pigeon-racing
Schema        : dbo
RowsCopied    : 400
Elapsed       : 239.08 ms
RowsPerSecond : 1678
Path          : C:\Users\micha\pigeon-racing.csv
#>
```

Being able to import and export objects or data from SQL Server in a simple way makes life much easier.

Thank you,

Mikey
