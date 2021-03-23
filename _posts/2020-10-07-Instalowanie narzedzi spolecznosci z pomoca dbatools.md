---
title: Instalowanie narzędzi społeczności z pomocą dbatools
tags: [dbatools, społeczność, narzędzia, sqfamily]
excerpt: Skorzystaj z pracy i doświadczenia innych
lang: pl
ref: communitydbatools
permalink: /:year/:month/:title:output_ext
locale: pl-PL
---

> Roses are red,  
Violets are blue,  
Community loves dbatools  
dbatools love it too

Author unknown

## czym jest dbatools?

dbatools.io to zbiór poleceń PowerShell służących do zarządzanie serwerem SQL, zawartych w pojedyńczym module. Oprócz tego, jest to otwarte oprogramowanie, stworzone przez osoby pracujące z serwerem SQL i językiem PowerShell przez wiele lat. Niektórzy twierdzą, że są one [SQL Server Management Studio w wersji wiersza poleceń](https://www.bronowski.it/blog/2020/06/dbatools-io-command-line-sql-server-management-studio/) jednak myślę że to coś więcej.

## czym jest społeczność SQL?

Społeczność SQL (lub [#SQLFamily](https://twitter.com/hashtag/sqlfamily)) to grupa profesjonalistów związanych z danymi skupiona głównie wokół serwera Microsoft.

## XOXOXO

Te dwa zbiory ludzi mają część wspólną - osoby które są aktywnymi członkami społeczności i które mają swój wkład w rozwoju dbatools, stąd to przywiązanie. W większości przypadków jest to sytuacja w której każdy wygrywa.

## dziedzictwo

W tej części zaprezentuję kilka narzędzi społeczności, które są dostępne za pośrednictwem dbatools.

### [Install-DbaFirstResponder](https://docs.dbatools.io/#Install-DbaFirstResponderKit)

Zbiór skryptów oryginalnie stworzony przez osoby stojące za marką Brent Ozar Unlimited ([blog](http://www.brentozar.com/blog/)\|[twitter](https://twitter.com/BrentOzarULTD)), później udostępnione w wersji otwartego oprogoramowania.

### instalacja FRK bezpośrednio z GitHub

```powershell
Install-DbaFirstResponderKit -SqlInstance $server -Branch main -Database master -WhatIf
<#
What if: Performing the operation "Downloading zip file" on target "https://github.com/BrentOzarULTD/SQL-Server-First-Responder-Kit/archive/main.zip".
What if: Performing the operation "Copying extracted files to the local module cache" on target "LocalCachedCopy".
What if: Performing the operation "Connecting to localhost,1433" on target "localhost,1433".
What if: Performing the operation "Installing FRK procedures in master on localhost,1433" on target "master".
#>
```

<https://github.com/BrentOzarULTD/SQL-Server-First-Responder-Kit>  
<https://www.brentozar.com/responder/>

### [Install-DbaMaintenanceSolution](http://docs.dbatools.io/#Install-DbaMaintenanceSolution)

Bardzo poteżny zbiór funkcji służący do zarządzania aktywnościami konsweracyjnymi serwera SQL (kopie zapasowe, konsweracja indeksów, sprawdzania poprawności baz) stworzone przez Ola Hallengren.

```powershell
Install-DbaMaintenanceSolution -SqlInstance $server -Database master -InstallJobs -LogToTable -WhatIf 
<#
PS C:\dbatools> Install-DbaMaintenanceSolution -SqlInstance $server -Database master -InstallJobs -LogToTable -WhatIf 
What if: Performing the operation "Installing CommandLog.sql" on target "localhost,1433".
What if: Performing the operation "Installing MaintenanceSolution.sql" on target "localhost,1433".
#>
```

<https://github.com/olahallengren/sql-server-maintenance-solution>  
<https://ola.hallengren.com>

### [Install-DbaWhoIsActive](http://docs.dbatools.io/#Install-DbaWhoIsActive)

Adam Machanic ([blog](http://dataeducation.com/)\|[twitter](https://twitter.com/AdamMachanic)) stworzył procedurę składowaną bez której byłoby bardzo smutno w trakcie rozwiązywania problemów z serwerem SQL.

```powershell
Install-DbaWhoIsActive -SqlInstance $server -Database master -WhatIf  
<#  
What if: Performing the operation "Downloading sp_WhoisActive" on target "DESKTOP-VDRVEN3".
What if: Performing the operation "Unpacking zipfile" on target "DESKTOP-VDRVEN3".
What if: Performing the operation "Reading SQL file into memory" on target "DESKTOP-VDRVEN3".
What if: Performing the operation "Installing sp_WhoisActive" on target "localhost,1433".
#>
```

<https://github.com/amachanic/sp_whoisactive>  
<http://whoisactive.com>

### [Invoke-DbaDiagnosticQuery](http://docs.dbatools.io/#Invoke-DbaDiagnosticQuery)

Glenn Berry ([blog](https://glennsqlperformance.com/)\|[twitter](https://twitter.com/GlennAlanBerry)) zmienił świat administratora baz danych kiedy zebrał te wszystkie użyteczne zapytania w jednym miejscu. Kiedykolwiek napotkasz na problemy z wydajnocią serwera SQL skorzystaj ze skryptów i zobacz gdzie boli.

<https://glennsqlperformance.com/resources/>
<https://github.com/ktaranov/sqlserver-kit/tree/master/Scripts>

### [Install-DbaSqlWatch](http://docs.dbatools.io/#Install-DbaSqlWatch)

"Młodzieniec" posród narzędzi społeczności dostępnych z modułu dbatools. Rozwiązanie monitoringu w formie otwartego oprogramowania stworzone przez Marcina Gmińskiego ([blog](https://marcin.gminski.net/)\|[twitter](https://twitter.com/marcingminski)).

<https://github.com/marcingminski/sqlwatch>  
<https://sqlwatch.io>

Dziękuję,  
Mikey