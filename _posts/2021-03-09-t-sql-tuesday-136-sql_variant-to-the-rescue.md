---
ref: tsql2sday136
title: T-SQL Tuesday 136 - sql_variant to the rescue
excerpt: "This month the #TSQL2SDAY invitation comes from Brent Ozar who wants us to write about our favourite (or least favourite)  types."
tags: [english, community, events, sqlfamily, tsql2sday]
categories: [english, community, events, tsql2sday]
lang: en
locale: en-GB
permalink: /blog/:year/:month/:title
---

[![T-SQL Tuesday Logo](/assets/images/t-sql-tuesday-logo.jpg)](https://www.brentozar.com/archive/2021/03/tsql2sday-136-invitation-blog-about-your-favorite-data-type-or-least-favorite/ "T-SQL Tuesday invitation")

This month the #TSQL2SDAY invitation comes from Brent Ozar ([blog](http://www.brentozar.com/archive/author/brento/)\|[twitter](https://twitter.com/BrentO)). Brent wants us to write about our favourite (or least favourite) data types. The invitation is in this [post](https://www.brentozar.com/archive/2021/03/tsql2sday-136-invitation-blog-about-your-favorite-data-type-or-least-favorite/).

## sql_variant

Of all data types available in SQL Server – [sql_variant](https://docs.microsoft.com/en-us/sql/t-sql/data-types/variant-transact-sql?view=sql-server-ver15) is one of the most interesting to me. The Microsoft documentation writes all about it, this is probably the most important thing:
> A data type that stores values of various SQL Server-supported data types.
sql_variant MS Docs

### Data type doo-doo-doo-doo

Let’s see how it works in the real world. Firstly, create some tables to play with. Each table has two columns:
**first** – stores the first letter of the datatype
**second** – values inserted

```sql
create table int (type char, int int);
create table varchar (type char, varchar varchar);
create table sql_variant (type char, sql_variant sql_variant);
```

Secondly, we are going to populate each table with the same insert.

```sql
insert into int values ('i',1);
insert into int values ('i',2.3);
insert into int values ('i','');
insert into int values ('i',0x01);
insert into int values ('i',null);
insert into varchar values ('v',1);
insert into varchar values ('v',2.3);
insert into varchar values ('v','');
insert into varchar values ('v',0x01);
insert into varchar values ('v',null);
insert into sql_variant values ('s',1);
insert into sql_variant values ('s',2.3);
insert into sql_variant values ('s','');
insert into sql_variant values ('s',0x01);
insert into sql_variant values ('s',null);
```

When you run it you may noticed that the this line fails

```sql
insert into varchar values ('v',2.3);
```

with the error:

```
Msg 8115, Level 16, State 5, Line 101
Arithmetic overflow error converting numeric to data type varchar.
The statement has been terminated.
```

Hey, 2 out of 3 worked fine! Let’s see what we have there. In this part, we are going to use the [SQL_VARIANT_PROPERTY](https://docs.microsoft.com/en-us/sql/t-sql/functions/sql-variant-property-transact-sql?view=sql-server-ver15) function to find out what data types hiding there.

```sql
select int, SQL_VARIANT_PROPERTY(int, 'BaseType') AS 'BaseType', SQL_VARIANT_PROPERTY(int, 'MaxLength') AS 'MaxLength' from int;
select varchar, SQL_VARIANT_PROPERTY(varchar, 'BaseType') AS 'BaseType', SQL_VARIANT_PROPERTY(varchar, 'MaxLength') AS 'MaxLength'  varchar;
select sql_variant, SQL_VARIANT_PROPERTY(sql_variant, 'BaseType') AS 'BaseType', SQL_VARIANT_PROPERTY(sql_variant, 'MaxLength') AS Length' from sql_variant;
```

As we can expect the first two are returning **int** and **varchar**, but the third one is very much different:

![](/assets/images/tsql2sday136_01.png)
We can also see that the **int** and **varchar** table did not store the values we’ve provided as they either tried to convert them to respective data type or failed to insert, while sql_variant stores them all nicely.

### Not my type – sorry

The above is a result of three separate SELECT statements, but in SQL we could use UNION ALL. Firstly, let’s have a look at how the different types behave:

```sql
select int, SQL_VARIANT_PROPERTY(int, 'BaseType') AS 'BaseType', SQL_VARIANT_PROPERTY(int, 'MaxLength') AS 'MaxLength' from int
union all
select varchar, SQL_VARIANT_PROPERTY(varchar, 'BaseType') AS 'BaseType', SQL_VARIANT_PROPERTY(varchar, 'MaxLength') AS 'MaxLength'  varchar;
```

Indeed, we get some results and an error, i.e. the **int** did not like some of the entries from the **varchar** table. Check yourself  happens when we put the select statements in reverse order.

```
Conversion failed when converting the varchar value '' to data type int.
```

![](/assets/images/tsql2sday136_02.png)

We know that there might be some issues with the union of two tables holding different data types, but what happens when we add a d table – sql_variant to the party and make it treble.

```sql
select int, SQL_VARIANT_PROPERTY(int, 'BaseType') AS 'BaseType', SQL_VARIANT_PROPERTY(int, 'MaxLength') AS 'MaxLength' from int
union all
select varchar, SQL_VARIANT_PROPERTY(varchar, 'BaseType') AS 'BaseType', SQL_VARIANT_PROPERTY(varchar, 'MaxLength') AS 'MaxLength'  varchar
union all
select sql_variant, SQL_VARIANT_PROPERTY(sql_variant, 'BaseType') AS 'BaseType', SQL_VARIANT_PROPERTY(sql_variant, 'MaxLength') AS Length' from sql_variant;
```

As a matter of fact, no errors, and all the rows are there.

![](/assets/images/tsql2sday136_03.png)

Oh, and it even works when we truncate the sql_variant table and keep it in the UNION.

![](/assets/images/tsql2sday136_04.png)

Enough playing, you can drop the tables now.
### Where in the world?

There are few places in the SQL Server when you can find the sql_variant column, here is a quick query to find these objects:

```sql
select OBJECT_NAME(object_ID)object,name from sys.all_columns where system_type_id in (
select system_type_id from sys.types where name = 'sql_variant')
order by object,name;
```

## Summary

Although it looks very tempting to use sql_variant more often it may not be the best idea – there is a number of examples where not to it: one from [Brent](https://www.brentozar.com/archive/2017/03/no-seriously-dont-use-sql_variant/) and [Phil](https://www.red-gate.hub/product-learning/sql-prompt/problems-caused-by-use-of-the-sql_variant-datatype).
Thanks,
Mikey
