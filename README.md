# frontend-components

Core front-end components for use on all Springer Nature products. Components can contain one or more of `css`, `javascript`, `templates`, `images`.

Each component should have it's own folder in `./packages`.

## Naming

Components should use the `snc` prefix for naming (Springer Nature Components). The component folder inside packages should use the convention `snc-name-of-component`, where `name-of-component` uses only lowercase alphanumeric characters and hyphens.

### `package.json`

Components are exported using the naming convention `@components/name-of-component`, where `name-of-component` uses only lowercase alphanumeric characters and hyphens.

```json
{
  "name": "@components/name-of-component",
}
```

### SASS

Any SASS mixins/functions/variables should be prefixed with `snc-name-of-component`. All naming should use only lowercase alphanumeric characters and hyphens.

```scss
// variables
$snc-name-of-component--variable-name

// mixins
@mixin snc-name-of-component () {}
@mixin snc-name-of-component--other-name () {}

// functions
@function snc-name-of-component () {}
@function snc-name-of-component--other-name () {}
```

### Javascript

Javscript components are imported using camelcase naming with the `SNC` prefix.

```javascript
import SNCModuleName from '@material/name-of-component'
```
