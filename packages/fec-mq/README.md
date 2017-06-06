# Media Query

This module makes available the [Breakpoint](http://breakpoint-sass.com/) mixin, for dealing with media queries.  

## Examples

```
.c-yourcomponent {
    color: plum;

    @include fec-mq('500px') {
        color: hotpink;
    }
}
```