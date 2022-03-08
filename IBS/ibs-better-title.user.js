// ==UserScript==
// @name        IBS - Better Title
// @namespace   SUSE SecTools
// @match       https://build.suse.de/package/view_file/*
// @match       https://build.suse.de/package/show/*
// @match       https://build.suse.de/project/show/*
// @run-at      document-end
// @grant       none
// @version     1.0.1
// @author      gsonnu
// @description Changes the title in IBS project/package/file view
// ==/UserScript==

(function(){
    const sep = ' / '
    let title = '';

    for (let crumb of document.querySelectorAll('#breadcrumbs li.breadcrumb-item')) {
        let trimmed = crumb.textContent.trim();

        if (trimmed === 'Overview')
            break;

        title += `${trimmed}${sep}`;
    }

    let a = document.title.split('-')
    document.title = `${title.slice(0, -sep.length)} - ${a[a.length - 1].trim()}`;
})();
