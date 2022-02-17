// ==UserScript==
// @name        SMASH - Add Bugzilla Summary
// @namespace   SUSE SecTools
// @match       https://smash.suse.de/issue/*
// @run-at      document-end
// @grant       none
// @version     1.0.0
// @author      gsonnu
// @description Add summary for Bugzilla bugs in the Overview tab
// ==/UserScript==

(function () {
    let bugs = document.querySelectorAll('#overview .table a[href*="https://bugzilla.suse.com"]');

    if (bugs.length === 0)
        return;

    let table = bugs[0].parentElement.parentElement.parentElement.parentElement;
    let h = table.querySelector('th');

    let nh = document.createElement('th');
    nh.textContent = 'Summary';
    h.parentElement.insertBefore(nh, h.nextSibling);

    for (let link of bugs) {
        let ref = document.querySelector(`#references a[href*="${link.href}"]`);
        let summary = ref.parentElement.parentElement.parentElement.querySelector('td').textContent.trim();

        let desc = document.createElement('td');
        desc.textContent = summary;
        link.parentElement.parentElement.insertBefore(desc, link.parentElement.nextSibling);
    }
})();
