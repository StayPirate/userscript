// ==UserScript==
// @name        Bugzilla - Fix background
// @namespace   SUSE SecTools
// @match       https://bugzilla.suse.com/*
// @run-at      document-end
// @grant       none
// @version     1.1.1
// @author      gsonnu
// @description Fixes the bugzilla background for better integration with the Dark Reader addon
// ==/UserScript==

(function () {
    let body = document.querySelector('body');

    body.setAttribute('style', 'background-image: none; background: #dfdfdf;');
    body.querySelector('#header').setAttribute('style', 'background: #cfcfcf;');
})();
