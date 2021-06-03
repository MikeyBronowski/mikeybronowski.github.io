---
ref: importexcel_intro_1
title: PowerShell into Excel - ImportExcel Module Part 1
excerpt: 
tags: [english, importexcel, community, tools]
categories: [english, importexcel, tools]
lang: en
locale: en-GB
permalink: /blog/:year/:month/:title
toc: true
---

![PowerShell into Excel - ImportExcel Module Part 1](/assets/images/importexcel-intro-1-01.png)

While ago I needed to do some manipulation on Excel spreadsheets but had no Office installed on the server. For the specific case, I looked for a way to complete my task with PowerShell. A quick look into Google search results and…

![](/assets/images/importexcel-intro-1-01-google.png)

Even though the name is not specified, both articles talk about the ImportExcel module (if you scroll down the results a bit you will see this [link](https://dfinke.github.io/powershell/2019/07/31/Creating-beautiful-Powershell-Reports-in-Excel.html)).

If you like the topic please have a look at the series of different usage scenarios.

Winter series of PowerShell and Excel

## What is ImportExcel?

I will use Doug's description from the GitHub repository:

> This PowerShell Module allows you to read and write Excel files without installing Microsoft Excel on your system. No need to bother with the cumbersome Excel COM-object. Creating Tables, Pivot Tables, Charts and much more has just become a lot easier.

That's right! No need to install Microsoft Excel.

I have recently tested the 7.1.0 version and it contains about 60 functions. Some of the functions are:

> Add-ConditionalFormatting
> Add-ExcelTable
> Compare-Worksheet
> ConvertFrom-ExcelToSQLInsert
> Export-Excel
> Import-Excel
> Join-Worksheet
> PieChart
> Pivot

## ImportExcel – quick start

Firstly, to get the module installed on my machine I have ran this short script:

```powershell
# set the execution policy for the current process
Set-ExecutionPolicy Bypass -Scope Process
# install and import module
Install-Module -Name ImportExcel
Import-Module -Name ImportExcel
# confirm the module is installed
Get-Module -Name ImportExcel
<#
ModuleType Version    Name                                ExportedCommands                                                                                               
---------- -------    ----                                ----------------                                                                                               
Script     7.1.0      ImportExcel                         {Add-ConditionalFormatting, Add-ExcelChart, Add-ExcelDataValidationRule, Add-ExcelName...} 
#>
```

Secondly, let's see what this tool can do! I would like to see all the commands from the module and export their names to the Excel spreadsheet:

```powershell
# get all the functions from the module and export as a spreadsheet
Get-Command -Module ImportExcel | SELECT Name | Export-Excel
```

As a result, I am getting new Excel windows open with temporary name **tmpF12D** located in $env:TEMP with output formatted as a spreadsheet table **Table1**.

![Exported file in Excel spreadsheet format with named range (Excel table)](/assets/images/importexcel-intro-1-02-quickstart.png)

That was easy, but I want to see more.

## ImportExcel – how to?

I have created an Excel spreadsheet from PowerShell, but what else I could do?

### ImportExcel – how to work with worksheets?

As a matter of fact the ImportExcel module allows to manipulate worksheets.

```powershell
# go to the temporary location
Set-Location $env:TEMP
# load the spreadsheet
$filename = 'tmpF12D.xlsx'
$excel = Open-ExcelPackage -Path $filename
# add an extra sheet to the end
Add-Worksheet -ExcelPackage $excel -WorksheetName Mikey -MoveToEnd
# and save it back to the file and show the file
Close-ExcelPackage -ExcelPackage $excel -Show
<# 
Unfortunately getting an error:
Exception calling "Save" with "0" argument(s): "Error saving file C:\Users\Mikey\AppData\Local\Temp\tmpF12D.xlsx"
At C:\Users\michaMikey\OneDrive\Documents\WindowsPowerShell\Modules\ImportExcel\7.1.0\Public\Close-ExcelPackage.ps1:27 char:29
+             else           {$ExcelPackage.Save()          }
+                             ~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:) [], MethodInvocationException
    + FullyQualifiedErrorId : InvalidOperationException
#>
```

And the reason for that is simple – I had the file open. Therefore I am going to close it and repeat the above script:

```powershell
# load the spreadsheet
$filename = 'tmpF12D.xlsx'
$excel = Open-ExcelPackage -Path $filename
# close the open file
([Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application').workbooks | Where-Object {$_.FullNameURLEncoded -eq $excel.File }).Close($false)
# similar effect would be using the KillExcel switch
# close WHOLE Excel app (not just the specific file) and load to variable
$excel = Open-ExcelPackage -Path $filename -KillExcel
# add an extra sheet to the end
Add-Worksheet -ExcelPackage $excel -WorksheetName Mikey -MoveToEnd
# and save it back to the file and show the file
Close-ExcelPackage -ExcelPackage $excel -Show
```

![New sheet 'Mikey' has been added to our file.](/assets/images/importexcel-intro-1-03-how2sheet.png)

As shown above, adding an empty sheet was amazingly easy (and I have learned a new thing about closing files). How about populating it with the data?

```powershell
# load the spreadsheet
$filename = 'tmpF12D.xlsx'
$excel = Open-ExcelPackage -Path $filename
([Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application').workbooks | Where-Object {$_.FullNameURLEncoded -eq $excel.File }).Close($false)
# add new worksheet at the beginning
Add-Worksheet -ExcelPackage $excel -WorksheetName Process -MoveToStart
# get the data into a new sheet as a named table
# freeze the first row and column with an auto-sized length
Get-Process | Export-Excel -ExcelPackage $excel -WorksheetName Process -TableName Process -Show -AutoSize -FreezeTopRow -FreezeFirstColumn 
```

![New sheet 'Process' has been added to our file.](/assets/images/importexcel-intro-1-04-how2sheetpopulated.png)

Perfect, we have some data. Pivot? Why not.

### ImportExcel – how to make pivot tables?

For example, using Add-PivotTable is straightforward (and from now on I am closing the whole Excel). Also, note the **Activate** switch at the end. When you open the Excel file the worksheet that was used in the command will show up first.

```powershell
# load the spreadsheet
$filename = 'tmpF12D.xlsx'
$excel = Open-ExcelPackage -Path $filename -KillExcel
# add a simple pivot table
Add-PivotTable -ExcelPackage $excel -PivotRows Name -PivotColumns PriorityClass -PivotData @{'CPU' = 'sum'} -SourceWorkSheet process -PivotTableName 'Pivot' -Activate
# save it to the file and display
Close-ExcelPackage -ExcelPackage $excel -Show
```

Additionally, if something went wrong with our data and we need to recreate the pivot table. No problem. Drop the worksheet and create a new pivot table.

```powershell
# load the spreadsheet
$filename = 'tmpF12D.xlsx'
$excel = Open-ExcelPackage -Path $filename -KillExcel
# drop the pivot table worksheet (using the filename, not the package)
Remove-Worksheet -FullName $filename -WorksheetName Pivot 
# add some more stuff to the pivot table
Add-PivotTable -ExcelPackage $excel -PivotRows Name -PivotColumns PriorityClass -PivotData @{'CPU' = 'sum'; 'Company' = 'count'} -SourceWorkSheet process -PivotTableName 'Pivot' -Activate -NoTotalsInPivot -PivotTableStyle Dark1
# save it to the file and display
Close-ExcelPackage -ExcelPackage $excel -Show
```

As a result of both operations we get two tables;

![Simple pivot table added to the spreadsheet](/assets/images/importexcel-intro-1-05-how2pivot1.png)

![Pivot table after some modifications](/assets/images/importexcel-intro-1-05-how2pivot2.png)

### ImportExcel – how to make pivot table charts?

It is common to have a pivot table chart alongside the data. In fact, ImportExcel module supports that too.

```powershell
# load the spreadsheet
$filename = 'tmpF12D.xlsx'
$excel = Open-ExcelPackage -Path $filename -KillExcel
# setup definition for the first pivot table; note the IncludePivotChart
$PTDef =  New-PivotTableDefinition -PivotTableName "P1" -SourceWorkSheet "Process" -PivotRows "Company" -PivotData @{'Cpu' = 'average'} -IncludePivotChart -ChartType BarClustered3D
# join the definition for the second pivot table
$PTDef += New-PivotTableDefinition -PivotTableName "P2" -SourceWorkSheet "Process" -PivotRows "Company" -PivotData @{'Cpu' = 'average'} -IncludePivotChart -ChartType Pie3D
# Export with the PivotTableDefinition
Export-Excel -ExcelPackage $excel -PivotTableDefinition $PTDef -Show -Activate
```

![Pivot table chart #1](/assets/images/importexcel-intro-1-06-how2pivotchart1.png)![Pivot table chart #2](/assets/images/importexcel-intro-1-06-how2pivotchart2.png)

That does not limit the user to create pivot table charts on a new worksheet. It is quite simple to add more charts on the worksheet. Just to avoid overlapping of the charts and tables set the **Address** (for placing table [A]) and **ChartRow** / **ChartColumn** (to set location for a chart [B]).

```powershell
# load the spreadsheet
$filename = 'tmpF12D.xlsx'
$excel = Open-ExcelPackage -Path $filename -KillExcel
# define parameters for another pivot table and chart
$PTParams = @{
    PivotTableName    = "P3"
    Address           = $excel.P2.cells["A22"] # top-left corner of the table
    SourceWorkSheet   = $excel.Process
    PivotRows         = @("Company")
    PivotData         = @{'Cpu' = 'average'}
    PivotTableStyle   = 'Light21'
    IncludePivotChart = $true
    ChartType         = "BarClustered3D"
    ChartRow          = 22 # place the chart below row 22nd
    Activate          = $true
}
# add the objects
Add-PivotTable @PTParams -PassThru
# save it to the file and display
Close-ExcelPackage $excel -Show
```

![Pivot table chart #3 added to the existing worksheet](/assets/images/importexcel-intro-1-06-how2pivotchart3.png)

Amazing! In fact, it would be a day-long session to show all the scenarios just for pivot tables and charts.

## Summary

To sum up, ImportExcel PowerShell module has many features and it is a powerful task. I showed you today how to do basic operations on worksheets and pivot tables/charts. Next week will describe more about regular charts and conditional formatting.

Thank you,

Mikey
