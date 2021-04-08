---
ref: dbatools_ssmscmd_config
title: dbatools.io = command-line SQL Server Management Studio - SQL Configuration
excerpt: 
permalink: /:year/:month/:title
tags: [english, dbatools, community, tools, sqlfamily]
categories: [english, dbatools, series]
lang: en
locale: en-GB
toc: true
---
![dbatools.io = command-line SQL Server Management Studio](dbatools_ssmscmd.png)

This post is part of the series showing practical usage examples. The main post covering links to all posts can be found here: [dbatools.io = command-line SQL Server Management Studio: Table of contents](https://www.bronowski.it/blog/2020/06/dbatools-io-command-line-sql-server-management-studio-table-of-contents/).

dbatools commands used in this post:

* [Get-DbaSpConfigure](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-sql-configuration/#Get-DbaSpConfigure)
* [Export-DbaSpConfigure](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-sql-configuration/#Get-DbaSpConfigure)
* [Set-DbaSpConfigure](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-sql-configuration/#Get-DbaSpConfigure)
* [Import-DbaSpConfigure](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-sql-configuration/#Get-DbaSpConfigure)
* [Set-DbaMaxDop](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-sql-configuration/#Set-DbaMaxDop)
* [Set-DbaMaxMemory](https://docs.dbatools.io/#Set-DbaMaxMemory)

## SQL Server configuration / sp_configure
SQL Server allows its users to configure a lot of things. From ‘Ad Hoc Distributed Queries’ through ‘max degree of parallelism’ to ‘xp_cmdshell’. Some of those can be done via SQL instance properties or the famous sp_configure. With dbatools, there are a few more options to manage the SQL Server configuration.

![Get-DbaSpConfigure](dbatools_ssmscmd_0801_config.png)
### [Get-DbaSpConfigure](https://docs.dbatools.io/#Get-DbaSpConfigure)

```powershell
# Get the config options - present as separate windows
Get-DbaSpConfigure -SqlInstance $server | Out-GridView
# or
# define options you want to check (use DisplayName)
$configOptions = 'cost threshold for parallelism','max degree of parallelism'
# see the options
Get-DbaSpConfigure -SqlInstance $server -Name $configOptions | Format-Table
<#
ComputerName ConfiguredValue DefaultValue Description                    DisplayName                    InstanceName IsAdvanced IsDynamic IsRunningDefault
                                                                                                                                                     Value
------------ --------------- ------------ -----------                    -----------                    ------------ ---------- --------- ----------------
localhost                  5            5 cost threshold for parallelism cost threshold for parallelism MSSQLSERVER        True      True             True
localhost                  0            0 maximum degree of parallelism  max degree of parallelism      MSSQLSERVER        True      True             True
#>
```

### [Export-DbaSpConfigure](https://docs.dbatools.io/#Export-DbaSpConfigure)
```powershell
# Export/backup all the config to file as T-SQL script
Export-DbaSpConfigure -SqlInstance $server -FilePath SqlConfig.txt
# See the content
Invoke-Item SqlConfig.txt
<#
EXEC sp_configure 'show advanced options' , 1;  RECONFIGURE WITH OVERRIDE
EXEC sp_configure 'recovery interval (min)' , 0;
EXEC sp_configure 'allow updates' , 0;
EXEC sp_configure 'user connections' , 0;
#>
```

### [Set-DbaSpConfigure](https://docs.dbatools.io/#Set-DbaSpConfigure)
```powershell
# set config value
Set-DbaSpConfigure -SqlInstance $server -Name 'max degree of parallelism' -Value 4
<#
ComputerName  : localhost
InstanceName  : MSSQLSERVER
SqlInstance   : e6928404da5d
ConfigName    : MaxDegreeOfParallelism
PreviousValue : 0
NewValue      : 4
#>
```

### [Import-DbaSpConfigure](https://docs.dbatools.io/#Import-DbaSpConfigure)
```powershell
# import config from file
Import-DbaSpConfigure -SqlInstance $server -Path SqlConfig.txt
<#
...
[04:17:58][Import-DbaSpConfigure] Successfully executed EXEC sp_configure 'allow polybase export' , 0;.
[04:17:58][Import-DbaSpConfigure] Successfully executed EXEC sp_configure 'show advanced options' , 0;.
[04:17:58][Import-DbaSpConfigure] Successfully executed RECONFIGURE WITH OVERRIDE.
WARNING: [14:17:58][Import-DbaSpConfigure] Some configuration options will be updated once SQL Server is restarted.
[04:17:58][Import-DbaSpConfigure] SQL Server configuration options migration finished.
#>
# see the config that was changed after export
Get-DbaSpConfigure -SqlInstance $server -Name 'max degree of parallelism' | SELECT ComputerName, DisplayName, ConfiguredValue
<#
ComputerName DisplayName               ConfiguredValue
------------ -----------               ---------------
localhost    max degree of parallelism               0
#>
```

## Suggested max memory and MAXDOP configuration
dbatools even offer help with deciding what your max memory and MAXDOP should be. Use below functions to set the values based on industry recommendations that could be considered as a starting point.

### [Set-DbaMaxDop](https://docs.dbatools.io/#Set-DbaMaxDop)
```powershell
Set-DbaMaxDop -SqlInstance $server
```

### [Set-DbaMaxMemory](https://docs.dbatools.io/#Set-DbaMaxMemory)
```powershell
Set-DbaMaxMemory -SqlInstance $server
```
With only few dbatools commands it is possible to manage SQL configuration efficiently.

Thank you,

Mikey
