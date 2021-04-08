---
title: dbatools.io = command-line SQL Server Management Studio - Start/Stop
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
