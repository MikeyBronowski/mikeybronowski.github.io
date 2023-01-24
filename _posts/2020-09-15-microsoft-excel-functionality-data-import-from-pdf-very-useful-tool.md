---
ref: dataimportfrompdf
title: Microsoft Excel functionality – Data import from PDF – very useful tool.
excerpt: "Many times happened to me when I received a PDF file with a table that I had to “type” into the program manually. This option allows you in an easy way to get the data from a PDF file to Excel or Power BI."
permalink: /blog/:year/:month/:title/
tags: [excel, import, pdf, power query]
categories: [english, excel, magda]
lang: en
locale: en-GB
author: "Magda"
---

![Import to Excel from PDF](/assets/images/magda_powerquery_01_example.png)

Many times happened to me when I received a PDF file with a table that I had to “type” into the program manually. Fortunately, the data didn’t have too many lines 10-20 at most, so it wasn’t time-consuming, but it was frustrating and it could cost a mistake. I wish I knew that before.
This option allows you in an easy way to get the data from a PDF file to Excel or Power BI.

# EXCEL – PDF FILE – IMPORT

![Example of data in PDF file](/assets/images/magda_powerquery_01_example.png)

This example I found somewhere on the internet.
It is necessary to have an Excel Power Query add-in.

In Excel spreadsheet choose from ribbon DATA > GET DATA > FROM FILE > FROM PDF

![Data Tab > Get Data >From File >From PDF](/assets/images/magda_powerquery_02_from_pdf.jpg)

In the next step, we choose PDF file to import > IMPORT

![Choose your PDF file to Import](/assets/images/magda_powerquery_03_pdf.jpg)

Next step is NAVIGATOR. In NAVIGATOR we have TABLE AND PAGE and choosing one we will see on the right side how our data look like.

![Import data > Load or Trasform Data](/assets/images/magda_powerquery_04_navigator.jpg)

If we have nothing to correct, click LOAD. And that is it. Now we have proper data in the Excel spreadsheet.

![Imported data from PDF File to EXCEL](/assets/images/magda_powerquery_05_imported.jpg)

If we want to change something in the data, e.g. to separate the columns, click TRANSFORM DATA.

## The visual form of imported data

If our PDF file is in a “nice” form of a table with columns and headers clearly marked, then most likely there will be no need for the transformation of the data.  If our file is without clearly marked /separated columns or in the form of a text where the data between invisible columns are separated only by spaces, the data should be properly prepared while importing through TRANSFORM DATA. 
Few examples:

![Left – PDF file with no line between column. Right – Data in Navigator](/assets/images/magda_powerquery_06_example1.jpg)

![Left – PDF file with no line between column. Right Data in Navigator](/assets/images/magda_powerquery_07_example2.jpg)

Unfortunately, I have not found a solution to prepare a PDF file made/printed from a photo or a print screen, or a scanned document in this way.

I think it is a very useful tool, It saves me from retyping line of a text to Excel. It is shame I didn’t know it before.

Thank you, Magda.
