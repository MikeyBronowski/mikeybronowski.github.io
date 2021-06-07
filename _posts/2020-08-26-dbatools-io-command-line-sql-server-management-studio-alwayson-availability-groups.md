---
ref: dbatools_ssmscmd_ag
title: dbatools.io = command-line SQL Server Management Studio - AlwaysOn Availability Groups
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

* [Enable-DbaAgHadr](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-alwayson-availability-groups/#Enable-DbaAgHadr)
* [Disable-DbaAgHadr](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-alwayson-availability-groups/#Enable-DbaAgHadr)
* [New-DbaAvailabilityGroup](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-alwayson-availability-groups/#New-DbaAvailabilityGroup)
* [Add-DbaAgReplica](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-alwayson-availability-groups/#New-DbaAvailabilityGroup)
* [Add-DbaAgDatabase](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-alwayson-availability-groups/#New-DbaAvailabilityGroup)
* [Add-DbaAgListener](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-alwayson-availability-groups/#New-DbaAvailabilityGroup)
* [Remove-DbaAgListener](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-alwayson-availability-groups/#New-DbaAvailabilityGroup)
* [Get-DbaAgDatabase](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-alwayson-availability-groups/#Get-DbaAgDatabase)
* [Set-DbaAgReplica](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-alwayson-availability-groups/#Set-DbaAgReplica)
* [Invoke-DbaAgFailover](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-alwayson-availability-groups/#Set-DbaAgReplica)
* [Suspend-DbaAgDbDataMovement](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-alwayson-availability-groups/#Suspend-DbaAgDbDataMovement)
* [Resume-DbaAgDbDataMovement](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-alwayson-availability-groups/#Suspend-DbaAgDbDataMovement)
* [Sync-DbaAvailabilityGroup](https://www.bronowski.it/blog/2020/08/dbatools-io-command-line-sql-server-management-studio-alwayson-availability-groups/#Sync-DbaAvailabilityGroup)

## AlwaysOn Availability Groups
The feature that has been introduced in SQL 2012 is quite an important one. Also, it requires a number of clicks there and there in SSMS. Luckily for us dbatools have set of commands to manage AlwaysOn Availability Groups from almost every angle. We will start with enabling HADR which is done in Configuration Manager rather than SSMS.

![Enable-DbaAgHadr](dbatools_ssmscmd_0901_enableaghadr.png)

### [Enable-DbaAgHadr](http://docs.dbatools.io/#Enable-DbaAgHadr)
```powershell
# Enable HADR / AlwaysOn 
Enable-DbaAgHadr -SqlInstance $server
<#
ComputerName InstanceName SqlInstance IsHadrEnabled
------------ ------------ ----------- -------------
SQL01        MSSQLSERVER  SQL01                True
#>
# in order to apply the changes - restart the SQL service
Restart-DbaService -ComputerName $server -Type Engine
<#
ComputerName : SQL01
ServiceName  : MSSQLSERVER
InstanceName : MSSQLSERVER
ServiceType  : Engine
State        : Running
Status       : Successful
Message      : Service was successfully restarted.
#>
```

### [Disable-DbaAgHadr](http://docs.dbatools.io/#Disable-DbaAgHadr)
```powershell
# to disable the feature use 
Disable-DbaAgHadr
```

## Create AG, replicas, listener
Let’s create an AG, add a replica and a listener.

![New-DbaAvailabilityGroup](dbatools_ssmscmd_0902_ag.png)

[New-DbaAvailabilityGroup](https://docs.dbatools.io/#New-DbaAvailabilityGroup)

```powershell
# add a new availability group
New-DbaAvailabilityGroup -Primary $server -Name NewAG -FailoverMode External

<#
ComputerName               : SQL01
InstanceName               : MSSQLSERVER
SqlInstance                : SQL01
LocalReplicaRole           : Primary
AvailabilityGroup          : NewAG
PrimaryReplica             : SQL01
ClusterType                : External
DtcSupportEnabled          : False
AutomatedBackupPreference  : Secondary
AvailabilityReplicas       : {SQL01}
AvailabilityDatabases      : {}
AvailabilityGroupListeners : {}
#>
```

Once the AG is created we can add replicas.

![Add-DbaAgReplica](dbatools_ssmscmd_0903_replica.png)

[Add-DbaAgReplica](http://docs.dbatools.io/#Add-DbaAgReplica)

```powershell
# add new replica
Get-DbaAvailabilityGroup -SqlInstance $server -AvailabilityGroup MikeyAG | Add-DbaAgReplica -SqlInstance $server2 -FailoverMode Manual

<#
ComputerName               : SQL01
InstanceName               : MSSQLSERVER
SqlInstance                : SQL01
AvailabilityGroup          : MikeyAG
Name                       : SQL02
Role                       : Secondary
RollupSynchronizationState : NotSynchronizing
AvailabilityMode           : SynchronousCommit
BackupPriority             : 50
EndpointUrl                : TCP://SQL02.bronowski.it:5022
SessionTimeout             : 10
FailoverMode               : Manual
ReadonlyRoutingList        : {}
#>
```

Another step would be to add a listener to our AG.

![Add-DbaAgListener](dbatools_ssmscmd_0903_replica.png)

[Add-DbaAgListener](http://docs.dbatools.io/#Add-DbaAgListener)

```powershell
# create AG listener
Add-DbaAgListener -SqlInstance $server -AvailabilityGroup MikeyAG -IPAddress $listener -Name AGListener

<#
ComputerName           : SQL01
InstanceName           : MSSQLSERVER
SqlInstance            : SQL01
AvailabilityGroup      : MikeyAG
Name                   : AGListener
PortNumber             : 1433
ClusterIPConfiguration : 
#>
```

[Remove-DbaAgListener](http://docs.dbatools.io/#Remove-DbaAgListener)

```powershell
# Remove existing AG listener - Get it first and pipe to the remove command
Get-DbaAgListener -SqlInstance $server | Remove-DbaAgListener

<#
ComputerName      : SQL01
InstanceName      : MSSQLSERVER
SqlInstance       : SQL01
AvailabilityGroup : MikeyAG
Listener          : MikeyAG
Status            : Removed
#>
```
And finally, let’s add some databases.

![Add-DbaAgDatabase](dbatools_ssmscmd_0904_agdb.png)

### [Add-DbaAgDatabase](http://docs.dbatools.io/#Add-DbaAgDatabase)
```powershell
# create a new database
New-DbaDatabase -SqlInstance $server -Name NewDB4AG
# get a full backup
Backup-DbaDatabase -SqlInstance $server -Database NewDB4AG
# add the database to the AG
Add-DbaAgDatabase -SqlInstance $server -AvailabilityGroup MikeyAG -Database NewDB4AG -Secondary $server2

<#
ComputerName         : SQL01
InstanceName         : MSSQLSERVER
SqlInstance          : SQL01
AvailabilityGroup    : MikeyAG
Replica              : SQL01
Name                 : NewDB4AG
SynchronizationState : Synchronized
IsFailoverReady      : True
IsJoined             : True
IsSuspended          : False
ComputerName         : SQL02
InstanceName         : MSSQLSERVER
SqlInstance          : SQL02
AvailabilityGroup    : MikeyAG
Replica              : SQL02
Name                 : NewDB4AG
SynchronizationState : Synchronized
IsFailoverReady      : True
IsJoined             : True
IsSuspended          : False
#>
```

## Checking all is in sync
The SQL Server Management Studio has a dashboard where you can check health of your Availability Groups. I have not seen a dashboard using dbatools, but there are commands than can pull out same information.

![Get-DbaAgDatabase](dbatools_ssmscmd_0905_agdb2.png)
### [Get-DbaAgDatabase](http://docs.dbatools.io/#Get-DbaAgDatabase)

```powershell
# See the database details
Get-DbaAgDatabase -SqlInstance $server -AvailabilityGroup MikeyAG -Database NewDB4AG

<#
ComputerName         : SQL01
InstanceName         : MSSQLSERVER
SqlInstance          : SQL01
AvailabilityGroup    : MikeyAG
Replica              : SQL01
Name                 : NewDB4AG
SynchronizationState : Synchronized
IsFailoverReady      : True
IsJoined             : True
IsSuspended          : False
#>
```

## Synching the AG and Failing it over
One of the main features of AlwaysOn availability groups is option to fail the group over to the secondary node. Having Synchronous commit mode will help to prevent data loss.

![Set-DbaAgReplica](dbatools_ssmscmd_0906_replica.png)
### [Set-DbaAgReplica](http://docs.dbatools.io/#Set-DbaAgReplica)

```powershell
# change the mode from Async to Sync
Set-DbaAgReplica -SqlInstance $server -Replica $server -AvailabilityGroup MikeyAG -AvailabilityMode SynchronousCommit

<#
ComputerName               : SQL01
InstanceName               : MSSQLSERVER
SqlInstance                : SQL01
AvailabilityGroup          : MikeyAG
Name                       : SQL01
Role                       : Primary
ConnectionState            : Connected
RollupSynchronizationState : Synchronized
AvailabilityMode           : SynchronousCommit
BackupPriority             : 50
EndpointUrl                : TCP://SQL01.bronowski.it:5022
SessionTimeout             : 10
FailoverMode               : Manual
ReadonlyRoutingList        : {}
#>
```

Once the AG is synchronised we can fail it over.

![Invoke-DbaAgFailover](dbatools_ssmscmd_0907_failover.png)

### [Invoke-DbaAgFailover](http://docs.dbatools.io/#Invoke-DbaAgFailover)

```powershell
# failover the AG (using Force as those AG are clusterless)
Invoke-DbaAgFailover -SqlInstance $server2 -AvailabilityGroup MikeyAG -Force

<#
ComputerName               : SQL02
InstanceName               : MSSQLSERVER
SqlInstance                : SQL02
LocalReplicaRole           : Primary
AvailabilityGroup          : MikeyAG
PrimaryReplica             : SQL02
ClusterType                : None
DtcSupportEnabled          : False
AutomatedBackupPreference  : Secondary
AvailabilityReplicas       : {SQL01, SQL02}
AvailabilityDatabases      : {MikeyDB}
AvailabilityGroupListeners : {}
#>
```

## Suspend\Resume data movement
Two useful alternatives to SSMS options.

![Suspend-DbaAgDbDataMovement](dbatools_ssmscmd_0908_suspend.png)

### [Suspend-DbaAgDbDataMovement](http://docs.dbatools.io/#Suspend-DbaAgDbDataMovement)
```powershell
Suspend-DbaAgDbDataMovement -SqlInstance $server -AvailabilityGroup MikeyAG -Database MikeyDb

<#
ComputerName         : SQL01
InstanceName         : MSSQLSERVER
SqlInstance          : SQL01
AvailabilityGroup    : MikeyAG
Replica              : SQL01
Name                 : MikeyDb
SynchronizationState : NotSynchronizing
IsFailoverReady      : True
IsJoined             : True
IsSuspended          : True
#>
```

### [Resume-DbaAgDbDataMovement](http://docs.dbatools.io/#Resume-DbaAgDbDataMovement)
```powershell
Resume-DbaAgDbDataMovement -SqlInstance $server -AvailabilityGroup MikeyAG -Database MikeyDb

<#
ComputerName         : SQL01
InstanceName         : MSSQLSERVER
SqlInstance          : SQL01
AvailabilityGroup    : MikeyAG
Replica              : SQL01
Name                 : MikeyDb
SynchronizationState : Synchronized
IsFailoverReady      : True
IsJoined             : True
IsSuspended          : False
#>
```

## Bonus: Sync it all up
At some point, you have lots of different objects between replicas like logins, credentials, agent jobs, other agent objects. In some scenarios, it is good to have them all in sync. I am going to show you the -WhatIf output just to get an idea.

### [Sync-DbaAvailabilityGroup](https://docs.dbatools.io/#Sync-DbaAvailabilityGroup)
```powershell
# see what can be synchronised between replicas.
Sync-DbaAvailabilityGroup -Primary $server -Secondary $server2 -WhatIf

<#
What if: Performing the operation "Sync-DbaAvailabilityGroup" on target "Syncing SQL Server Configuration from SQL01 to SQL02".
What if: Performing the operation "Sync-DbaAvailabilityGroup" on target "Syncing logins from SQL01 to SQL02".
What if: Performing the operation "Sync-DbaAvailabilityGroup" on target "Updating database owners to match newly migrated logins from SQL01 to SQL02".
What if: Performing the operation "Sync-DbaAvailabilityGroup" on target "Syncing custom errors (user defined messages) from SQL01 to SQL02".
What if: Performing the operation "Sync-DbaAvailabilityGroup" on target "Syncing SQL credentials from SQL01 to SQL02".
What if: Performing the operation "Sync-DbaAvailabilityGroup" on target "Syncing database mail from SQL01 to SQL02".
What if: Performing the operation "Sync-DbaAvailabilityGroup" on target "Syncing linked servers from SQL01 to SQL02".
What if: Performing the operation "Sync-DbaAvailabilityGroup" on target "Syncing System Triggers from SQL01 to SQL02".
What if: Performing the operation "Sync-DbaAvailabilityGroup" on target "Syncing Agent Categories from SQL01 to SQL02".
What if: Performing the operation "Sync-DbaAvailabilityGroup" on target "Syncing Agent Operators from SQL01 to SQL02".
What if: Performing the operation "Sync-DbaAvailabilityGroup" on target "Syncing Agent Alerts from SQL01 to SQL02".
What if: Performing the operation "Sync-DbaAvailabilityGroup" on target "Syncing Agent Proxy Accounts from SQL01 to SQL02".
What if: Performing the operation "Sync-DbaAvailabilityGroup" on target "Syncing Agent Schedules from SQL01 to SQL02".
What if: Performing the operation "Sync-DbaAvailabilityGroup" on target "Syncing Agent Jobs from SQL01 to SQL02".
What if: Performing the operation "Sync-DbaAvailabilityGroup" on target "Syncing login permissions from SQL01 to SQL02".
#>
```
dbatools have a couple more functions to work with AGs, but I am going to leave it to you as homework 😉

Thank you,

Mikey
