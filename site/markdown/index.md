# Markdown

In addition to 100% CommonMark support, Simplemark also provides additional markdown functionality to help
customize your HTML.

## Divs

Adds a div element. Can include custom attributes.

#### Markdown

```
::: { .navigation }
Example content
:::
```

#### Output HTML

```
<div class="navigation">
  Example content
</div>
```

## Custom Attributes


Adds custom attributes like `id`, `class`, and more.

#### Markdown

```
# Header 1 { .header-1 }
```

#### Output HTML

```
<h1 class="header-1">Header 1</h1>
```
