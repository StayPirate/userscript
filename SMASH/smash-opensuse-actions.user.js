// ==UserScript==
// @name        SMASH - openSUSE bug actions
// @namespace   SUSE SecTools
// @match       https://smash.suse.de/issue/*
// @run-at      document-end
// @grant       none
// @version     1.2.3
// @author      gsonnu
// @description Adds a button to open a bug in the openSUSE bugzilla tracker. Also updates the action item in the Actions dropdown with the same link
// ==/UserScript==

(function() {
    function updateElement(li, btn, proj) {
        btn.title = `${btn.title} (${proj})`;
        li.firstChild.nodeValue = `${proj} ${li.firstChild.nodeValue}`;
    }

    function updateLinks(btn, query, url) {
        btn.href = url.href;

        let link = document.querySelector(`.dropdown-item[href*="https://bugzilla"]${query}`);

        if (!link)
            return;

        console.log(link.href)
        console.log(url.href)

        link.href = url.href;
    }

    let btn = document.querySelector('.btn.btn-sm[href*="https://bugzilla"]');

    if (!btn)
        return;

    // get parent
    let li = btn.parentElement.parentElement;

    // clone it
    let li_new = li.cloneNode(true);
    let btn_new = li_new.querySelector('.btn.btn-sm[href*="https://bugzilla"]');

    // update text and information
    updateElement(li, btn, 'SLE');
    updateElement(li_new, btn_new, 'openSUSE');

    // update url
    let url = new URL(btn_new.href);
    let components = url.searchParams.get('short_desc').split(': ');

    // always use VUL-0
    components[0] = 'VUL-0';

    // fix multiple CVES
    components[1] = [...new Set(components[1].split(','))].join(',');

    url.searchParams.set('short_desc', components.join(': '));

    updateLinks(btn, '[title="Open bug"]', url);

    // openSUSE
    url.searchParams.set('product', 'openSUSE Distribution');
    url.searchParams.set('component', 'Security');
    url.searchParams.set('version', 'Leap 15.4');
    url.searchParams.set('cc', '');
    url.searchParams.set('qa_contact', 'security-team@suse.de');

    li.parentNode.insertBefore(li_new, li.nextSibling);

    updateLinks(btn_new, '[title~="openSUSE"]', url);

})();
