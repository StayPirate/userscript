// ==UserScript==
// @name         SMELT - Fix link behavior
// @namespace    SUSE SecTools
// @match        https://smelt.suse.de/*
// @run-at       document-end
// @grant        none
// @version      1.0.0
// @author       gsonnu
// @description  Makes SMELT links behave like normal links
// ==/UserScript==


(function () {
    function fix_links() {
        for (let node of document.querySelectorAll('a[target]')) {
            node.removeAttribute('target');
        }
    }

    setInterval(fix_links, 1000);
})();
