// ==UserScript==
// @name        Bugzilla - redirect to .com
// @namespace   SUSE SecTools
// @match       https://bugzilla.opensuse.org/show_bug.cgi?*
// @run-at      document-start
// @grant       none
// @version     1.1.1
// @author      gsonnu
// @description Redirects all bugzilla.opensuse.org bug pages to bugzilla.suse.com. The redirecting is done when opening a link to a bug on bugzilla.opensuse.org
// ==/UserScript==

(function(){
    let url = new URL(window.location.href);
    url.hostname = 'bugzilla.suse.com';
    window.location.replace(url.href)

})()
