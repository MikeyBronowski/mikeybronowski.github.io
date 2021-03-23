---
title: How To Win Friends And Influence People
bookauthor: Carnegie, Dale
date: 2016-03-22
quotes:
  - date: 2016-03-22
    quote: Any fool can criticise, condemn and complain – and most fools do. But it takes character and self-control to be understanding and forgiving. ‘A great man shows his
  - date: 2016-03-22
    quote: ‘I consider my ability to arouse enthusiasm among my people,’ said Schwab, ‘the greatest asset I possess, and the way to develop the best that is in a person is by appreciation and encouragement. ‘There is nothing else that so kills the ambitions of a person as criticisms from superiors. I never criticise anyone. I believe in giving a person incentive to work. So I am anxious to praise but loath to find fault. If I like anything, I am hearty in my approbation and lavish in my praise.’ That
  - date: 2016-03-22
    quote: ‘If there is any one secret of success, it lies in the ability to get the other person’s point of view and see things from that person’s angle as well as from your own.’
---
## *{{page.bookauthor}}*

{% for quote in page.quotes reversed %}
#### {{ quote.date | date: '%B %d, %Y' }}
{{ quote.quote }}
{% endfor %}
