---
title: Las legiones malditas
bookauthor: Santiago Posteguillo
date: 2017-10-07
quotes:
  - date: 2017-10-07
    quote: Aquél cuyos oídos están tan cerrados a la verdad hasta el punto que no puede escucharla de boca de un amigo, puede darse por perdido.
---
## *{{page.bookauthor}}*

{% for quote in page.quotes reversed %}
#### {{ quote.date | date: '%B %d, %Y' }}
{{ quote.quote }}
{% endfor %}
