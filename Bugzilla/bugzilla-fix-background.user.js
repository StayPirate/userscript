// ==UserScript==
// @name        Bugzilla - Fix background
// @namespace   SUSE SecTools
// @match       https://bugzilla.suse.com/*
// @run-at      document-idle
// @grant       none
// @version     1.2.0
// @author      gsonnu
// @description Fixes the bugzilla background for better integration with the Dark Reader addon
// ==/UserScript==

(function () {
    let body = document.querySelector('body');
    let background = '';

    if (document.querySelector('input[value="SUSE Security Internal"][type="checkbox"][checked="checked"]'))
        background = '#281c1c';
    else
        background = '#dfdfdf';

    body.setAttribute('style', `background-image: none; background: ${background};`);
    body.querySelector('#header').setAttribute('style', 'background: #cfcfcf;');
})();
