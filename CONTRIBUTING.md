# Contributing to Carrot

First off, thank you for considering contributing to Carrot. It's people like you that make Carrot such a great tool.

Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of
the developers managing and developing this open source project. In return,
they should reciprocate that respect in addressing your issue, assessing
changes, and helping you finalize your pull requests.

Contributions to Carrot are governed by our [Code of Conduct][6] and a set of
Project Bylaws (TBD). Come join us!

## File Structure

```
|__ .github/
|__ build/
|__ dist/
|__ docs/
|__ images/
|__ scripts/
|__ src/
|__ test/
```

**`.github/`:** holds all github relevant files (also the CI pipeline).

**`build/`:** holds all the compiled typescript files.

**`dist/`:** holds compiled distribution & production version of the code base.

**`docs/`:** holds the documentation of carrot

**`images/`:** holds some images for the documentation and readme

**`scripts/`:** holds DevOps scripts (e.g. build, test, etc.) used to create and maintain the repo.

**`src/`:** holds all the source code.

**`test/`:** holds all the unit & integration tests for the repo.

## Building

Distribution and production code is bundled using [`parcel`](parceljs.org). Scripts for bundling source code, building out the test suite, and generating documentation will be stored in the `scripts/` directory as `src.*.js`, `tests.*.js`, and `docs.*.js`, respectively.

### File Sub-Structure `scripts/`

```
.__ build.ts
.__ index.ts
```

### Running Build Scripts

**Bundle Source Code**

```
npm run build:src
```

Runs `scripts/build.ts` and creates/updates four files in `dist/`:

- `dist/dev/index.js`: _compiled for Node.js development_
- `dist/production/index.min.js`: _compiled for Node.js production_
- `dist/dev/index.browser.js`: _compiled for Browser development_
- `dist/production/index.browser.min.js`: _compiled for Browser production_

**Generating Documentation**

```
npm run build:docs
```

