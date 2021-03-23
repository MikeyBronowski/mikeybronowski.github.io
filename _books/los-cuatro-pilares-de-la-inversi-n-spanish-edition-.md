---
title: Los cuatro pilares de la inversión (Spanish Edition)
bookauthor: Bernstein, William
date: 2020-03-22
quotes:
  - date: 2020-02-03
    quote: A lo largo de los últimos doscientos años, cada 1% desembolsado anualmente reduce la cantidad final por un factor de ocho. Por ejemplo, una reducción del 1% en los beneficios reducirá la cantidad de beneficio final de 23 millones de dólares a unos 3 millones, mientras que un 2% de reducción lo dejará en unos 400.000 dólares.
  - date: 2020-02-03
    quote: Para información de los principiantes, este gráfico ignora las comisiones e impuestos, que habrían hecho disminuir los beneficios en otro uno o dos por ciento, reduciendo una fortuna potencial de 23 millones de dólares a las cantidades arriba mencionadas.
  - date: 2020-02-22
    quote: Éste es un patrón con el que nos toparemos reiteradamente&#58; en el ámbito de los profesionales de las finanzas, los mejores resultados pueden explicarse fácilmente por el azar, mientras que los peores parecen ser fruto de una persistente y casi misteriosa incompetencia.
  - date: 2020-03-18
    quote: Devil Take the Hindmost, de Edward Chancellor. Una
  - date: 2020-03-22
    quote: Finalmente, dado que nuestras estimaciones en torno a la rentabilidad futura de acciones y bonos son muy rigurosas, no tiene mucho sentido poseer más del 80% de acciones, más allá de lo agresivo y tolerante al riesgo que usted sea.
---
## *{{page.bookauthor}}*

{% for quote in page.quotes reversed %}
#### {{ quote.date | date: '%B %d, %Y' }}
{{ quote.quote }}
{% endfor %}
