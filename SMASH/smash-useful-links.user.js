// ==UserScript==
// @name        SMASH - Useful links
// @namespace   SUSE SecTools
// @match       https://smash.suse.de/issue/*
// @run-at      document-end
// @grant       none
// @version     1.5.0
// @author      gsonnu
// @description Adds links to the package, package support status page, package changes and spec file & SUSE CVE page in the SMASH issue page
// ==/UserScript==


(function() {

    const smeltUrl = 'https://smelt.suse.de';
    const ibsUrl = 'https://build.suse.de';
    const suseCveUrl = 'https://www.suse.com';

    let swList = null;

    execute();

    function execute() {
        if (!swList) {
            swList = document.querySelector('#software-list');
        }

        if (!swList || swList.querySelector('.placeholder-glow')) {
            setTimeout(execute, 300);
        } else {
            editSoftwareList(swList);
            addSuseCveLinks(suseCveUrl);
        }
    }

    function createAnchor(url, text) {
        let link = document.createElement('a');
        link.setAttribute('href', url);
        link.textContent = text;

        return link;
    }

    function createTextNode(text) {
        if (typeof(text) === 'undefined' || text === null)
            return null;

        return document.createTextNode(text);
    }

    function addLink(url, text, target, prefix=' ', suffix=null) {
        let link = createAnchor(url, text);
        let pre = createTextNode(prefix);
        let suf = createTextNode(suffix);

        if (target) {
            if (pre)
                target.appendChild(pre);

            target.appendChild(link);

            if (suf)
                target.appendChild(suf);
        }

        return link;

    }

    function addIcon(target, classes, iconId, title='') {
        let icon = document.createElement('i');

        if (title)
            icon.setAttribute('title', title);

        icon.classList.add(...classes);
        icon.textContent = iconId;

        target.appendChild(icon);

        return icon;
    }

    function addButton(url, target, icon, title) {
        let l = addLink(url, '', target, null, null);
        l.setAttribute('style', 'color: unset;');

        addIcon(l, ['eos-icons', 'me-2'], icon, title);

        return l;
    }

    function addSMELTlink(pkg, name, url) {
        pkg.textContent = '';

        addLink(`${url}/maintained/?q=${name}`, name, pkg);
    }

    function addIBSlink(elem, pkg, url, space) {
        elem = elem.parentElement.parentElement;

        for (let e of elem.querySelectorAll('i[title="Codestream"]')) {
            let parent = e.parentNode;
            let proj = e.nextSibling.textContent.trim();

            let link = addLink(`${url}/package/show/${proj}/${pkg}`, proj);
            link.setAttribute('style', 'color: unset;');

            parent.removeChild(e.nextSibling);

            parent.append(link,
                          space,
                          space.cloneNode(),
                          addButton(`${url}/package/view_file/${proj}/${pkg}/${pkg}.changes?expand=1`,
                                    null, 'history', 'Changelog'),
                          space.cloneNode(),
                          addButton(`${url}/package/view_file/${proj}/${pkg}/${pkg}.spec?expand=1`,
                                    null, 'build', 'SPEC file'),
                          space.cloneNode(),
                         );

        }
    }

    function editSoftwareList(list) {
        if (!list)
            return;

        let space = createTextNode(' ');

        for (let pkg of list.querySelectorAll('h3[id*="issue-software"]')) {
            let name = pkg.textContent.trim();

            addSMELTlink(pkg, name, smeltUrl);
            addIBSlink(pkg, name, ibsUrl, space);

        }
    }

    function addSuseCveLinks(url) {
        for (let elem of document.querySelectorAll('button[id*="issue-rating-"]')) {
            let cve = elem.textContent.trim()

            console.log(elem,cve, elem.textContent.trim());

            if (!cve)
                continue;

            elem.textContent = '';

            let l = addLink(`${url}/security/cve/${cve}.html`, cve, elem);
            l.setAttribute('style', 'color: unset;');
        }
    }

})();
