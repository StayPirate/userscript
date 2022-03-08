// ==UserScript==
// @name        SMASH - openSUSE bug actions
// @namespace   SUSE SecTools
// @match       https://smash.suse.de/issue/*
// @run-at      document-end
// @grant       none
// @version     1.2.2
// @author      gsonnu
// @description Adds a button to open a bug in the openSUSE bugzilla tracker. Also updates the action item in the Actions dropdown with the same link
// ==/UserScript==

(function() {
    function updateElement(li, btn, proj) {
        btn.title = `${btn.title} (${proj})`;
        li.firstChild.nodeValue = `${proj} ${li.firstChild.nodeValue}`;
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

    url.searchParams.set('product', 'openSUSE Distribution');
    url.searchParams.set('component', 'Security');
    url.searchParams.set('version', 'Leap 15.4');
    url.searchParams.set('cc', '');
    url.searchParams.set('qa_contact', 'security-team@suse.de');

    btn_new.href = url.href;

    li.parentNode.insertBefore(li_new, li.nextSibling);

    // also edit the existing action item
    let item = document.querySelector('.dropdown-item[href*="https://bugzilla"][title~="openSUSE"]');

    if (!item)
        return;

    console.log(item.href)
    console.log(url.href)

    item.href = url.href;
})();
