---
ref: tsql2sday159magda1
title: T-SQL Tuesday 159 - What’s Your Favorite New Feature? - Magda
excerpt: "This month the #TSQL2SDAY invitation comes from Deepthi Goguri who asks us to write about our favorite new feature in SQL Server 2022 or in Azure and New Year's Resolutions."
tags: [english, community, events, sqlfamily, tsql2sday, sqlserver2022]
categories: [english, community, events, tsql2sday]
lang: en
locale: en-GB
permalink: /:title/
author: "Magda"
---

[![T-SQL Tuesday Logo](/assets/images/t-sql-tuesday-logo.jpg)](https://dbanuggets.com/2023/02/05/t-sql-tuesday-159-invitation-whats-your-new-favorite-feature/ "T-SQL Tuesday invitation")

This month the #TSQL2SDAY invitation comes from Deepthi Goguri ([blog](http://tsqltuesday.com/2023/02/07/t-sql-tuesday-159-whats-your-favorite-new-feature/)\|[twitter](https://twitter.com/dbanuggets)) who asks us to write about our favorite new feature in SQL Server 2022 or in Azure and New Year's Resolutions. The T-SQL Tuesday is a monthly blogging event that was created by Adam Machanic ([blog](http://dataeducation.com/)) and is maintained by Steve Jones ([blog](https://voiceofthedba.wordpress.com/)\|[twitter](https://twitter.com/way0utwest)).

If you want to find out about my New Year's Resolutions [read this post]({% post_url 2023-02-13-t-sql-tuesday-159-new-years-resolutions-magda %}).

There are many new features in SQL Server 2022, I've done my research, and I found quite several updates and new features that really interest me, and there were mostly features about the [Language](https://learn.microsoft.com/en-us/sql/sql-server/what-s-new-in-sql-server-2022?view=sql-server-ver16#language), the new/updated T-SQL functions such as:

## DATETRUNC()

From MS Learn:
> DATETRUNC() function returns an input date truncated to a specified datepart.

On the surface the work similarly to `DATEPART()`, however that function returns integer values, opposed to the dates returned by `DATETRUNC()` (we will see that better in the example below). 

Let's consider a query:
```sql
declare @d datetime2 = '2023-02-14 23:02:14.2302149';
select '10 - Year' part, DATETRUNC(year, @d) dateTRUNC , DATEPART(year, @d) datePART
union
select '11 - Quarter', DATETRUNC(quarter, @d), DATEPART(quarter, @d)
union
select '12 - Month', DATETRUNC(month, @d), DATEPART(month, @d)
union
select '13 - Week', DATETRUNC(week, @d), DATEPART(week, @d) -- For a U.S. English environment, @@DATEFIRST defaults to 7 (Sunday).
union
select '14 - Iso_week', DATETRUNC(iso_week, @d), DATEPART(iso_week, @d)
union
select '15 - DayOfYear', DATETRUNC(dayofyear, @d), DATEPART(dayofyear, @d) 
union
select '16 - Day', DATETRUNC(day, @d),  DATEPART(day, @d)
union
select '17 - Hour', DATETRUNC(hour, @d), DATEPART(hour, @d)
union
select '18 - Minute', DATETRUNC(minute, @d), DATEPART(minute, @d)
union
select '19 - Second', DATETRUNC(second, @d), DATEPART(second, @d)
union
select '20 - Millisecond', DATETRUNC(millisecond, @d), DATEPART(millisecond, @d)
union
select '21 - Microsecond', DATETRUNC(microsecond, @d), DATEPART(microsecond, @d);
```

And the results are as below:
```
part	            dateTRUNC	                    datePART
----                ---------                       --------
10 - Year		2023-01-01 00:00:00.0000000	    2023
11 - Quarter		2023-01-01 00:00:00.0000000	    1
12 - Month		2023-02-01 00:00:00.0000000	    2
13 - Week		2023-02-12 00:00:00.0000000	    7
14 - Iso_week		2023-02-13 00:00:00.0000000	    7
15 - DayOfYear		2023-02-14 00:00:00.0000000	    45
16 - Day		2023-02-14 00:00:00.0000000	    14
17 - Hour		2023-02-14 23:00:00.0000000	    23
18 - Minute		2023-02-14 23:02:00.0000000	    2
19 - Second		2023-02-14 23:02:14.0000000	    14
20 - Millisecond	2023-02-14 23:02:14.2300000	    230
21 - Microsecond	2023-02-14 23:02:14.2302140	    230214
```

So clearly we see the difference between the values returned by the two functions. 

One thing to note is that for `Iso_week` the first day of the week in the ISO8601 calendar system is Monday, while `Week` uses by default Sunday For a U.S. English environment.



## LEAST() & GREATEST()

From MS Learn:
> The `LEAST()` & `GREATEST()` functions return the minimum / maximum value from a list of one or more expressions.

If the data type is various then in the return I will receive the data type of the highest value before comparison. It is similar to `MAX()` and `MIN()` functions, however `LEAST()` & `GREATEST()` accept more arguments  (up to 254) and they work differently on columns. 

Let's consider this example with multiple arguments:

```sql
create table tsql2sday (s1 int, s2 int, s3 int);
insert into tsql2sday values (2,1,3),(5,4,3),(4,2,3),(40.1,110.12,398.1);
select *, least(s1,s2,s3) least, greatest(s1,s2,s3) greatest from tsql2sday;
```

And the results how that `LEAST()` & `GREATEST()` work horizontally
```
s1	s2	s3	least	greatest
--	--	--	-----	--------
2	1	3	1	3
5	4	3	3	5
4	2	3	2	4
40	110	398	40	398
```



## STRING_SPLIT()

From MS Learn:
> A table-valued function that splits a string into rows of substrings, based on a specified separator character.

The STRING_SPLIT() is not new, but has been updated in SQL Server 2022 with `enable_ordinal` argument and `ordinal` output column. Again from the MS Learn:

> `enable_ordinal` serves as a flag to enable or disable the `ordinal` output column. A value of 1 enables the `ordinal` column. If `enable_ordinal` is omitted, `NULL`, or has a value of 0, the `ordinal` column is disabled.

Let's have a look at this query:
```sql
SELECT * FROM STRING_SPLIT('This month the #TSQL2SDAY invitation comes from Deepthi Goguri',' ');
```
and the results would be in a single column,
```
value
-----
This
month
the
#TSQL2SDAY
invitation
comes
from
Deepthi
Goguri
```

but starting from SQL Server 2022 we can add this extra argument to enable the `ordinal` column in the output:
```sql
select * from STRING_SPLIT('This month the #TSQL2SDAY invitation comes from Deepthi Goguri',' ', 1);
```

and now we got more information:
```
value	    ordinal
-----       -------
This	    1
month	    2
the	        3
#TSQL2SDAY	4
invitation	5
comes	    6
from	    7   
Deepthi	    8
Goguri	    9
```

Thanks,
Magda