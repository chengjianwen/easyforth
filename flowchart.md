---
layout: flowchart
---


<div id="sample">
  {% include save.html display="none"%}
  {% include load.html display="none"%}
  {% include run.html display="block"%}
  {% include cls.html display="block"%}
  <div style="width: 100%; display: flex; justify-content: space-between">
    {% include palette.html %}
    {% include diagram.html %}
    {% include forth.html %}
  </div>
  {% include model.html display="none"%}
</div>
