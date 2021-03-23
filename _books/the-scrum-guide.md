---
title: The Scrum Guide
bookauthor: Ken Schwaber
date: 2016-04-10
quotes:
  - date: 2016-04-10
    quote: Only the Product Owner has the authority to cancel the Sprint,
  - date: 2016-04-10
    quote: A Sprint would be cancelled if the Sprint Goal becomes obsolete.
  - date: 2016-04-10
    quote: The Scrum Master enforces the rule that only Development Team members participate in the Daily Scrum.
---
## *{{page.bookauthor}}*

{% for quote in page.quotes reversed %}
#### {{ quote.date | date: '%B %d, %Y' }}
{{ quote.quote }}
{% endfor %}
