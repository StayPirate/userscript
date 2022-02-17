# Table of Contents

- [Userscripts](#userscripts)
  - [Bugzilla](#bugzilla)
    - [bugzilla-fix-background.user.js](#bugzilla-fix-backgrounduserjs)
    - [bugzilla-hide-bots-comments.user.js](#bugzilla-hide-bots-commentsuserjs)
    - [bugzilla-redirect-to-com.user.js](#bugzilla-redirect-to-comuserjs)
  - [SMASH](#smash)
    - [smash-add-bugzilla-summary.user.js](#smash-add-bugzilla-summaryuserjs)
    - [smash-login-redirection.user.js](#smash-login-redirectionuserjs)
    - [smash-opensuse-actions.user.js](#smash-opensuse-actionsuserjs)
    - [smash-useful-links.user.js](#smash-useful-linksuserjs)
  - [SMELT](#smelt)
    - [smelt-better-ibs-integration.user.js](#smelt-better-ibs-integrationuserjs)
- [Installation](#installation)
- [Hooks](#hooks)

# Userscripts

## Bugzilla

### [bugzilla-fix-background.user.js](Bugzilla/bugzilla-fix-background.user.js)

Current version: 1.1.1

Fixes the bugzilla background for better integration with the Dark Reader addon.

### [bugzilla-hide-bots-comments.user.js](Bugzilla/bugzilla-hide-bots-comments.user.js)

Current version: 1.2.2

Hides bots comment in bugzilla by default. Also add links to quickly collapse or expand them as needed.

#### Screenshots

![](images/bugzilla-hide-bots-comments.png)

![](images/bugzilla-hide-bots-comments_links.png)

### [bugzilla-redirect-to-com.user.js](Bugzilla/bugzilla-redirect-to-com.user.js)

Current version: 1.1.1

Redirects all bugzilla.opensuse.org bug pages to bugzilla.suse.com. The redirecting is done when opening a link to a bug on bugzilla.opensuse.org.

## SMASH

### [smash-add-bugzilla-summary.user.js](SMASH/smash-add-bugzilla-summary.user.js)

Current version: 1.0.0

Add summary for Bugzilla bugs in the Overview tab.

#### Screenshots

![](images/smash-add-bugzilla-summary.png)

### [smash-login-redirection.user.js](SMASH/smash-login-redirection.user.js)

Current version: 1.1.1

Redirects login page to actual page - using the next search parameter - if the user is already logged in.

### [smash-opensuse-actions.user.js](SMASH/smash-opensuse-actions.user.js)

Current version: 1.2.1

Adds a button to open a bug in the openSUSE bugzilla tracker. Also updates the action item in the Actions dropdown with the same link.

#### Screenshots

![](images/smash-opensuse-actions.png)

### [smash-useful-links.user.js](SMASH/smash-useful-links.user.js)

Current version: 1.1.1

Adds links to the package support status page and package changes file in the SMASH issue page.

#### Screenshots

![](images/smash-useful-links_changes.png)

![](images/smash-useful-links_smelt.png)

## SMELT

### [smelt-better-ibs-integration.user.js](SMELT/smelt-better-ibs-integration.user.js)

Current version: 1.1.0

Add links to IBS project (patchinfo and package repository) to the SMELT incident page.

#### Screenshots

![](images/smelt-better-ibs-integration_package.png)

![](images/smelt-better-ibs-integration_patchinfo.png)

# Installation

These userscripts should be used with browsers addons such as Violentmonkey, Firemonkey, Greasemonkey or Tampermonkey.
To install the script you can use the raw link for every script or serve them from an HTTP server. When you open a link to an user.js file the addon should prompt you to install the script.

# Hooks

The [.hooks](.hooks) directory contains useful hooks to ease management of this repository.  
In particular, the [pre-commit](.hooks/pre-commit) hooks contains a script to automatically generate the README.md file with every commit.  
The directory containing the userscript will be used to determine its section (i.e. all the userscripts in the `Bugzilla` directory will be shown under the Bugzilla section). The userscripts will be listed in alphabetic order.  
The description will be extracted from the `@description` meta data in the script file, and the content of any markdown file with the name of the script inside the [docs/script](docs/scripts) directory will be appended (i.e. for a script called `my-script.user.js` all the `docs/scripts/my-script*.md` files will be processed).
The markdown files will be appended in alphabetic order.  
The same is valid for images inside the [images](images) directory, all the images which filename starts with the script name will be added - in alphabetic order - to the script description.
