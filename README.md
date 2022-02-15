# Userscripts

## Bugzilla

***[bugzilla-fix-background.user.js](Bugzilla/bugzilla-fix-background.user.js)***

Fixes the bugzilla background for better integration with the Dark Reader addon.

***[bugzilla-hide-bots-comments.user.js](Bugzilla/bugzilla-hide-bots-comments.user.js)***

Hides bots comment in bugzilla by default. Also add links to quickly collapse or expand them as needed.

Screenshots:

![](images/bugzilla-hide-bots-comments.png)

![](images/bugzilla-hide-bots-comments_links.png)

***[bugzilla-redirect-to-com.user.js](Bugzilla/bugzilla-redirect-to-com.user.js)***

Redirects all bugzilla.opensuse.org bug pages to bugzilla.suse.com. The redirecting is done when opening a link to a bug on bugzilla.opensuse.org.

## SMASH

***[smash-login-redirection.user.js](SMASH/smash-login-redirection.user.js)***

Redirect login page to actual page - using the next search parameter - if the user is already logged in.

***[smash-opensuse-actions.user.js](SMASH/smash-opensuse-actions.user.js)***

Adds a button to open a bug in the openSUSE bugzilla tracker. Also updates the action item in the Actions dropdown with the same link.

Screenshots:

![](images/smash-opensuse-actions.png)

***[smash-useful-links.user.js](SMASH/smash-useful-links.user.js)***

Adds links to the package support status page and package changes file in the SMASH issue page.

Screenshots:

![](images/smash-useful-links_changes.png)

![](images/smash-useful-links_smelt.png)

## SMELT

***[smelt-better-ibs-integration.user.js](SMELT/smelt-better-ibs-integration.user.js)***

Add links to IBS project (patchinfo and package repository) to the SMELT incident page.

Screenshots:

![](images/smelt-better-ibs-integration_package.png)

![](images/smelt-better-ibs-integration_patchinfo.png)

# Installation

These userscripts should be used with browsers addons such as Violentmonkey, Firemonkey, Greasemonkey or Tampermonkey. 
To ease the installation process, you can use and HTTP server and install them from there.  
E.g.: `python3 -m http.server` will create an HTTP server in the current directory and serve files from there.

$ Hooks

The [.hooks](.hooks) directory contains useful hooks to ease management of this repository.
In particular, the [pre-commit](.hooks/pre-commit) hooks contains a script to automatically generate the README.md file with every commit.
