---
title: Books
layout: single
permalink: /books/
collection: books
---

This page is the result of parsing the "My Clippings.txt" file that Kindle devices autogenerate with the highlights you make.
I created a Nodejs app called [MyClippings to Markdown](https://gitlab.com/jpallares/myclippings-to-markdown) that parses this file and creates a Markdown file for each book, grouping the quotes. I know there are plenty of tools ([Clippings.io](https://www.clippings.io/)) and scripts ([1](https://github.com/kkincade/kindle-clippings-to-markdown),[2](https://github.com/baniol/kindle-my-clippings)) doing similar things, but none of them fit my requirements and well I was bored in a rainy quaratined weekend :sweat_smile:.

I lost some clippings when I bought a new Kindle. Expect to find books in English and Spanish from very random topics:

{% for book in site.books reversed %}
### [{{ book.title }}]({{ book.url }})
*{{ book.bookauthor }}*
{% endfor %}