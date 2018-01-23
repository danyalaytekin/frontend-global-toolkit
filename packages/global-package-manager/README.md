# Package manager

> Handles the creation, validation, and publication of packages on all Springer Nature products

## Install

```
$ npm install --save-dev @springernature/global-package-manager
```

Installing `global-package-manager` adds package management exectuables to `./node_modules/.bin/`.

## Usage

The package manager creates and validates packages to a set specification as outlined in a `validation.json` file stored in your repository. It expects all packages to be stored in the same location, and to be published to NPM under an organisation scope.

### Validation.json

Your `validation.json` file should look like this:

```
{
  "scope": "organisation",
  "prefix": "package-name-prefix",
  "required": [
    "path/to/file.ext"
  ],
  "ignored": [
    "string"
  ],
  "folders": {
    "name-of-folder": [
      "extension"
    ],
    "name-of-folder": [
      "extension"
    ]
  }
}
```

#### scope
This is the organisation name as used on NPM.

#### prefix
Package names should all have a prefix that namespaces them within NPM based on where they originate. For example all Springer Nature packages published via the [frontend-global-toolkit](https://github.com/springernature/frontend-global-toolkit) use the prefix `global`.

#### required
An array of file paths that **MUST** appear in any package.

#### ignored
An array of files that can be ignored e.g. `.DS_Store`. This will match any files that start or end with your chosen string.

#### folders
This object contains keys that map to any folder names that are allowed within a package, with their value being an array of allowed file extensions within that folder. These folders are optional, but are the only ones allowed. The folders can contain any number of sub-folders with no restriction on naming, but the file extensions within these sub-folders must match the array.

The following example would allow a folder with the name `js` that contains files with the extensions `.js` and `.json`:
```
"js": [
  "js",
  "json"
]
```

### Configuration

Your repository `package.json` file should contain a `packageManager` key that points towards your `validation.json` file the folder where you store packages. For example:

```
"packageManager": {
    "validationPath": "path/to/validation.json",
    "packagesDirectory": "path/to/packages"
  }
```

### Package creation

```
$ ./node_modules/.bin/sn-package-create
```

The package creation script can be run on the CLI using `./node_modules/.bin/sn-package-create`. The script will step through a set of options that will create a new blank package in the required format, with the correct files, using the information provided in the `validation.json`.

### Package validation

```
$ ./node_modules/.bin/sn-package-validation
$ ./node_modules/.bin/sn-package-validation global-name-of-package
```

The package validation script can be run on the CLI using `./node_modules/.bin/sn-package-validation`. Running this script will validate _all_ the packages in the provided packages directory against the `validation.json` file. You can validate an individual package by passing the name of the package as a CLI argument.

### Package publication

```
$ ./node_modules/.bin/sn-package-publish
```

The package publishing script can be run on the CLI using `./node_modules/.bin/sn-package-publish`. This script is intended to run on a CI server and expects a valid NPM token that allows you to publish to the specified organisation to passed as the CLI argument `NPM_TOKEN`.

The script will identify all valid packages within the specified packages directory, and publish a new version using the version number within the packages `package.json` file if that version is greater than the last version published on NPM. Version numbers of `0.0.0` are ignored.