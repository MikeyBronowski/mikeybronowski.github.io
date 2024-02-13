---
ref: tsql2sday171
title: T-SQL Tuesday 171 - Describe the Most Recent Issue You Closed
excerpt: "This month the #TSQL2SDAY invitation comes from Brent Ozar who asked us to write about the last ticket we closed."
tags: [english, community, events, sqlfamily, tsql2sday]
categories: [english, community, events, tsql2sday]
lang: en
locale: en-GB
permalink: /:title/
---

[![T-SQL Tuesday Logo](/assets/images/t-sql-tuesday-logo.jpg)](https://www.brentozar.com/archive/2024/02/tsql2sday-invitation-describe-the-most-recent-issue-you-closed/ "T-SQL Tuesday invitation")

This month the #TSQL2SDAY invitation comes from Brent Ozar ([twitter](https://twitter.com/BrentOzarULTD)). The T-SQL Tuesday is a monthly blogging event that was created by Adam Machanic ([blog](http://dataeducation.com/)\|[twitter](https://twitter.com/AdamMachanic)) and is maintained by Steve Jones ([blog](https://voiceofthedba.wordpress.com/)\|[twitter](https://twitter.com/way0utwest)).
Brent asked us to write about the last ticket we closed. The invitation is in [this](https://www.brentozar.com/archive/2024/02/tsql2sday-invitation-describe-the-most-recent-issue-you-closed/) post.


## How I Met Your CHECKDB

Regular execution of DBCC CHECKDB is a cornerstone practice for DBAs, ensuring that databases are free from corruption. However, this routine maintenance can sometimes feel more like a Herculean task, especially when DBCC CHECKDB runs slower than a snail in molasses, or worse, gets terminated because it runs too slow.


### Love at the First Sight

It happened multiple times, so this is just an example that I had to tackle recently. DBCC CHECKDB was taking its sweet time, dragging on for hours. The solution: kill it at a certain point or stop running at all. Not ideal. 


### What Now?

The DBCC was running in a single SQL Agent job (using [maintenance solution](https://ola.hallengren.com/sql-server-integrity-check.html)). So the first idea was to...


#### Divide and Conquer

Create a dedicated SQL Agent job for each of the top three biggest databases, and one for the remaining set (including system databases). Great! At least we're going somewhere. Some improvement, but not much, there was more to do.


### The Art of DBCC Operations

Even with this segregation, the DBCC of the three largest databases was still slow. The solution? Dissect DBCC CHECKDB into its subcommands: CHECKALLOC, CHECKTABLE, and CHECKCATALOG. Worked pretty nicely. Thanks to the metrics gathered in the CommandLog table the surprise was identified. CHECKTABLE of the third database took a fraction of the time to process compared to the full CHECKDB. What the (c)heck?


### The Service Broker Conundrum

While the full CHECKDB was running we could see lots of time being spent on DBCC SSB CHECK, meaning SQL Service Broker objects are checked. This does not happen when [CHECKTABLE is being executed](https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-transact-sql). Mystery solved, upon confirming that the service broker is some sort of legacy in that system, the database was excluded from the full CHECKDB for good.


### It's raining Snapshots

After investigating the second top database it was clear that a large number of snapshots between CHECKTABLE operations added up to hours quickly. Over 400 tables. The solution here - TABLOCK which would obtain a shared lock instead of an internal database snapshot. As it occurred only 15 tables were big enough to be affected, so over 375 tables below 1 GB could use [TABLOCK](https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-checktable-transact-sql?view=sql-server-ver16#tablock), the others were running with snapshots. That decreased processing time dramatically. 

It created another job, for that database, one with bigger tables and one with smaller tables picked up dynamically based on the size at the execution time, so they were allocated to a dedicated bucket.


### It's not a good time

After all that work and many SQL Agent jobs, a closer look at activity it was worth trying to move it a bit to avoid rush hours. That proved to be a good idea in this environment, as pushing it by one hour later further reduced DBCC time (by ~30%).


## Conclusion

It was a great excercise and the environment got more granural SQL Agent jobs to successfully perform database integrity checks. One thing to remember, the dbi_dbccLastKnownGood value was not updated when the piecemeal DBCC was executed. Read more about that [here](https://www.sqlskills.com/blogs/erin/what-checks-update-dbcclastknowngood/).


Thanks,

Mikey