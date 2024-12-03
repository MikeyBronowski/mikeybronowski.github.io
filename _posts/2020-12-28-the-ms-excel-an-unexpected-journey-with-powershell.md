---
ref: FestiveTechCalendar2020
title: The MS Excel - An Unexpected Journey with PowerShell
excerpt: 
tags: [_CloudFamily, excel, FestiveTechCalendar, importexcel, msdevuk, powershell, wip]
categories: [english, community, events, importexcel]
lang: en
locale: en-GB
permalink: /blog/:year/:month/:title/
---


This blog post is part of the [Festive Tech Calendar](https://festivetechcalendar.com/).

If you want to practice the whole thing I have prepared an interactive notebook for you that could be opened with Azure Data Studio for example ([link to the notebook](https://github.com/MikeyBronowski/Presentations/tree/main/2020/FestiveTechCalendar)). For more things about the PowerShell module check [this post](https://www.bronowski.it/blog/2020/12/how-to-excel-with-powershell-importexcel/) out.

I would like to invite you to the world of magic!

Santa says Ho! Ho! Ho!
![Santa says Ho! Ho! Ho!](/assets/images/20201228-festivetechcalendar/festivetechcalendar2020-01.jpg)


Hillcastle upon Sheeton
![Hillcastle upon Sheeton](/assets/images/20201228-festivetechcalendar/festivetechcalendar2020-02.jpg)


Magic soup by Jamie Posh
![Magic soup by Jamie Posh](/assets/images/20201228-festivetechcalendar/festivetechcalendar2020-02.jpg)


Magic for dummies
![Magic for dummies](/assets/images/20201228-festivetechcalendar/festivetechcalendar2020-02.jpg)


# Step 1 – Install ImportExcel module from PowerShell Galery

## PowerShell Gallery

Go to [PowerShellGallery.com](http://powershellgallery.com/) and search for **Excel**


On the results page find **ImportExcel** and click on it.


On the module’s page go to the **Installation Options** and select one that works the best for you:

## Install Module

To install module go to the **Copy and Paste** section and click on the icon on the right:

If your environment is already set up it is enough to run below command, but if you encounter errors/warnings see below how to address these.

# Step 2 – Create Excel file with PowerShell?

Time to make your hands a little bit dirty with the magic dust. This recipe will create a very first workbook for you. You will learn about the main function **Export-Excel** and some of their parameters.


## Create Excel file with PowerShell

The simplest way to create an Excel file if to use **Export-Excel** and the **-Path** to the file. The **-Show** parameter at the end will open up the file in the Microsoft Excel with the default worksheet name.


## Create named worksheet with a named range

Default worksheet name might not always be ideal, so using **-WorksheetName** you can … well… name it. If you use **-Now** switch the dataset will become a named range within the file plus it will open the file in Microsoft Excel. Use **-Activate** to move to the worksheet if you have more than one.


# Step 3 – Manage Excel files with PowerShell?

You are learning so fast! I like it. What would you say if we play with our workbook a little bit? On this page, you will learn how to use **Add-Worksheet** and **Copy-ExcelWorksheet** as well as **Remove-Worksheet**. I will teach you to use **Open-ExcelPackage** and **Close-ExcelPackage** – very, very powerful spells. Finally, you will grab some data from the Big Net using **Get-HtmlTable** and **Import-Html**.

First, make sure we are good to go:

## Adding Excel worksheets with PowerShell

We will start with the new file (but without opening it this time) also loading it to the **$excelPackage** object. Using **Add-Worksheet** we will add a new worksheet containing the same data (for simplicity).

We can also control the position of the new worksheet. Using **-MoveToStart** we will place our worksheet in the first place.

## Copying Excel worksheets with PowerShell

Examples above were adding new sheets but copying the existing sheet, but what if we want to do it between workbooks? In the example below I am cheating a little bit as I am using the same workbook as a source and destination, but you get the idea. Meet **Copy-ExcelWorksheet**.

## Importing data from URL into Excel worksheets with PowerShell

The ImportExcel module offers importing data from the URL straight into your worksheets. It can be done in two ways – get the data first and then export to the Excel file (**Get-HtmlTable**) or…


…directly from the web to the file (**Import-Html**).


## Removing Excel worksheets with PowerShell

In order to remove worksheets use **Remove-Worksheet** with the **-Path** to the file and **-WorksheetName** to be removed. You can also display the file using **-Show** switch.



# Step 4 – Conditional formatting in Excel with PowerShell?

Life of the spreadsheet does not need to be all in grey-scale – there are colors and fireworks to make them less boring.


As usual we need to prepare some files. This time it will be a data pulled from the Big Net.



## Colors in conditional formatting with PowerShell

As a first step we are going to define the conditional formatting with **New-ConditionalText**. There is so many options, so I would suggest you explore them on your own. Once defined in the **Export-Excel** use **-ConditionalFormat**.



Conditional formatting with PowerShell

## Color scales in conditional formatting with PowerShell

Solid colors is not the only way to make the worksheet stand out. A useful way to present your data is to use color scales. It can be defined as above, but there is also **Add-ConditionalFormatting** with **-RuleType** that will help you achieve that too.



Color scales with PowerShell


## Data bars in conditional formatting with PowerShell
Staying in the same area, have a look at **-DataBarColor** parameter to create… well data bars , even within the same column that has color formatting defined already.



Data bars with PowerShell


## Icons in conditional formatting with PowerShell
Finally, something for someone who feels color is not enough. They want more, like to be iconic. Use one of the options for the IconsSet and they will be pleased.



Icon set with PowerShell

# Step 5 – Create Excel pivot tables with PowerShell?

Remember that time when you had to move table from one floor to another and you’ve got stuck at the staircase? Pivot is your solution!


We will work on some details from your machine here.


Simple pivot table with a single field
In order to add a pivot table to our sheet, we will use Add-PivotTable with Open/Close-ExcelPackage. That will result in a single field pivot table on its dedicated worksheet.



Excel pivot table with PowerShell
A pivot table with a multiple fields
It is not uncommon to have more fields in the pivot table, and it is also very possible with the PowerShell. The method is very similar, just add a list to the -PivotData.



Pivot table with multiple fields
Grouping
Did you know you can group date fields by months for example? In PowerShell add -GroupDateRow and -GroupDatePart and enjoy the new output.



Group by date unit with PowerShell
Filtering
So, we know that pivot table has Rows, Columns and Values, but there is a fourth spot – Filters. If you like hide some data from your pivot table use -PivotFilter.



Filtering pivot table with PowerShell
Multiple pivot tables in separate worksheets
When we need more than one pivot tables we can define (New-PivotTableDefinition) them ahead of time and create at the end (Export-Excel with -PivotTableDefinition) – this will create a pivot table on a separate worksheet (-PivotTableName).



Multiple pivot tables on separate worksheets
Multiple pivot tables in the same sheet
If you need more than one pivot to be placed on the same worksheet try this trick.



Multiple pivot tables in Excel with PowerShell

# Step 6 – Add Excel pivot table charts with PowerShell?

This one is a separate however there is only a tiny change comparing to the pivot table to get the pivot table chart. Let’s get us some data first.


Using Export-Excel with the known -PivotTableDefinition we can create this chart below. Can you spot the difference? That’s right, there are two parameters: IncludePivotChart and ChartType. Try experimenting with the values and build yourself a pretty chart.



Pivot table chart with PowerShell

# Step 7- Plot Excel charts with PowerShell?

OK, so we have been talking about charts. Pivot charts in particular. Time for the regular charts. Let’s see what the module have there for us.


Single chart
We are going to start with the usual piece and then generate some data using trigonometrical functions.



Source data for the charts
The next step is to define the chart (New-ExcelChartDefinition) and pass it to the Export-Excel via -ExcelChartDefinition.



Plotting Excel charts with PowerShell
Multiple charts on one sheet
Similarly to the pivot tables scenario, we would like sometimes have more charts on one screen/sheet. Define each chart in a separate object…


…and add it to the spreadsheet with combination of Export-Excel and New-ExcelChartDefinition like before.



Multiple charts in Excel with PowerShell

# Step 8 – Excel formulas with PowerShell?

One last bit I want to show you is how to add formulas to your spreadsheets, so you can achieve even more. Let get some data about electric vehiceles


Once we have data, use Set-ExcelRange to set the –Value or –Formula.



# Summary

This is the end of our journey my friend. I am really happy you came this far and I hope you can use what you have learned here to make your life easier.

Thank you very much for keeping me company through this great journey.

Thank you to the organiser of the Festive Tech Calendar initiative.

Mikey


