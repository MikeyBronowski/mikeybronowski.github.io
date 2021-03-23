---
title: El Plan Revolucionario
bookauthor: Fitness Revolucionario
date: 2017-01-16
quotes:
  - date: 2017-01-16
    quote: Si tu ingesta de proteína es menor a 2g/kilo, auméntala un poco, y revisa el capítulo de estancamientos.
---
## *{{page.bookauthor}}*

{% for quote in page.quotes reversed %}
#### {{ quote.date | date: '%B %d, %Y' }}
{{ quote.quote }}
{% endfor %}
