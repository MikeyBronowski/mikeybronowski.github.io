---
ref: tsql2sday137
title: T-SQL Tuesday 137 - Using Jupyter Notebooks
excerpt: "This month the #TSQL2SDAY invitation comes from Steve Jones who asks us to write about Jupyter notebooks."
tags: [english, community, events, sqlfamily, tsql2sday, jupyter]
categories: [english, community, events, tsql2sday]
lang: en
locale: en-GB
permalink: /blog/:year/:month/:title
---

[![T-SQL Tuesday Logo](/assets/images/t-sql-tuesday-logo.jpg)](http://tsqltuesday.com/2021/04/06/t-sql-tuesday-137-using-notebooks-every-day/ "T-SQL Tuesday invitation")

This month the #TSQL2SDAY invitation comes from Steve Jones ([blog](https://voiceofthedba.wordpress.com/)\|[twitter](https://twitter.com/way0utwest)). Steve is a maintainer of the T-SQL Tuesday – monthly blogging event that was created by Adam Machanic ([blog](http://dataeducation.com/)\|[twitter](https://twitter.com/AdamMachanic)). Steve invites us to write about Jupyter notebooks. The invitation is in this [post](http://tsqltuesday.com/2021/04/06/t-sql-tuesday-137-using-notebooks-every-day/).

## Jupyter Notebooks
[Project Jupyter](https://jupyter.org/) is something that data scientists are familiar with. Its name is derived from the hot languages: **Ju**lia, **Pyt**hon, **R**. It is a project that was born on the core of IPython. The notebooks were called IPython Notebooks in the past. It is an interactive web-based environment that could be run on your own laptop or you could use one of the [online services](https://jupyter.org/try). Additionally, for over two years the Jupyter Notebooks are supported by Azure Data Studio.

The notebook itself is a JSON document, often associated with the *.ipynb extension. The document contains the list of actions (inputs/outputs) that could be either raw text, or Markdown, or code (there is a number of supported languages like R, Python, C++, Powershell or SQL.

## Jupyter Notebooks usage scenarios
I want to share with you a few scenarios that I had the best experience with. Maybe you will find something useful or inspiring.

### Learning new things
There was a time I was exploring Python and wanted something easy to install to run scripts. After some research, I have found an online service for notebooks. It was great, as I could simply start the service, pick a kernel (scripting language I wanted to use) and start writing my scripts. It was saved there and I could connect from any place or computer I wanted.

In the beginnings I used it to learn the basics of Python and R. There were notebooks in form of a book for data science, so it was easy to follow and test your scripts. Currently, I have found even more examples on GitHub – [A gallery of interesting Jupyter Notebooks](https://github.com/jupyter/jupyter/wiki/A-gallery-of-interesting-Jupyter-Notebooks). It was a massive help and removed all the need to build your own environment.

### Improving processes
My background is database administration, and it is not rare for me to work crazy hours (on-call duty) or repeated maintenance tasks (patching). Usually, the process was written in a form of scripts and some documentation (either inside the scripts or as a separate document). When the notebooks appeared in the ADS for the first time it was very tempting to start using them as a base for the tasks.

Imagine being called out at 3 AM for the issue and all you have is an interactive notebook with steps that help you to troubleshoot. No need to think about the next steps, just follow the instruction, run the code and save the outputs. Very often that was the case, run some scripts, find the issue, fix it, save the notebook outputs, go back to bed. The next morning the whole team could see what happened and what was the actual output, not what half-sleepy Mikey thought was.

Monthly patching that was tailored for the specific app? No need to remember anything anymore, just sit there and do click-click 🙂 Sure, automation would be the best, but sometimes you just need to start somewhere. Also, what happens when half of the staff is out of the office and the job needs to be done by someone new in the team or less experienced who did not see the process yet? Give them the notebook, ask them to follow the steps and voila – job done. Also, make sure that if they don’t understand something or feel like it is missing information they feed that back and update the document for future generations.

### Presentation
A while ago I had the pleasure to be a part of the [Festive Tech Calendar](https://festivetechcalendar.com/) and have written a post about [ImportExcel with the interactive notebook supplement](https://www.bronowski.it/blog/2020/12/the-ms-excel-an-unexpected-journey-with-powershell/) (I kind of feel ashamed for posting the code as pictures in that blog post, but the notebook has really juicy code so that feeling goes away – sometimes).

I could use that notebook to present the topic and then share it with the audience, so they could have exactly the same experience. Of course, it won’t be possible for every presentation and demo, but in many cases, it will be of great value to the whole experience.

## Summary
Although this was not a really technical post I hope it will inspire you in some way and you will do great things with the interactive Jupyter notebooks or even [Jupyter Books](https://jupyterbook.org/intro.html).

Thank you Steve for the great topic and I cannot wait to read more about the notebooks for the other participants.

Thanks,

Mikey
