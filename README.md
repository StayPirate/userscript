# Userscripts

## Bugzilla

### [bugzilla-fix-background.user.js](Bugzilla/bugzilla-fix-background.user.js)

Last version: 1.1.1

Fixes the bugzilla background for better integration with the Dark Reader addon.

### [bugzilla-hide-bots-comments.user.js](Bugzilla/bugzilla-hide-bots-comments.user.js)

Last version: 1.2.2

Hides bots comment in bugzilla by default. Also add links to quickly collapse or expand them as needed.

#### Screenshots

![](images/bugzilla-hide-bots-comments.png)

![](images/bugzilla-hide-bots-comments_links.png)

### [bugzilla-redirect-to-com.user.js](Bugzilla/bugzilla-redirect-to-com.user.js)

Last version: 1.1.1

Redirects all bugzilla.opensuse.org bug pages to bugzilla.suse.com. The redirecting is done when opening a link to a bug on bugzilla.opensuse.org.

## SMASH

### [smash-login-redirection.user.js](SMASH/smash-login-redirection.user.js)

Last version: 1.1.1

Redirects login page to actual page - using the next search parameter - if the user is already logged in.

### [smash-opensuse-actions.user.js](SMASH/smash-opensuse-actions.user.js)

Last version: 1.2.1

Adds a button to open a bug in the openSUSE bugzilla tracker. Also updates the action item in the Actions dropdown with the same link.

#### Screenshots

![](images/smash-opensuse-actions.png)

### [smash-useful-links.user.js](SMASH/smash-useful-links.user.js)

Last version: 1.1.1

Adds links to the package support status page and package changes file in the SMASH issue page.

#### Screenshots

![](images/smash-useful-links_changes.png)

![](images/smash-useful-links_smelt.png)

## SMELT

### [smelt-better-ibs-integration.user.js](SMELT/smelt-better-ibs-integration.user.js)

Last version: 1.1

Add links to IBS project (patchinfo and package repository) to the SMELT incident page.

#### Screenshots

![](images/smelt-better-ibs-integration_package.png)

![](images/smelt-better-ibs-integration_patchinfo.png)

# Installation

These userscripts should be used with browsers addons such as Violentmonkey, Firemonkey, Greasemonkey or Tampermonkey.  
To ease the installation process, you can use an HTTP server serving the repository directory and install them directly from the webpage.  
For example, the command `python3 -m http.server` will create a simple HTTP server that serves files from the current directory.

# Hooks

The [.hooks](.hooks) directory contains useful hooks to ease management of this repository.  
In particular, the [pre-commit](.hooks/pre-commit) hooks contains a script to automatically generate the README.md file with every commit.  
The directory containing the userscript will be used to determine its section (i.e. all the userscripts in the `Bugzilla` directory will be shown under the Bugzilla section). The userscripts will be listed in alphabetic order.  
The description will be extracted from the `@description` meta data in the script file, and the content of any markdown file with the name of the script inside the [docs/script](docs/scripts) directory will be appended (i.e. for a script called `my-script.user.js` all the `docs/scripts/my-script*.md` files will be processed).
The markdown files will be appended in alphabetic order.  
The same is valid for images inside the [images](images) directory, all the images which filename starts with the script name will be added - in alphabetic order - to the script description.
