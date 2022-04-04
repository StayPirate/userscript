// ==UserScript==
// @name        Bugzilla - Bug status in title
// @namespace   SUSE SecTools
// @match       https://bugzilla.suse.com/show_bug.cgi?*
// @match       https://bugzilla.opensuse.org/show_bug.cgi?*
// @run-at      document-end
// @grant       none
// @version     1.0.0
// @author      gsonnu
// @description Puts the bug status (only if closed) in the page title
// ==/UserScript==

(function () {
    let status = document.querySelector('#static_bug_status').textContent.trim();

    status = status.split('\n').map(x => x.trim());

    if (status[0] !== 'RESOLVED')
        return;

    let title = document.querySelector('title');

    title.textContent = `[${status[1]}] ${title.textContent}`;
})();
