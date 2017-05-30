# frontend-components

Core front-end components for use on all Springer Nature products. Components can contain one or more of `css`, `javascript`, `templates`, `images`.

Each component should have it's own folder in `./packages`.

## Naming

Components should use the `fec` prefix for naming (Front End Components). The component folder inside packages should use the convention `fec-name-of-component`, where `name-of-component` uses only lowercase alphanumeric characters and hyphens.

### `package.json`

Packages in `frontend-components` are [scoped](https://docs.npmjs.com/misc/scope) to the `springernature` organisation. Components are exported using the naming convention `@springernature/fec-name-of-component`, where `name-of-component` uses only lowercase alphanumeric characters and hyphens.

```json
{
  "name": "@springernature/fec-name-of-component",
}
```

### SASS

Any SASS mixins/functions/variables should be prefixed with `fec-name-of-component`. All naming should use only lowercase alphanumeric characters and hyphens.

```scss
// variables
$fec-name-of-component--variable-name

// mixins
@mixin fec-name-of-component () {}
@mixin fec-name-of-component--other-name () {}

// functions
@function fec-name-of-component () {}
@function fec-name-of-component--other-name () {}
```

### Javascript

Javscript components are imported using camelcase naming with the `FEC` prefix.

```javascript
import FECModuleName from '@springernature/fec-name-of-component'
```
