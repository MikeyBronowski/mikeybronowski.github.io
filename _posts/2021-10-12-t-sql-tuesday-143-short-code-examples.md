---
ref: tsql2sday143
title: T-SQL Tuesday 143 - Short code examples
excerpt: "This month the #TSQL2SDAY invitation comes from John McCormack who asks us to write about our handy short scripts."
tags: [english, community, events, sqlfamily, tsql2sday]
categories: [english, community, events, tsql2sday]
lang: en
locale: en-GB
permalink: /:title/
---

[![T-SQL Tuesday Logo](/assets/images/t-sql-tuesday-logo.jpg)](https://johnmccormack.it/2021/10/t-sql-tuesday-143-short-code-examples/ "T-SQL Tuesday invitation")

This month the #TSQL2SDAY invitation comes from John McCormack ([blog](https://johnmccormack.it)\|[twitter](https://twitter.com/actualjohn)). The T-SQL Tuesday is a monthly blogging event that was created by Adam Machanic ([blog](http://dataeducation.com/)\|[twitter](https://twitter.com/AdamMachanic)) and is maintained by Steve Jones ([blog](https://voiceofthedba.wordpress.com/)\|[twitter](https://twitter.com/way0utwest)).

John invites us to write about our handy short scripts. The invitation is in [this](https://johnmccormack.it/2021/10/t-sql-tuesday-143-short-code-examples/) post.

## Loop through

I found this method really helpful in some situations where I had to run multiple commands that were dynamically generated. In the below example it is all static, but you should get the idea.

```tsql
-- create a table with commands
DROP TABLE IF EXISTS [@@@]; CREATE TABLE [@@@] ([@] int, [@@] nvarchar(400));

-- populate it with commands
INSERT INTO [@@@] VALUES 
(0, 'DROP TABLE IF EXISTS dt;'),
(1, 'CREATE TABLE dt (dt datetime);'),
(2, 'INSERT INTO dt VALUES (GETDATE());'),
(3, 'SELECT dt from dt;')

-- create a loop that will execute the commands
DECLARE @ int = 0;
DECLARE @@ int = 0;
DECLARE @@@@ nvarchar(400) = '';
SELECT @@ = MAX([@]) FROM [@@@];
WHILE @ <= @@
BEGIN
	SELECT @@@@ = [@@] FROM [@@@] WHERE [@] = @;
	EXEC sp_executesql @@@@;
	SET @=@+1;
END
```

## Agent datetime

There was a time I needed to work with the agent jobs a lot, so there was one handy function called agent_datetime() - long story short it allows you to convert the weird datetime format in the msdb to something useful. If you want to learn more check out [this](https://www.mssqltips.com/sqlservertip/2850/querying-sql-server-agent-job-history-data/) article.

## Tables

Prior the dbatools I used [this query](https://stackoverflow.com/questions/7892334/get-size-of-all-tables-in-database) a lot to understand what tables are in the database. I have added database and server details as well in case I was running that on multiple servers.

```tsql
	GETDATE() AS CurrentTime,
	@@SERVERNAME AS SQLName,
	DB_NAME() AS DBName,
```

Thanks,

Mikey
