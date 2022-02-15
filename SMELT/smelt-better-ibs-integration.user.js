// ==UserScript==
// @name        Smelt - Better IBS integration
// @namespace   SUSE SecTools
// @match       https://smelt.suse.de/incident/*
// @run-at      document-end
// @grant       none
// @version     1.1
// @author      gsonnu
// @description Add links to IBS project (patchinfo and package repository) to the SMELT incident page
// ==/UserScript==

(function() {

    let s = document.querySelector('a.text-dark');
    let l = s.getAttribute('href').split('/');
    let project = l[l.length - 1];
    let site = l[2];

    createPatchinfoLink(project, site);
    createPackagesLink(project, site);

    function createPackagesLink(project, site) {
        for (let csNode of document.querySelectorAll('span[title="Codestream"]')) {
            let csNodeParent = csNode.parentNode;
            let cs = getNodeText(csNodeParent).trim().replaceAll(':', '_');
            let items = csNodeParent.querySelector('ul.list-group');
            csNodeParent.onclick = () => toggleVisibility(items);

            for (let pNode of items.querySelectorAll('span')) {
                let pNodeParent = pNode.parentNode;
                let p = getNodeText(pNodeParent).trim();
                pNode.nextSibling.nodeValue = ' ';
                createLink(p, `https://${site}/package/show/${project}/${p}.${cs}`, pNodeParent);
            }
        }
    }

    function createPatchinfoLink(project, site) {
        let list = document.querySelector('#incident_tablist');

        let listItem = document.createElement('li');
        listItem.classList.add('nav-item');

        let icon = document.createElement('span');
        icon.classList.add('fas', 'fa-band-aid');

        let link = createLink(' Patchinfo', `https://${site}/package/view_file/${project}/patchinfo/_patchinfo`, listItem);
        link.classList.add('nav-link');
        link.insertBefore(icon, link.firstChild);
        list.appendChild(listItem);
    }

    function toggleVisibility(node) {
        let parent = node.parentNode;
        if (node.hasAttribute('style')) {
            node.removeAttribute('style');
            parent.removeChild(parent.lastChild);
        } else {
            node.setAttribute('style', 'display: none;');
            let num = node.querySelectorAll('span').length;
            let textNode = document.createTextNode(` (${num})`);
            parent.appendChild(textNode);
        }
    }

    function getNodeText(node) {
        let s = '';
        for (let n of node.childNodes) {
            if (n.nodeType === 3) // textNode
                s += n.nodeValue;
        }
        return s;
    }

    function createLink(text, url, parent) {
        let e = document.createElement('a');
        e.textContent = text;
        e.setAttribute('href', url);

        if (typeof(parent) !== 'undefined')
            parent.appendChild(e);

        return e;
    }

})();
