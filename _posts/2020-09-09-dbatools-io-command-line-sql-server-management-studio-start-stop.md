---
ref: dbatools_ssmscmd_start
title: dbatools.io = command-line SQL Server Management Studio - Start/Stop
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

* [Get-DbaService](https://www.bronowski.it/blog/2020/09/dbatools-io-command-line-sql-server-management-studio-start-stop/#Get-DbaService)
* [Stop-DbaService](https://www.bronowski.it/blog/2020/09/dbatools-io-command-line-sql-server-management-studio-start-stop/#Get-DbaService)
* [Start-DbaService](https://www.bronowski.it/blog/2020/09/dbatools-io-command-line-sql-server-management-studio-start-stop/#Get-DbaService)
* [Restart-DbaService](https://www.bronowski.it/blog/2020/09/dbatools-io-command-line-sql-server-management-studio-start-stop/#Get-DbaService)
* [Start-DbaAgentJob](https://www.bronowski.it/blog/2020/09/dbatools-io-command-line-sql-server-management-studio-start-stop/#Start-DbaAgentJob)
* [Stop-DbaAgentJob](https://www.bronowski.it/blog/2020/09/dbatools-io-command-line-sql-server-management-studio-start-stop/#Start-DbaAgentJob)
* [New-DbaEndpoint](https://www.bronowski.it/blog/2020/09/dbatools-io-command-line-sql-server-management-studio-start-stop/#New-DbaEndpoint)
* [Start-DbaEndpoint](https://www.bronowski.it/blog/2020/09/dbatools-io-command-line-sql-server-management-studio-start-stop/#New-DbaEndpoint)
* [Stop-DbaEndpoint](https://www.bronowski.it/blog/2020/09/dbatools-io-command-line-sql-server-management-studio-start-stop/#New-DbaEndpoint)
* [Start-DbaTrace](https://www.bronowski.it/blog/2020/09/dbatools-io-command-line-sql-server-management-studio-start-stop/#Start-DbaTrace)
* [Get-DbaTrace](https://www.bronowski.it/blog/2020/09/dbatools-io-command-line-sql-server-management-studio-start-stop/#Start-DbaTrace)
* [Stop-DbaTrace](https://www.bronowski.it/blog/2020/09/dbatools-io-command-line-sql-server-management-studio-start-stop/#Start-DbaTrace)
* [Start-DbaXESession](https://www.bronowski.it/blog/2020/09/dbatools-io-command-line-sql-server-management-studio-start-stop/#Start-DbaXESession)
* [Stop-DbaXESession](https://www.bronowski.it/blog/2020/09/dbatools-io-command-line-sql-server-management-studio-start-stop/#Start-DbaXESession)

## SQL Services

OK, let’s start. While doing some maintenance tasks there is a need to start/stop/restart SQL Services. Using SQL Server Configuration Manager is one way or even straight from SSMS, however, working with multiple instances is easier with dbatools.

![Get-DbaService](dbatools_ssmscmd_1101_service.png)

### [Get-DbaService](https://docs.dbatools.io/#Get-DbaService)
```powershell
# get the engine service only
Get-DbaService -ComputerName $server -Type Engine| Format-Table

<#
ComputerName  ServiceName  ServiceType InstanceName DisplayName         StartName         State   StartMode
------------  -----------  ----------- ------------ -----------         ---------         -----   ---------
localhost     MSSQL$Insta1 Engine      Insta1       SQL Server (Insta1) BRONOWSKI\SQLSvc  Running Manual
localhost     MSSQL$Insta2 Engine      Insta2       SQL Server (Insta2) BRONOWSKI\SQLSvc  Running Manual
#>
```

### [Stop-DbaService](https://docs.dbatools.io/#Get-DbaService)

```powershell
# stop the agent service only
Get-DbaService -ComputerName $server -Type Agent| Stop-DbaService

<#
ComputerName  ServiceName  ServiceType InstanceName DisplayName               StartName         State   StartMode
------------  -----------  ----------- ------------ -----------               ---------         -----   ---------
localhost     SQLAgent$Insta1 Agent       Insta1    SQL Server Agent (Insta1) BRONOWSKI\SQLSvc  Stopped Manual
localhost     SQLAgent$Insta2 Agent       Insta2    SQL Server Agent (Insta2) BRONOWSKI\SQLSvc  Stopped Manual
#>
```

### [Start-DbaService](https://docs.dbatools.io/#Start-DbaService)

```powershell
# start the browser service only
Get-DbaService -ComputerName $server -Type Browser| start -DbaService

<#
ComputerName ServiceName ServiceType InstanceName DisplayName        StartName                 State   StartMode
------------ ----------- ----------- ------------ -----------        ---------                 -----   ---------
localhost    SQLBrowser  Browser                  SQL Server Browser NT AUTHORITY\LOCALSERVICE Running Automatic
#>
```

### [Restart-DbaService](https://docs.dbatools.io/#Restart-DbaService)

```powershell
# restart all
Restart-DbaService -ComputerName $server
```

## SQL Agent
How many times did you want to kick off the SQL Agent jobs on multiple servers? Too many probably. Not an easy task to do in SSMS (at least without the use of MSX/TSX). With dbatools these things are possible. Start/Stop agent jobs without issues. One note though, in SSMS you can start the job on a specific step, however in dbatools that option is not available (at least not at the moment). There is a feature request on GitHub already, so it might be there in the future 🙂

![Start-DbaAgentJob](dbatools_ssmscmd_1102_agentstart.png)

### [Start-DbaAgentJob](http://docs.dbatools.io/#Start-DbaAgentJob)

```powershell
# create a job that will run for some time
New-DbaAgentJob -SqlInstance $server -Job RunMeNowThenStop
New-DbaAgentJobStep -SqlInstance $server -Job RunMeNowThenStop -StepName Step1 -Command "WAITFOR DELAY '00:01:01'"

# start the job
Start-DbaAgentJob -SqlInstance $server -Job RunMeNowThenStop

<#
ComputerName           : localhost
InstanceName           : MSSQLSERVER
SqlInstance            : e6928404da5d
Name                   : RunMeNowThenStop
Category               : [Uncategorized (Local)]
OwnerLoginName         : sa
CurrentRunStatus       : Executing
CurrentRunRetryAttempt : 0
Enabled                : True
LastRunDate            : 09/09/2020 19:25:45
LastRunOutcome         : Succeeded
HasSchedule            : False
OperatorToEmail        : 
CreateDate             : 09/09/2020 19:21:41
#>
```

![Stop-DbaAgentJob](dbatools_ssmscmd_1103_agentstop.png)

### [Stop-DbaAgentJob](http://docs.dbatools.io/#Stop-DbaAgentJob)

```powershell
# combine Get- and Stop- to cancel the job execution
Get-DbaAgentJob -SqlInstance $server -Job RunMeNowThenStop | Stop-DbaAgentJob

<#
ComputerName           : localhost
InstanceName           : MSSQLSERVER
SqlInstance            : e6928404da5d
Name                   : RunMeNowThenStop
Category               : [Uncategorized (Local)]
OwnerLoginName         : sa
CurrentRunStatus       : Idle
CurrentRunRetryAttempt : 0
Enabled                : True
LastRunDate            : 09/09/2020 19:27:35
LastRunOutcome         : Cancelled
HasSchedule            : False
OperatorToEmail        : 
CreateDate             : 09/09/2020 19:21:41
#>
```

## SQL Endpoint
When configuring Availability Groups you might want to have endpoint created as well. It is hidden under Server Objects, but as you can see there is no option to create on from SSMS in the Object Explorer. dbatools offer a set of functions to fill that gap.

![New-DbaEndpoint](dbatools_ssmscmd_1105_endpoint.png)

### [New-DbaEndpoint](http://docs.dbatools.io/#New-DbaEndpoint)

```powershell
# create a new endpoint - stopped by default
New-DbaEndpoint -SqlInstance $server -Name AGEndpoint -Type DatabaseMirroring

<#
ComputerName    : localhost
InstanceName    : MSSQLSERVER
SqlInstance     : e6928404da5d
ID              : 65536
Name            : AGEndpoint
Port            : 5022
EndpointState   : Stopped
EndpointType    : DatabaseMirroring
Owner           : sa
IsAdminEndpoint : False
Fqdn            : TCP://DESKTOP-VDRVEN3:5022
IsSystemObject  : False
#>
```

### [Start-DbaEndpoint](http://docs.dbatools.io/#Start-DbaEndpoint)

```powershell
# combine Get- and Start- to start the endpoint
Get-DbaEndpoint -SqlInstance $server -Endpoint AGEndpoint | Start-DbaEndpoint

<#
ComputerName    : localhost
InstanceName    : MSSQLSERVER
SqlInstance     : e6928404da5d
ID              : 65536
Name            : AGEndpoint
Port            : 5022
EndpointState   : Started
EndpointType    : DatabaseMirroring
Owner           : sa
IsAdminEndpoint : False
Fqdn            : TCP://DESKTOP-VDRVEN3:5022
IsSystemObject  : False
#>
```

### [Stop-DbaEndpoint](http://docs.dbatools.io/#Stop-DbaEndpoint)

```powershell
# stop the endpoint with single command
Stop-DbaEndpoint -SqlInstance $server -Endpoint AGEndpoint -Confirm:$false

<#
ComputerName    : localhost
InstanceName    : MSSQLSERVER
SqlInstance     : e6928404da5d
ID              : 65536
Name            : AGEndpoint
Port            : 5022
EndpointState   : Stopped
EndpointType    : DatabaseMirroring
Owner           : sa
IsAdminEndpoint : False
Fqdn            : TCP://DESKTOP-VDRVEN3:5022
IsSystemObject  : False
#>
```

## SQL Trace
If you cannot use XE because your environment is too old, there is a way to see what is happening on your server – SQL Trace might save you. There is no option to create it from SSMS or dbatools directly, you would need to use Profiler to generate the T-SQL. I did this, but then I can manage traces via PowerShell commands. Read more on traces on the [dbatools website](https://dbatools.io/traces/).

### [Get-DbaTrace](https://docs.dbatools.io/#Get-DbaTrace)

```powershell
# see the available traces - have created one manually
Get-DbaTrace -SqlInstance $server | Format-Table

<#
BufferCount BufferSize ComputerName DroppedEventCount EventCount FilePosition Id InstanceName IsDefault IsRollover IsRowset IsRunning IsShutdown LastEventTime  
----------- ---------- ------------ ----------------- ---------- ------------ -- ------------ --------- ---------- -------- --------- ---------- -------------  
          2       1024 localhost                            1145      1048576  1 MSSQLSERVER       True       True    False      True      False 09/09/2020 2...
          2       1024 localhost                             720      1048576  2 MSSQLSERVER      False      False    False      True      False 09/09/2020 2...
          2       1024 localhost                             726      1048576  3 MSSQLSERVER      False      False    False      True      False 09/09/2020 2...
#>
```

### [Stop-DbaTrace](https://docs.dbatools.io/#Stop-DbaTrace)

```powershell
# stop multiple traces
Stop-DbaTrace -SqlInstance $server -Id 2,3 | Format-Table

<#
BufferCount BufferSize ComputerName DroppedEventCount EventCount FilePosition Id InstanceName IsDefault IsRollover IsRowset IsRunning IsShutdown LastEventTime  
----------- ---------- ------------ ----------------- ---------- ------------ -- ------------ --------- ---------- -------- --------- ---------- -------------  
          2       1024 localhost                             333      1048576  2 MSSQLSERVER      False      False    False     False      False 09/09/2020 2...
          2       1024 localhost                             350      1048576  3 MSSQLSERVER      False      False    False     False      False 09/09/2020 2...
#>
```

### [Start-DbaTrace](https://docs.dbatools.io/#Start-DbaTrace)

```powershell
# start all traces - see the warning about the default trace
Start-DbaTrace -SqlInstance $server | Format-Table

<#
WARNING: [21:08:29][Start-DbaTrace] The default trace on [localhost,1433] cannot be started. Use Set-DbaSpConfigure to turn it on.
BufferCount BufferSize ComputerName DroppedEventCount EventCount FilePosition Id InstanceName IsDefault IsRollover IsRowset IsRunning IsShutdown LastEventTime  
----------- ---------- ------------ ----------------- ---------- ------------ -- ------------ --------- ---------- -------- --------- ---------- -------------  
          2       1024 localhost                             525      1048576  2 MSSQLSERVER      False      False    False      True      False 09/09/2020 2...
          2       1024 localhost                             543      1048576  3 MSSQLSERVER      False      False    False      True      False 09/09/2020 2...
#>
```

## XE session
Those lucky DBAs who work with newer version of SQL Server may need to manage XE sessions. It is possible to do it via SSMS as well as dbatools.

![Start-DbaXESession](dbatools_ssmscmd_1106_xesession.png)

### [Start-DbaXESession](https://docs.dbatools.io/#Start-DbaXESession)

```powershell
# by default this session is not running on my server - let's start it
Start-DbaXESession -SqlInstance $server -Session AlwaysOn_health 

<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : e6928404da5d
Name         : AlwaysOn_health
Status       : Running
StartTime    : 09/09/2020 20:17:29
AutoStart    : False
State        : Existing
Targets      : {package0.event_file}
TargetFile   : {/var/opt/mssql/log\AlwaysOn_health.xel}
Events       : {sqlserver.alwayson_ddl_executed, sqlserver.availability_group_lease_expired, sqlserver.availability_replica_automatic_failover_validation, 
               sqlserver.availability_replica_manager_state_change...}
MaxMemory    : 4096
MaxEventSize : 0
#>
```

### [Stop-DbaXESession](https://docs.dbatools.io/#Stop-DbaXESession)

```powershell
# in the same way we can stop the session
Stop-DbaXESession -SqlInstance $server -Session AlwaysOn_health 

<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : e6928404da5d
Name         : AlwaysOn_health
Status       : Stopped
StartTime    : 
AutoStart    : False
State        : Existing
Targets      : {package0.event_file}
TargetFile   : {/var/opt/mssql/log\AlwaysOn_health.xel}
Events       : {sqlserver.alwayson_ddl_executed, sqlserver.availability_group_lease_expired, sqlserver.availability_replica_automatic_failover_validation, 
               sqlserver.availability_replica_manager_state_change...}
MaxMemory    : 4096
MaxEventSize : 0
#>
```

That might a good moment to stop this post.

Thank you,

Mikey