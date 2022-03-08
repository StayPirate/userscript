// ==UserScript==
// @name        IBS - Better Title
// @namespace   SUSE SecTools
// @match       https://build.suse.de/package/view_file/*
// @run-at      document-end
// @grant       none
// @version     1.0.0
// @author      gsonnu
// @description Changes the title in the IBS file view to also show the project
// ==/UserScript==

(function(){
    const sep = ' / '
    let title = '';
    for (let crumb of document.querySelectorAll('#breadcrumbs li.breadcrumb-item')) {
        title += `${crumb.textContent.trim()}${sep}`;
    }

    document.title = title.slice(0, -sep.length);
})();
