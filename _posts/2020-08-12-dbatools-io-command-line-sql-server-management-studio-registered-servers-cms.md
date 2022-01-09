---
ref: dbatools_ssmscmd_cms
title: dbatools.io = command-line SQL Server Management Studio - Registered Servers/CMS
excerpt: 
permalink: /blog/:year/:month/:title/
tags: [english, dbatools, community, tools, sqlfamily]
categories: [english, dbatools, series]
lang: en
locale: en-GB
toc: true
---

![dbatools.io = command-line SQL Server Management Studio](/assets/images/dbatools_ssmscmd.png)

This post is part of the series showing practical usage examples. The main post covering links to all posts can be found here: [dbatools.io = command-line SQL Server Management Studio: Table of contents](https://www.bronowski.it/blog/2020/06/dbatools-io-command-line-sql-server-management-studio-table-of-contents/).

Create registered servers or Central Management Servers
The built-in feature of the SSMS allows us to configure a group of SQL instances and run queries against multiple instances at once. With the registered servers you can also build a list of SQL Servers in one place, so everyone with access to the CMS can see them. First, we will start by creating registered servers and server groups.

![Add-DbaRegServer](dbatools_ssmscmd_0701_addregsrv.png)

### [Add-DbaRegServer](https://docs.dbatools.io/#Add-DbaRegServer)

```powershell
# add a new server
Add-DbaRegServer -SqlInstance $CMS -ServerName $newServer -Name TheSpecialOne
<#
Name          ServerName      Group Description Source                    
----          ----------      ----- ----------- ------                    
TheSpecialOne localhost,14444                   Central Management Servers
#>
```

In a very similar way we can add groups (folders) to the CMS.

![Add-DbaRegServerGroup](dbatools_ssmscmd_0702_addreggroup.png)

### [Add-DbaRegServerGroup](http://docs.dbatools.io/#Add-DbaRegServerGroup)

```powershell
# add a new group
Add-DbaRegServerGroup -SqlInstance $CMS -Name "NewGroup"
<#
ComputerName      : localhost
InstanceName      : MSSQLSERVER
SqlInstance       : e6928404da5d
Name              : NewGroup
DisplayName       : NewGroup
Description       : 
ServerGroups      : {}
RegisteredServers : {}
#>
```

## See the servers

Once the servers have been added, we can review them. These two commands will help you do it in PowerShell.

### [Get-DbaRegServer](http://docs.dbatools.io/#Get-DbaRegServer)

```powershell
# see the servers
Get-DbaRegServer -SqlInstance $CMS
```

### [Get-DbaRegServerGroup](http://docs.dbatools.io/#Get-DbaRegServerGroup)

```powershell
# see the groups
Get-DbaRegServerGroup -SqlInstance $CMS
```

## Move registered servers

What to do when you add server to the wrong group? Try moving it around.

![Move-DbaRegServer](dbatools_ssmscmd_0703_moveregsrv.png)

### [Move-DbaRegServer](http://docs.dbatools.io/#Move-DbaRegServer)

```powershell
Move-DbaRegServer -SqlInstance $CMS -Name TheSpecialOne -Group NewGroup
<#
Name          ServerName      Group    Description Source                    
----          ----------      -----    ----------- ------                    
TheSpecialOne localhost,14444 NewGroup             Central Management Servers
#>
```

### [Move-DbaRegServerGroup](http://docs.dbatools.io/#Move-DbaRegServerGroup)

```powershell
# add one more group
Add-DbaRegServerGroup -SqlInstance $CMS -Name "NewerGroup"
# move old group to the newer one
Move-DbaRegServerGroup -SqlInstance $CMS -Group NewGroup -NewGroup NewerGroup
<#
ComputerName      : localhost
InstanceName      : MSSQLSERVER
SqlInstance       : e6928404da5d
Name              : NewGroup
DisplayName       : NewGroup
Description       : 
ServerGroups      : {}
RegisteredServers : {TheSpecialOne}
#>

# see the changes
Get-DbaRegServerGroup -SqlInstance $CMS
<#
ComputerName      : localhost
InstanceName      : MSSQLSERVER
SqlInstance       : e6928404da5d
Name              : NewerGroup
DisplayName       : NewerGroup
Description       : 
ServerGroups      : {NewGroup}
RegisteredServers : {}
#>
```

## Remove registered servers

As usual, cleanup might be a good thing from time to time. Before you delete anything though, make sure you have a backup (read below).

![Remove-DbaRegServer](dbatools_ssmscmd_0704_removeregsrv.png)

### [Remove-DbaRegServer](http://docs.dbatools.io/#Remove-DbaRegServer)

```powershell
# remove the server without confirmation
Remove-DbaRegServer -SqlInstance $CMS -Name TheSpecialOne -Confirm:$false
<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : e6928404da5d
Name         : TheSpecialOne
ServerName   : localhost,14444
Status       : Dropped
#>
```

### [Remove-DbaRegServerGroup](http://docs.dbatools.io/#Remove-DbaRegServerGroup)

```powershell
# remove the group without confirmation
Remove-DbaRegServerGroup -SqlInstance $CMS -Name NewerGroup -Confirm:$false
<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : e6928404da5d
Name         : NewerGroup
Status       : Dropped
#>
```

## Export/Import registered servers

Having a backup of the registered servers list might be a good idea in case you need to or re-import it after something bad happens.

![Export-DbaRegServer](dbatools_ssmscmd_0705_exportregsrv.png)

### [Export-DbaRegServer](http://docs.dbatools.io/#Export-DbaRegServer)

```powershell
# export the list to the XML file
Export-DbaRegServer -SqlInstance $CMS -Path C:\Temp 
<#
    Directory: C:\Temp
Mode                LastWriteTime         Length Name                                                                                                           
----                -------------         ------ ----                                                                                                           
-a----       11/08/2020     23:36           9613 e6928404da5d-reggroup-DatabaseEngineServerGroup-08112020233630.xml  
#>
```

Once we have the file, we can import it back to the CMS.

![Import-DbaRegServer](dbatools_ssmscmd_0706_importregsrv.png)

### [Import-DbaRegServer](http://docs.dbatools.io/#Import-DbaRegServer)

```powershell
# import the servers list
Import-DbaRegServer -SqlInstance $CMS -Path C:\Temp\e6928404da5d-reggroup-DatabaseEngineServerGroup-08112020233630.xml
<#
Name          ServerName      Group               Description Source                    
----          ----------      -----               ----------- ------                    
TheSpecialOne localhost,14444 NewerGroup\NewGroup             Central Management Servers
#>
```

## Bonus: running queries against multiple instances

As mentioned above, the CMS enables users to run queries against multiple instances from a single place, but the same can be achieved with the dbatools in many ways.

![Get-DbaRegServer | Invoke-DbaQuery](dbatools_ssmscmd_0707_regservinvoke.png)

### [Get-DbaRegServer](http://docs.dbatools.io/#Get-DbaRegServer) | [Invoke-DbaQuery](http://docs.dbatools.io/#Invoke-DbaQuery)

```powershell
# define query
$sqlQuery = 'SELECT @@SERVERNAME'

# run the query against all registered servers
Get-DbaRegServer -SqlInstance $CMS | Invoke-DbaQuery -Query $sqlQuery

# alternatively, without using CMS, provide the list of the servers
$server = 'localhost,1433', 'localhost,14333'

# run a query again the servers
Invoke-DbaQuery -SqlInstance $server -Query $sqlQuery

<#
SqlInstance        
-----------        
e6928404da5d
4dc570825344   
#>
```

That is all for this week. Do you use CMS at all? If you do what is the main purpose?

Thank you,

Mikey
