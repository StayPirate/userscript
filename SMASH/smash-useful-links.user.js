// ==UserScript==
// @name        SMASH - Useful links
// @namespace   SUSE SecTools
// @match       https://smash.suse.de/issue/*
// @run-at      document-end
// @grant       none
// @version     1.2.0
// @author      gsonnu
// @description Adds links to the package, package support status page and package changes file in the SMASH issue page
// ==/UserScript==


(function() {

    const smelt_url = 'https://smelt.suse.de';
    const ibs_url = 'https://build.suse.de';

    let sw_matrix = document.querySelector('#software-matrix');

    if (!sw_matrix)
        return;

    add_ibs_links(sw_matrix, ibs_url);
    add_smelt_links(sw_matrix, smelt_url);

    function add_link(url, text, target, space=' ') {
        let link = document.createElement('a');
        let spc = document.createTextNode(space);
        link.setAttribute('href', url);
        link.textContent = text;

        target.appendChild(spc);
        target.appendChild(link);

        return link;
    }

    function add_ibs_links(matrix, url) {
        for (let elem of matrix.querySelectorAll('tbody')) {
            let row = elem.querySelector('tr.software_row:not(.software_sub-row)');
            let pkg = row.getAttribute('data-package');
            let target = row.querySelector('td:nth-child(3)');
            let proj = target.textContent.trim();

            target.textContent = '';

            let l = add_link(`${url}/package/show/${proj}/${pkg}`, proj, target);
            l.setAttribute('style', 'color: unset;');

            add_link(`${url}/package/view_file/${proj}/${pkg}/${pkg}.changes?expand=1`,
                     '(changes)', target);

        }
    }

    function add_smelt_links(matrix, url) {
        for (let elem of matrix.querySelectorAll('thead')) {
            let pkg = elem.querySelector('h4');
            let name = pkg.textContent.trim();

            pkg.textContent = '';

            add_link(`${url}/maintained/?q=${name}`, name, pkg);
        }
    }

})()
