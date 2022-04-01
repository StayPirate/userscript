// ==UserScript==
// @name        SMASH - Useful links
// @namespace   SUSE SecTools
// @match       https://smash.suse.de/issue/*
// @run-at      document-end
// @grant       none
// @version     1.4.0
// @author      gsonnu
// @description Adds links to the package, package support status page, package changes and spec file & SUSE CVE page in the SMASH issue page
// ==/UserScript==


(function() {

    const smeltUrl = 'https://smelt.suse.de';
    const ibsUrl = 'https://build.suse.de';
    const suseCveUrl = 'https://www.suse.com';

    let swMatrix = document.querySelector('#software-matrix');

    addIbsLinks(swMatrix, ibsUrl);
    addSmeltLinks(swMatrix, smeltUrl);
    addSuseCveLinks(suseCveUrl);

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

    function addIcon(target, classes, title='') {
        let icon = document.createElement('i');

        if (title)
            icon.setAttribute('title', title);

        icon.classList.add(...classes);

        target.appendChild(icon);

        return icon;
    }

    function addButton(url, target, icon, title) {
        let l = addLink(url, '', target, null, null);
        l.setAttribute('style', 'color: unset;');

        addIcon(l, ['fas', icon], title);

        return l;
    }

    function addIbsLinks(matrix, url) {
        if (!matrix)
            return;

        let space = createTextNode(' ');

        for (let elem of matrix.querySelectorAll('tbody')) {
            let row = elem.querySelector('tr.software_row:not(.software_sub-row)');
            let pkg = row.getAttribute('data-package');
            let target = row.querySelector('td:nth-child(3)');
            let proj = target.textContent.trim();

            target.textContent = '';

            let codestream = addLink(`${url}/package/show/${proj}/${pkg}`, proj);
            codestream.setAttribute('style', 'color: unset;');

            target.append(codestream,
                          space,
                          space.cloneNode(),
                          addButton(`${url}/package/view_file/${proj}/${pkg}/${pkg}.changes?expand=1`,
                                    null, 'fa-history', 'Changelog'),
                          space.cloneNode(),
                          addButton(`${url}/package/view_file/${proj}/${pkg}/${pkg}.spec?expand=1`,
                                    null, 'fa-cog', 'SPEC file'),
                          space.cloneNode(),
                         );
        }
    }

    function addSmeltLinks(matrix, url) {
        if (!matrix)
            return;

        for (let elem of matrix.querySelectorAll('thead')) {
            let pkg = elem.querySelector('h4');
            let name = pkg.textContent.trim();

            pkg.textContent = '';

            addLink(`${url}/maintained/?q=${name}`, name, pkg);
        }
    }

    function addSuseCveLinks(url) {
        const cveRegex = /(CVE-[0-9]{4}-[0-9]*):/;

        for (let elem of document.querySelectorAll('.ratings-columns h4')) {
            let cve = elem.textContent.trim().match(cveRegex);

            if ((!cve) || (cve.length != 2))
                continue;

            cve = cve[1];
            elem.textContent = '';

            let l = addLink(`${url}/security/cve/${cve}.html`, cve, elem, null, ':');
            l.setAttribute('style', 'color: unset;');
        }
    }

})();
