---
ref: ftc2024magda
title: "Festive Tech Calendar 2024: Exclusive Functions in Azure SQL Database and Managed Instance"
excerpt: "Discover the new features introduced this year in Azure SQL Database and Azure SQL Managed Instance. While these features are currently exclusive to the cloud, they may be available in SQL Server soon."
tags: [english, community, events, sqlfamily, _CloudFamily, FestiveTechCalendar, tsql, magda]
categories: [english, community, events, azure, magda]
lang: en
locale: en-GB
permalink: /:title/
author: "Magda"
toc: true
---


# About Festive Tech Calendar

The [Festive Tech Calendar 2024](https://festivetechcalendar.com/) is a community initiative by [CloudFamily](https://cloudfamily.info). This is my first contribution and I am quite excited to be part of it. A big thank you to Gregor ([blog](https://gregorsuttie.com)\|[X](https://x.com/gregor_suttie)) and Richard ([blog](https://pixelrobots.co.uk)\|[X](https://x.com/Pixel_Robots)) for organizing the wonderful event.


# Azure SQL Offering vs Classic SQL Server

Microsoft releases the classic SQL Server every couple of years, with some functionality added through regular updates. On the other hand, the SQL Server offering in Azure (Azure SQL Database and Managed Instance) receives the latest features earlier.

This post highlights some of the T-SQL functions currently available in Azure SQL but not yet in classic SQL Server. However, with the [recent announcement of SQL Server 2025](https://www.microsoft.com/en-us/sql-server/blog/2024/11/19/announcing-microsoft-sql-server-2025-apply-for-the-preview-for-the-enterprise-ai-ready-database/), this might change next year. Keep in mind that some of these functions are in preview, so their behavior might evolve as they reach general availability.


# `UNISTR()` and `||` (String concatenation)

Microsoft [announced a public preview of these earlier this year](https://techcommunity.microsoft.com/blog/azuresqlblog/announcing-unistr-and--operator-in-azure-sql-database-%E2%80%93-preview/4157714), which are available in Azure SQL Database and [SQL database in Microsoft Fabric](https://learn.microsoft.com/en-us/fabric/database/sql/feature-comparison-sql-database-fabric).

## `UNISTR()`

```sql
-- SYNTAX
UNISTR ( 'character_expression' [ , 'unicode_escape_character' ] )
```

The [`UNISTR` function](https://learn.microsoft.com/en-us/sql/t-sql/functions/unistr-transact-sql) simplifies working with Unicode code points, making it easy to represent multilingual strings, emojis, and other special characters in SQL queries. The `UNISTR` function works only with UTF8-compatible collations.

For example, we can fetch our favorite festive symbols by referencing Unicode code points in a compact and readable format using escape sequences:

```sql
SELECT 
    UNISTR('\+0026C4') AS Snowman, 
    UNISTR('\+002744') AS Snowflake, 
    UNISTR('\+01F384') AS ChristmasTree, 
    UNISTR('\+01F381') AS Present, 
    UNISTR('\+01F525') AS Fire,
    UNISTR('\+01F385') AS Santa;


-- Output: ⛄❄🎄🎁🔥🎅

```

### Comparing with `NCHAR`
To achieve the same result using `NCHAR()`, you need to account for surrogate pairs for characters above the [Basic Multilingual Plane (BMP)](https://www.unicode.org/roadmaps/bmp/), making it less compact. 

```
SELECT 
    NCHAR(0xD83C) + NCHAR(0xDF84) AS ChristmasTree, -- 🎄
    NCHAR(0xD83C) + NCHAR(0xDF81) AS Present,       -- 🎁
    NCHAR(0xD83D) + NCHAR(0xDD25) AS Fire,          -- 🔥
    NCHAR(0xD83C) + NCHAR(0xDF85) AS Santa;         -- 🎅
```

### Working with Escape Characters
The default escape character (`\`) simplifies paths and mixed sequences:

```sql
-- default escape character is '\'
SELECT UNISTR('C:\\Path\\To\\File\+0041') AS FilePath;
-- Output: C:\Path\To\FileA


-- custom escape character
SELECT UNISTR(N'#0041#0042#0043', '#') AS ABC;
-- Output: ABC
```

If you work with Unicode frequently, here’s a helpful list of [codepoints](https://codepoints.net/).


## `||` (String concatenation)
The [`|| operator`](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/string-concatenation-pipes-transact-sql) is used to concatenate strings in T-SQL. It behaves similarly to the `+` operator but aligns T-SQL with SQL dialects like PostgreSQL, Oracle, and MySQL, where `||` is the standard.

```sql
-- concatenation with mixed types (converts to string)
SELECT 1.0 || 'Calendar' || 2 || 3; 
-- Output: 1.0Calendar23

-- at least one operand must be a string
SELECT 1 || 1
-- Error: The data types int and int are incompatible in the concat operator.

-- incompatible types
select '1' || 0x1
-- Error: The data types varchar and varbinary are incompatible in the concat operator.

-- concatenate Christmas trees
select '🎄'|| '🎄'|| '🎄'|| '🎄'|| '🎄'|| '🎄'|| '🎄'||2024||'🎄'|| '🎄'|| '🎄'|| '🎄'|| '🎄'|| '🎄'|| '🎄';
-- Output: 🎄🎄🎄🎄🎄🎄🎄2024🎄🎄🎄🎄🎄🎄🎄
```

## `||=` (Compound assignment) 

The [`||= operator`](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/compound-assignment-pipes-transact-sql) combines concatenation with assignment, making it easy to append values to an existing variable or column. It behaves like the `+=` operator for character and binary strings.

Example: A Flat 1D Christmas Tree   
```sql
DECLARE @ChristmasTree NVARCHAR(16) = '';

SET @ChristmasTree ||= UNISTR('\+00272F');
SET @ChristmasTree ||= UNISTR('\+01F384');
SET @ChristmasTree ||= UNISTR('\+01F384');
SET @ChristmasTree ||= UNISTR('\+01F384');
SET @ChristmasTree ||= UNISTR('\+01F384');
SET @ChristmasTree ||= UNISTR('\+01F381');

SELECT @ChristmasTree AS [1DChristmasTree];

/* Output:
1DChristmasTree
✯🎄🎄🎄🎄🎁
*/
```

### Conclusion
The `UNISTR`, `||`, and `||=` operators are a nice  additions to T-SQL, streamlining Unicode handling and string concatenation in Azure SQL Database. They align T-SQL with other SQL dialects, making it easier to work with multilingual data, emojis, and dynamic string manipulation.



# JSON_OBJECTAGG() and JSON_ARRAYAGG()

The JSON type and aggregate functions were [announced last year](https://techcommunity.microsoft.com/blog/azuresqlblog/native-json-type--json-aggregates-are-now-in-private-preview-for-azure-sql-datab/3830753) and are currently in preview for Azure SQL Database and Azure SQL Managed Instance.

## JSON object vs array

Before we jump right in into the new functions, here’s a quick introduction to JSON.

[JSON (JavaScript Object Notation)](https://www.json.org/json-en.html) uses two fundamental structures: **arrays** and **objects**. While both are used to represent data in JSON, they serve different purposes and have distinct structures.

### JSON Array
A JSON array is an ordered collection of values (like a list). It can contain elements of any type: strings, numbers, objects, other arrays, or even `null`. Elements are indexed by their position, starting from 0.

### Example: JSON Array

```json
["Apple", "Banana", "Cherry"]
```

Use Case:
* Lists of related items (e.g., product names, user IDs).
* Data where order matters (e.g., a sequence of events).

### JSON Object
A JSON object is a collection of key-value pairs (like a dictionary or map). Keys must be strings, while values can be any valid JSON type. Keys are unique, and their order is not guaranteed.

### Example: JSON Object
```json
{
  "name": "Santa",
  "age": 65,
  "city": "North Pole"
}
```

Use Case:
* Represent structured data (e.g., a single entity like a person or a product).
* When accessing data by meaningful identifiers (e.g., "name", "age").


## Festive Tables for Examples

Let's create some sample festive tables and see both functions in action:

```sql
CREATE TABLE Workshop (
    WorkshopID INT PRIMARY KEY,
    WorkshopName NVARCHAR(50)
);

CREATE TABLE Elves (
    ElfID INT PRIMARY KEY,
    ElfName NVARCHAR(50),
    JoinDate DATE,
    WorkshopID INT FOREIGN KEY REFERENCES Workshop(WorkshopID)
);

INSERT INTO Workshop (WorkshopID, WorkshopName)
VALUES 
    (1, 'Toy Assembly'),
    (2, 'Gift Wrapping'),
    (3, 'Reindeer Care');


INSERT INTO Elves (ElfID, ElfName, JoinDate, WorkshopID)
VALUES 
    (1, 'Buddy', '2021-12-01', 1),
    (2, 'Jingle', '2020-11-15', 1),
    (3, 'Sparkle', '2022-01-10', 2),
    (4, 'Snowflake', '2023-03-05', 2),
    (5, 'Peppermint', '2020-12-20', 3);
```

## `JSON_ARRAYAGG()` function

```sql
-- SYNTAX
JSON_ARRAYAGG (value_expression [ order_by_clause ] [ json_null_clause ] ) 
```

The [`JSON_ARRAYAGG`](https://learn.microsoft.com/en-us/sql/t-sql/functions/json-arrayagg-transact-sql) constructs a JSON array from an aggregation of SQL data or columns.


### Example: JSON Array of Elf Names

```sql
SELECT JSON_ARRAYAGG(ElfName ORDER BY JoinDate ASC) AS ElfNames
FROM Elves;
-- Output: ["Jingle","Peppermint","Buddy","Sparkle","Snowflake"]


SELECT JSON_ARRAYAGG(WorkshopName ORDER BY WorkshopName ASC) AS Workshop
FROM Workshop;
-- Output: ["Gift Wrapping","Reindeer Care","Toy Assembly"]
```



## `JSON_OBJECTAGG()` function

```sql
-- SYNTAX
JSON_OBJECTAGG ( json_key_value [ json_null_clause ] )
```

The [`JSON_OBJECTAGG`](https://learn.microsoft.com/en-us/sql/t-sql/functions/json-objectagg-transact-sql) function constructs a JSON object from an aggregation of SQL data or columns.

### Example: JSON Object of Elf Directory

```sql
SELECT JSON_OBJECTAGG(ElfID: ElfName) AS ElfDirectory
FROM Elves;
```

Output:
```json
{
    "1": "Buddy",
    "2": "Jingle",
    "3": "Sparkle",
    "4": "Snowflake",
    "5": "Peppermint"
}
```

### Example: Combining JSON_ARRAYAGG() and JSON_OBJECTAGG()
We can combine both functions to generate a JSON object where each workshop maps to an array of elf names:


```sql
WITH ElfGroups AS (
    SELECT 
        W.WorkshopName,
        JSON_ARRAYAGG(E.ElfName ORDER BY E.ElfName ASC) AS ElfArray
    FROM Workshop W
    JOIN Elves E ON W.WorkshopID = E.WorkshopID
    GROUP BY W.WorkshopName
)
SELECT JSON_OBJECTAGG(WorkshopName: ElfArray) AS WorkshopElves
FROM ElfGroups;
```

Output:
```json
{
    "Toy Assembly": ["Buddy", "Jingle"],
    "Gift Wrapping": ["Snowflake", "Sparkle"],
    "Reindeer Care": ["Peppermint"]
}
```

## What about `FOR JSON`?

You still have option to use `FOR JSON` syntax, but the output may be more verbose and less compact compared to the new aggregate functions.

```sql
SELECT ElfID, ElfName
FROM Elves
FOR JSON PATH;
```

Output: 
```json
[
  {
    "ElfID": 1,
    "ElfName": "Buddy"
  },
  {
    "ElfID": 2,
    "ElfName": "Jingle"
  },
  {
    "ElfID": 3,
    "ElfName": "Sparkle"
  },
  {
    "ElfID": 4,
    "ElfName": "Snowflake"
  },
  {
    "ElfID": 5,
    "ElfName": "Peppermint"
  }
]
```

While `FOR JSON` works well, the new functions like `JSON_ARRAYAGG` and `JSON_OBJECTAGG` offer cleaner and more flexible options for working with JSON data.

Have fun with elves and JSON! 


## Conclusion

This lightweight post aimed to bring the new functions to your attention, as not everyone works with the cloud and might not be aware of the shiny new features coming your way in the future.

Thank you,

Magda