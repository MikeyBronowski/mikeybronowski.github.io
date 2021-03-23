---
title: C# in Depth
bookauthor: Jon Skeet
date: 2014-12-31
quotes:
  - date: 2014-12-31
    quote: In essence, variance is about being able to use an object of one type as if it were another, in a type-safe way. You’re used to variance in terms of normal inheritance&#58; if a method has a declared return type of Stream, you can return a MemoryStream from the implementation, for example. Generic
  - date: 2014-12-31
    quote: Covariance is all about values being returned from an operation back to the caller.
  - date: 2014-12-31
    quote: Contravariance is the opposite way around. It’s about values being passed into the API by the caller&#58; the API is consuming the values instead
  - date: 2014-12-31
    quote: REPL—a read, evaluate, print loop.
---
## *{{page.bookauthor}}*

{% for quote in page.quotes reversed %}
#### {{ quote.date | date: '%B %d, %Y' }}
{{ quote.quote }}
{% endfor %}
