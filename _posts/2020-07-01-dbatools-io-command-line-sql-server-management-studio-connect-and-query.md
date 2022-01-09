---
ref: dbatools_ssmscmd_connect
title: dbatools.io = command-line SQL Server Management Studio - Connect, Query and Save
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

dbatools commands used in this post:

* [Connect-DbaInstance](#Connect-DbaInstance)
* [Invoke-DbaQuery](#Invoke-DbaQuery)
* [Write-DbaDbTableData](#Write-DbaDbTableData)

## Connect to the Database Engine

It is possible in dbatools to create a server object and reuse it without providing the credentials and connecting to the instance again and again.

![Connect-DbaInstance](/assets/images/dbatools_ssmscmd_0101_connect.png)

### <a name="Connect-DbaInstance"></a>[Connect-DbaInstance](https://docs.dbatools.io/#Connect-DbaInstance)

```powershell
# set the variables
$SqlInstance = "localhost:1433"
$User = "sa"
$PWord = ConvertTo-SecureString -String "<YourStrong@Passw0rd>" -AsPlainText -Force

# create the credential object
$Credential = New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $User, $PWord

# create the server connection object
$server = Connect-DbaInstance -SqlInstance $SqlInstance -SqlCredential $Credential

# additionally, see the server object
$server

<#
ComputerName Name           Product              Version   HostPlatform IsAzure IsClustered ConnectedAs
------------ ----           -------              -------   ------------ ------- ----------- -----------
localhost    localhost,1433 Microsoft SQL Server 14.0.3048 Linux        False   False       sa         
#>
```

## Execute a simple query

Once the connection is established you can run the query.

![Invoke-DbaQuery](/assets/images/dbatools_ssmscmd_0102_execute.png)

### <a name="Invoke-DbaQuery"></a>[Invoke-DbaQuery](https://docs.dbatools.io/#Invoke-DbaQuery)

```powershell
# reuse connection object created before
Invoke-DbaQuery -SqlInstance $server -Query "SELECT @@version"

# or reuse the credential object instead
Invoke-DbaQuery -SqlInstance "localhost,1433" -SqlCredential $Credential -Query "SELECT @@version"

# when AD auth in use, simply connect to the instance without server object
Invoke-DbaQuery -SqlInstance "localhost:1433" -Query "SELECT @@version" 

# save outputs as PowerShell object
$output = Invoke-DbaQuery -SqlInstance $server -Query "SELECT @@version"

# and... see them in the grid (with a pipeline)
$output | Out-GridView
```

## Save results as…

Once you've got your results out, these can be saved as CSV or TXT file.

![Write-DbaDbTableData](/assets/images/dbatools_ssmscmd_0103_save.png)

### <a name="Write-DbaDbTableData"></a>[Write-DbaDbTableData](https://docs.dbatools.io/#Write-DbaDbTableData)

```powershell
# or... save to a TXT file
$output | Out-File -FilePath .\output.txt

# or to a CSV file
$output | Export-Csv -Path .\output.csv -NoTypeInformation

# or to any table (dbatools)
$output|Write-DbaDbTableData -SqlInstance $server -Table tempdb.dbo.customers -AutoCreateTable
```

I hope that makes the whole command-line SQL Server Management Studio thing clearer. Next week I am going to show you how to see the SQL Server objects via dbatools.

Thank you,  

Mikey

## See more

* [Export-Csv at MS Docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/export-csv)
* [Out-File at MS Docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/out-file)
