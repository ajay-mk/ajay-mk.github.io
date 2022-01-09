---
layout: page
title: Blog Posts
name: Blog
---
<p class="message">
  Hey there! Welcome, this page will display blog posts.
</p>

<ul>
{% for post in site.categories.blog-post %}
<li>
<h2>
  <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
</h2>
<span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}, By {{ post.author }}</span>
</li>
<!--<img src="{{ site.baseurl }}/imagens/{{ post.image }}">-->
{{ post.content |truncatehtml | truncatewords: 100 }}
<a href="{{ post.url | prepend: site.baseurl }}">Read more</a>
{% endfor %}

</ul>


#### Page is still under development.
