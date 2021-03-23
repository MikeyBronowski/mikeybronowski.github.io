---
title: Sapiens
bookauthor: Yuval Noah Harari
date: 2019-05-12
quotes:
  - date: 2019-05-12
    quote: La recomendación de Buda fue detener no solo la búsqueda de los logros externos, sino también la búsqueda de los sentimientos internos.
  - date: 2019-05-12
    quote: Según el budismo, la raíz del sufrimiento no es ni la sensación de dolor ni la tristeza, ni siquiera la falta de sentido. Más bien, el origen real del sufrimiento es la búsqueda continua e inútil de sensaciones fugaces, que hace que estemos en un estado de tensión constante, de desazón y de insatisfacción. Debido a esta búsqueda, la mente nunca está satisfecha. Incluso cuando experimenta placer no está contenta, porque teme que esta sensación desaparezca pronto, y anhela que dicha sensación permanezca y se intensifique.
  - date: 2019-05-12
    quote: La gente se libera del sufrimiento no cuando experimenta este o aquel placer pasajero, sino cuando comprende la naturaleza no permanente de todas sus sensaciones y deja de anhelarlas. Este es el objetivo de las prácticas budistas de meditación. En la meditación se supone que uno observa de cerca su mente y su cuerpo, presencia la aparición y desaparición incesante de todas sus sensaciones, y se da cuenta de lo inútil que es intentar conseguirlas. Cuando la búsqueda se detiene, la mente se vuelve más relajada, clara y satisfecha. Siguen surgiendo y pasando todo tipo de sensaciones (alegría, ira, aburrimiento, lujuria), pero cuando uno deja de anhelar sensaciones concretas, estas se aceptan sencillamente por lo que son. Uno vive en el momento presente en lugar de fantasear acerca de lo que pudo haber sido.
---
## *{{page.bookauthor}}*

{% for quote in page.quotes reversed %}
#### {{ quote.date | date: '%B %d, %Y' }}
{{ quote.quote }}
{% endfor %}
