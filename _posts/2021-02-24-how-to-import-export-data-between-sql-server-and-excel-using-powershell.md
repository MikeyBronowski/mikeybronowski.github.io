---
ref: importexcel_sql
title: How to import/export data between SQL Server and Excel using PowerShell?
excerpt: 
tags: [english, community, tools, importexcel, powershell, excel, wip]
categories: [english, community, tools, importexcel]
lang: en
locale: en-GB
permalink: /blog/:year/:month/:title/
---

This is part of the How to Excel with PowerShell series. Links to all the tips can be found in this post.
If you would like to learn more about the module with an interactive notebook, check this post out.

ImportExcel is a powerful tool to manage MS Excel, however, the user is not limited to data stored in worksheets. We can import from and export to SQL Excel data using a combination of ImportExcel and dbatools modules.

You can read how to start with dbatools in this blog series.

Preparation
Let’s prepare our environment now to make sure the file does not exist. The assumption here is we have a SQL server up and running with a database and table to query.

# set location for the files - I am using the temporary folder in my user profile
Set-Location $env:TEMP

# that is the location of our files
Invoke-Item $env:TEMP

# cleanup any previous files - this helps in case the example has been already ran
$excelFiles = "ImportExcelHowTo010.xlsx"
Remove-Item $excelFiles -ErrorAction SilentlyContinue
Exporting SQL data to Excel with PowerShell
Once the dbatools are installed we can query the database and export it to the workbook.

# get data from SQL Server (dbatools)
$SQLresults = Invoke-DbaQuery -SqlInstance $sqlInstance -Database ImportExcel -Query 'SELECT * FROM ImportExcelTable;'

# export SQL data into Excel worksheet (importExcel)
$SQLresults | Export-Excel -Path $excelFiles -WorksheetName HowToSQL -AutoSize -Show
Then, our worksheet will look like that:


SQL > dbatools > importExcel > Excel
That looks almost perfect, however, we’ve got extra columns in there. One way to remove them is to rewrite the command for the export. First, exclude the extra columns using ExcludeProperty on the PowerShell, second, re-export it using –ClearSheet.

# exclude the extra columns
$SQLresults = $SQLresults | Select * -ExcludeProperty RowError, RowState, Table, ItemArray, HasErrors

# reload data into Excel (dbatools)
$SQLresults | Export-Excel -Path $excelFiles -WorksheetName HowToSQL -ClearSheet -AutoSize -Show
For instance that looks better:


SQL output without extra columns from PowerShell
Importing Excel data to SQL with PowerShell
In another case we will be moving data the other way around – let’s move the data from the Excel spreadsheet back to SQL Server.

Firstly, get the data from Excel spreadsheet.

# read data from Excel (importExcel)
$SQLimport = Import-Excel -Path $excelFiles -WorksheetName HowToSQL

# write data to the SQL Server (dbatools)
$SQLimport | Write-DbaDbTableData -SqlInstance $sqlInstance -Database ImportExcel -Table ImportExcelSheet -AutoCreateTable

# read the date from SQL this time (dbatools)
Invoke-DbaQuery -SqlInstance $s1 -Database ImportExcel -Query 'SELECT * FROM ImportExcelSheet;'
<#
int datetime            varchar          
--- --------            -------          
  1 02/02/2020 02:02:02 ImportExcel-HowTo
  2 02/02/2020 02:02:02 ImportExcel-HowTo
  3 02/02/2020 02:02:02 ImportExcel-HowTo
  4 02/02/2020 02:02:02 ImportExcel-HowTo
  5 02/02/2020 02:02:02 ImportExcel-HowTo
  6 02/02/2020 02:02:02 ImportExcel-HowTo
  8 02/02/2020 02:02:02 ImportExcel-HowTo
#>
Summary
To sum up this short post – combining two community modules with SQL Server and Excel we can shuffle the data using scripts very easily.

Thank you,
Mikey
