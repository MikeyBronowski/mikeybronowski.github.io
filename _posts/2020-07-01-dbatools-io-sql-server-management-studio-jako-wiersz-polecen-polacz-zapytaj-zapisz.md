---
ref: dbatools_ssmscmd_connect
title: dbatools.io = SQL Server Management Studio jako wiersz poleceń - Połącz, Zapytaj, Zapisz
excerpt: 
permalink: /blog/:year/:month/:title/
tags: [polski, seria, dbatools, społeczność, narzędzia, sqfamily]
categories: [polski, seria, dbatools]
lang: pl
locale: pl-PL
toc: true
---

![dbatools.io = SQL Server Management Studio jako wiersz poleceń](/assets/images/dbatools_ssmscmd.png)

Ten wpis jest częścią serii ukazującej praktyczne przykłady użycia modułu. Główny wpis zawierający odnośniki do pozostałych wpisów serii można znaleźć tutaj: [dbatools.io = SQL Server Management Studio jako wiersz poleceń - spis treści](/blog/2020/06/dbatools-io-sql-server-management-studio-jako-wiersz-polecen-spis-tresci/).

## Połączenie z bazą danych

Z pomocą dbatools mamy możliwość stworzenia obiektu serwera i ponowne jego użycie bez potrzeby podawania danych uwierzytelnienie oraz wieloktornego podłączania do bazy.

![Connect-DbaInstance](dbatools_ssmscmd_0101_connect.png)

### [Connect-DbaInstance](https://docs.dbatools.io/#Connect-DbaInstance)

```powershell
# ustalamy zmienne
$SqlInstance = "localhost:1433"
$User = "sa"
$PWord = ConvertTo-SecureString -String "<YourStrong@Passw0rd>" -AsPlainText -Force

# tworzymy obiekt uwierzytelnienia
$Credential = New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $User, $PWord

# tworzymy obiekt podłączenia do serwera
$server = Connect-DbaInstance -SqlInstance $SqlInstance -SqlCredential $Credential

# podgląd obiektu serwera
$server

<#
ComputerName Name           Product              Version   HostPlatform IsAzure IsClustered ConnectedAs
------------ ----           -------              -------   ------------ ------- ----------- -----------
localhost    localhost,1433 Microsoft SQL Server 14.0.3048 Linux        False   False       sa         
#>
```

## Wykonywanie prostego zapytania

Po utworzeniu obiektu serwera możemy wykonać zapytanie.

![Invoke-DbaQuery](dbatools_ssmscmd_0102_execute.png)

### [Invoke-DbaQuery](https://docs.dbatools.io/#Invoke-DbaQuery)

```powershell
# ponowne użycie wcześniej utworzonego obiektu serwera
Invoke-DbaQuery -SqlInstance $server -Query "SELECT @@version"

# lub obiektu uwierzytelnienia
Invoke-DbaQuery -SqlInstance "localhost,1433" -SqlCredential $Credential -Query "SELECT @@version"

# w sytuacji, w której korzystamy z uwierzytelnienia Active Directory wystarczy podłączyć się bezpośrednio do serwera
Invoke-DbaQuery -SqlInstance "localhost:1433" -Query "SELECT @@version" 

# zapisanie wyników zapytania jako obiekt PowerShell
$output = Invoke-DbaQuery -SqlInstance $server -Query "SELECT @@version"

# oraz ich podgląd w formie tabelarycznej
$output | Out-GridView
```

## Save results as…

Otrzymane wyniki możemy zapisać do pliku, na przykład CSV lub TXT.

![Write-DbaDbTableData](dbatools_ssmscmd_0103_save.png)

### [Write-DbaDbTableData](https://docs.dbatools.io/#Write-DbaDbTableData)

```powershell
# zapisanie wyników w pliku TXT
$output | Out-File -FilePath .\output.txt

# lub w pliku CSV
$output | Export-Csv -Path .\output.csv -NoTypeInformation

# lub do tabeli (za pomocą dbatools)
$output|Write-DbaDbTableData -SqlInstance $server -Table tempdb.dbo.customers -AutoCreateTable
```

Mam nadzieję, że koncept SQL Server Management Studio jako wiersz poleceń jest teraz bardziej klarowny.

Dziękuję,  

Mikey

## Zobacz więcej
* [Export-Csv w dokumentacji Microsoft](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/export-csv)
* [Out-File w dokumentacji Microsoft](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/out-file)
