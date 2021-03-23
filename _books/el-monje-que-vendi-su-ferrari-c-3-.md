---
title: El Monje Que Vendió Su Ferrari
bookauthor: Robin Sharma
date: 2017-07-04
quotes:
  - date: 2017-07-03
    quote: no puedes saber lo que se siente en la cumbre de la montaña si antes no has visitado el más hondo de los valles. ¿Entiendes?
  - date: 2017-07-04
    quote: «No hay nada noble en ser superior a otra persona. La verdadera nobleza radica en ser superior a tu antiguo yo.»
  - date: 2017-07-04
    quote: Dominar la mente Cultiva tu mente y florecerá más allá de tus expectativas. La calidad de la vida viene determinada por la calidad de los pensamientos. No existen los errores, sólo las lecciones. Considerar los reveses como oportunidades de expansión personal y crecimiento espiritual • El Corazón de la Rosa • Pensamiento Opuesto • El Secreto del Lago El secreto de la felicidad es simple&#58; averigua qué es lo que te gusta hacer y dirige todas tus energías hacia ello. Haciendo esto, la abundancia iluminará tu vida y todos tus deseos se cumplirán sin esfuerzo.
---
## *{{page.bookauthor}}*

{% for quote in page.quotes reversed %}
#### {{ quote.date | date: '%B %d, %Y' }}
{{ quote.quote }}
{% endfor %}
