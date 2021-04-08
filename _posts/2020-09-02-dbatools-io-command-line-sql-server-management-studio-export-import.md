---
title: dbatools.io = command-line SQL Server Management Studio - Export-Import
tags: [english, dbatools, community, tools, sqlfamily]
categories: [english, dbatools, series]
excerpt: 
lang: en
ref: dbatools_ssmscmd_cert
permalink: /:year/:month/:title
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

The SSMS offers to script out lots of the SQL Server objects, however it can be limited in some areas. Using Get-Dba* commands and piping them into Export-DbaScript may add few more options. For example SQL Agent jobs:
