# frontend-components
<img src="https://cdn.travis-ci.org/images/favicon-c566132d45ab1a9bcae64d8d90e4378a.svg" width=20 height=20/> [![Build Status](https://travis-ci.com/springernature/frontend-components.svg?token=zyctw5kYdmyz8scswTTY&branch=master&style=flat-square)](https://travis-ci.com/springernature/frontend-components)
[![LGPL-3.0 licensed](https://img.shields.io/badge/license-LGPL%203.0-blue.svg)][info-license]

Core front-end components for use on all Springer Nature products. Components can contain one or more of `css`, `javascript`, `templates`, `images`. Each component should have its own folder in `./packages`. Components are published to NPM using the `@springernature` scope.

### Writing a component

All components are validated on our CI server (Travis) to ensure they conform to certain naming conventions, file/folder structure, and that certain required files are present. The validation is configurable in the [`validation.json`](validation.json) file. The current configuration is described below.

You can test if your component validates by running `npm run validate` from within the project on the command line.

### Component structure

```
frontend-components
  └── packages
    ├── fec-name-of-component
      └── scss
        └── **/*.{scss,css,md}
      └── js
        └── **/*.{js,json,md}
      └── view
        └── **/*.{html,dust,md}
      └── img
        └── **/*.{jpg,gif,png,svg,md}
      └── .npmrc
      └── HISTORY.md
      └── package.json
      └── README.md
```

The files and folders detailed here are subject to the following validation rules:

- `.npmrc`, `README.md`, `HISTORY.md`, `package.json` are the only files allowed at the top level, they are all _required_
- The folders `scss`, `js`, `view`, `img` are the only folders that are allowed at the top level, they are _optional_
- Within these folders you can have any number of `sub-folders`, but there are restrictions on the file types allowed

Additionally the validation configuration ignores some files and folders such as `.DS_Store`.

### Naming

Components should use the `fec` (Front End Components) prefix for naming. The component folder inside packages should use the convention `fec-name-of-component`, where `name-of-component` uses only lowercase alphanumeric characters and hyphens.

#### `package.json`

Packages in `frontend-components` are [scoped](https://docs.npmjs.com/misc/scope) to the `springernature` organisation. Components are exported using the naming convention `@springernature/fec-name-of-component`.

```json
{
  "name": "@springernature/fec-name-of-component",
}
```

#### `.npmrc`

Your `.npmrc` file is used to publish packages via Travis CI, and **MUST** contain the following:

```
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

#### SASS

All SASS mixins/functions/variables should:

- Take the form `fec-name-of-component--variable-name` for variables
- Take the form `fec-name-of-component` for single mixins/functions
- Take the form `fec-name-of-component--some-name` when there are multiple mixins/functions
- Use only lowercase alphanumeric characters and hyphens

```scss
// variables
$fec-name-of-component--variable-name
$fec-name-of-component--other-name

// mixins
@mixin fec-name-of-component () {}
@mixin fec-name-of-component--some-name () {}

// functions
@function fec-name-of-component () {}
@function fec-name-of-component--some-name () {}
```

#### Javascript

_todo_

### Testing

Tests for your component should _not_ be written in your component folder, but in a component folder within the top-level `__tests__` folder. For example, unit tests for `fec-name-of-component` should live in `__tests__/unit/fec-name-of-component/*.js`.

To run all the tests use `npm test` from within the project on the command line. The run an individual test use `npm run testfile -- name-of-test-file`.

#### Linting

Javascript linting is enforced using [XO](https://github.com/sindresorhus/xo) across all components. Run the linter using `npm run lint` from within the project on the command line.

### Publishing

To publish a new component please follow the [contributing guidelines](CONTRIBUTING.md). Publishing to NPM is done automatically in Travis.

License
-------

The frontend-components repository is licensed under the [Lesser General Public License (LGPL-3.0)][info-license]. All packages within this repository are licensed under the [Lesser General Public License (LGPL-3.0)][info-license].
Copyright &copy; 2017, Springer Nature

[info-license]: LICENSE