Runs `typedoc --options typedoc.json` and generates publicly available documentation as HTML files in the `docs/` and Markdown in `DOCUMENTATION.md` using [`jsdoc`](https://www.npmjs.com/package/jsdoc) and [`jsdoc2md`](https://www.npmjs.com/package/jsdoc-to-markdown), respectively.

**[DEPRECATED] Bundling Source Code w/ Webpack**

```
npm run build:src:webpack
```

## Using the issue tracker

First things first: **Do NOT report security vulnerabilities in public issues!**
Please disclose responsibly by letting [the Carrot Security team](mailto:people@liquidcarrot.io?subject=Security)
know upfront. We will assess the issue as soon as possible on a best-effort
basis and will give you an estimate for when we have a fix and release available
for an eventual public disclosure.

The GitHub issue tracker is the preferred channel for [bug reports](#bugs),
[features requests](#features) and [submitting pull requests](#pull-requests),
but please respect the following restrictions:

- Please **do not** use the issue tracker for personal support requests. Use
  [Carrot Chat][8] instead. Alternately, help us to help more people by
  using our publicly archived user(TODO) or developer(TODO) mailing lists.

- Please **do not** derail or troll issues. Keep the discussion on topic and
  respect the opinions of others.

If you need to learn how to open an issue on Github we invite you to check out [this resource](https://help.github.com/en/articles/creating-an-issue)!

## Bug reports

A bug is a _demonstrable problem_ that is caused by the code in our
repositories. Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or `next` branch in the repository.

3. **Isolate the problem** &mdash; ideally create a reduced test case.

A good bug report shouldn't leave others needing to chase you up for more
information. Please try to be as detailed as possible in your report. What is
your environment? What steps will reproduce the issue? What OS experiences the
problem? What would you expect to be the outcome? All these details will help
people to fix any potential bugs. Our issue template will help you include all
of the relevant detail.

Example:

> Short and descriptive example bug report title
>
> A summary of the issue and the browser/OS environment in which it occurs. If
> suitable, include the steps required to reproduce the bug.
>
> 1. This is the first step
> 2. This is the second step
> 3. Further steps, etc.
>
> `<url>` - a link to the reduced test case
>
> Any other information you want to share that is relevant to the issue being
> reported. This might include the lines of code that you have identified as
> causing the bug, and potential solutions (and your opinions on their
> merits).

## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea
fits with the scope and aims of the project. It's up to _you_ to make a strong
case to convince the project's developers of the merits of this feature. Please
provide as much detail and context as possible.

## Pull requests

Good pull requests - patches, improvements, new features - are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.

**Please ask first** before embarking on any significant pull request (e.g.
implementing features, refactoring code), otherwise you risk spending a lot of
time working on something that the project's developers might not want to merge
into the project. You can talk with the community on our
developer mailing list(TODO). We're always open to suggestions and will get
back to you as soon as we can!

### For new Contributors

If you never created a pull request before, welcome :tada: :smile: [Here is a great tutorial](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)
on how to send one :)

1. [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/<repo-name>
   # Navigate to the newly cloned directory
   cd <repo-name>
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/liquid-carrot/<repo-name>
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Make sure to update, or add to the tests when appropriate. Patches and
   features will not be accepted without tests. Run `make check` to check that
   all tests pass after you've made changes. Look for a `Testing` section in
   the project’s README for more information.

5. If you added or changed a feature, make sure to document it accordingly in
   the [Carrot documentation](https://github.com/liquid-carrot/carrot-documentation)
   repository.

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
   with a clear title and description.

### For Carrot Committers

1. Be sure to set up [GitHub two-factor authentication](https://help.github.com/articles/about-two-factor-authentication/),
   then [link your account to your GitHub account](https://gitbox.liquid-carrot.org/setup/).
   You will need to wait about 30 minutes after completing this process
   for it to complete. Follow the instructions in the organisational
   invite email you receive. Alternately, you can use the mirror
   of the repository at `https://gitbox.liquid-carrot.org/repos/asf/carrot.git`
   if you do not agree to the GitHub Terms of Service.

2. Clone the repo and create a branch.

   ```bash
   git clone https://github.com/liquidcarrot/carrot.git
   cd carrot
   git checkout -b <topic-branch-name>
   ```

3. Make sure to update, or add to the tests when appropriate. Patches and
   features will not be accepted without tests. Run `npm test` to check that
   all tests pass after you've made changes. Look for a `Testing` section in
   the project’s README for more information.

4. If you added or changed a feature, make sure to document it accordingly in
   the [Carrot documentation](https://liquidcarrot.github.io/carrot)
   using [JSDoc](http://usejsdoc.org/about-getting-started.html).

5. Push your topic branch up to our repo

   ```bash
   git push origin <topic-branch-name>
   ```

6. Open a Pull Request using your branch with a clear title and description.
   Please also add any appropriate labels to the pull request for clarity.

Optionally, you can help us with these things. But don’t worry if they are too
complicated, we can help you out and teach you as we go :)

1. Update your branch to the latest changes in the upstream master branch. You
   can do that locally with

   ```bash
   git pull --rebase upstream master
   ```

   Afterwards force push your changes to your remote feature branch.

2. Once a pull request is good to go, you can tidy up your commit messages using
   Git's [interactive rebase](https://help.github.com/articles/interactive-rebase).

**IMPORTANT**: By submitting a patch, you agree to license your work under the
License, per your signed CLA.

## Triagers

Carrot committers who have completed the GitHub account linking
process may triage issues. This helps to speed up releases and minimises both
user and developer pain in working through our backlog.

Briefly, to triage an issue, review the report, validate that it is an actual
issue (reproducing if possible), and add one or more labels.

If you are not an official committer, please reach out to our mailing list(TODO)
or [chat][8] to learn how you can assist with triaging indirectly.

## Maintainers

If you have commit access, please follow this process for merging patches and cutting new releases.

### Reviewing changes

1. Check that a change is within the scope and philosophy of the component.
2. Check that a change has any necessary tests.
3. Check that a change has any necessary documentation.
4. If there is anything you don’t like, leave a comment below the respective
   lines and submit a "Request changes" review. Repeat until everything has
   been addressed.
5. If you are not sure about something, mention specific people for help in a
   comment.
6. If there is only a tiny change left before you can merge it and you think
   it’s best to fix it yourself, you can directly commit to the author’s fork.
   Leave a comment about it so the author and others will know.
7. Once everything looks good, add an "Approve" review. Don’t forget to say
   something nice 👏🐶💖✨
8. If the commit messages follow our conventions(TODO)

   1. If the pull request fixes one or more open issues, please include the
      text "Fixes #472" or "Fixes liquid-carrot/carrot#472".
   2. Use the "Rebase and merge" button to merge the pull request.
   3. Done! You are awesome! Thanks so much for your help 🤗

9. If the commit messages _do not_ follow our conventions

   1. Use the "squash and merge" button to clean up the commits and merge at
      the same time: ✨🎩
   2. If the pull request fixes one or more open issues, please include the
      text "Fixes #472" or "Fixes liquid-carrot/carrot#472".

Sometimes there might be a good reason to merge changes locally. The process
looks like this:

### Reviewing and merging changes locally

```
git checkout master # or the main branch configured on github
git pull # get latest changes
git checkout feature-branch # replace name with your branch
git rebase master
git checkout master
git merge feature-branch # replace name with your branch
git push
```

When merging PRs from forked repositories, we recommend you install the
[hub](https://github.com/github/hub) command line tools.

This allows you to do:

```
hub checkout link-to-pull-request
```

meaning that you will automatically check out the branch for the pull request,
without needing any other steps like setting git upstreams! :sparkles:

## Thanks

Special thanks to [Hoodie](https://github.com/hoodiehq/hoodie) for the great
CONTRIBUTING.md template.

[1]: https://liquidcarrot.io/carrot
[5]: https://liquidcarrot.io/carrot
[6]: https://github.com/liquidcarrot/carrot/blob/master/CODE_OF_CONDUCT.md
[7]: https://liquidcarrot.io/carrot
[8]: https://gitter.im/carrot-ai/community?utm_source=share-link&utm_medium=link&utm_campaign=share-link
