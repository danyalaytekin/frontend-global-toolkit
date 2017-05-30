# CSS box pattern

Simple box pattern. Import each `scss` file into the respective level in your application. If not using the defaults then create your own settings level file within your application.

## Examples

### Standard using classes
```html
<div class="p-box">box content</div>
```

### Circle using classes
```html
<div class="p-box p-box--circle">box content</div>
```

### Standard using @mixin
```scss
.class-name {
    @include fec-box;
}
```

### Circle using @mixin
```scss
.class-name {
    @include fec-box;
    @include fec-box--circle;
}
```