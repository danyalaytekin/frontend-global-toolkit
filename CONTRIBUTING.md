# Contributing to frontend-global-toolkit

When contributing to an existing component, or building a new one, work should:

- Always be done in a branch
- Always follow the best practices in the [front-end playbook](https://github.com/springernature/frontend-playbook/)
- Always involve updating or adding to the relevant parts of the documentation
- Always be linted
- **Never** include any versioning information (see separate [versioning guidelines](#versioning))
    - If this is a new component version as `0.0.0` in the `package.json` to stop auto-publication
- Always be submitted via a pull request in the [`#frontend-pr`](https://springernature.slack.com/messages/C0GJK53TQ/) slack room

### Pull requests

- Good pull requests - patches, improvements, new features - should remain focused in scope and avoid containing unrelated commits. You should follow the guidelines in the [front-end playbook](https://github.com/springernature/frontend-playbook/blob/master/practices/code-review.md)
- Please adhere to the coding conventions used throughout a project (indentation, accurate comments, etc.) and any other requirements (such as test coverage)
- Merging pull requests should be done via [squash and merge](https://help.github.com/articles/about-pull-request-merges/#squash-and-merge-your-pull-request-commits)
- Once your pull request has been merged back to the master branch, you can follow the [versioning guidelines](#versioning) below to publish your changes. **Note**: you do not have to create a new version after every merge. Related merges can be bundled into one new version

### Linting

Whenever you make changes to this repo, you should run the linter locally before you commit your work. The following command is available to do this:

```
$ npm run lint
```

### Versioning

All components are versioned individually using [semver](http://semver.org/). You should read through the semver documentation, and the guidelines in the [front-end playbook](https://github.com/springernature/frontend-playbook/blob/master/practices/semver.md).

To publish a new version of a component, or to publish a new component:

1. Switch to the `master` branch, version commits are the only commits that shouldn't be in a pull-request
2. Increment either the major, minor, or patch version in the relevant `package.json`. If you're unsure which, have a chat about it or re-read the semver docs
3. Add an entry to the relevant `HISTORY.md` file outlining the changes in the new version. Take your time, this log should be useful to developers – it should help them make decisions about whether they can upgrade
4. Commit your changes with a message formatted as `name-of-component version 1.2.3` – this helps people find version commits in the log
5. (Make sure you only publish one component at a time)
6. Push the commit to origin using `git push`
7. The build system will automatically publish your new version based on the `package.json` version
