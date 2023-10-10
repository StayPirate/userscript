// ==UserScript==
// @name        Bugzilla - Add security info
// @namespace   SUSE SecTools
// @match       https://bugzilla.suse.com/show_bug.cgi?*
// @match       https://bugzilla.opensuse.org/show_bug.cgi?*
// @run-at      document-end
// @grant       none
// @version     1.0.0
// @author      gsonnu
// @description Adds security-relevant information to Bugzilla bugs: latest CRD specified, SUSE CVSS scores, submissions
// ==/UserScript==


(function() {
    // get CVE and CVSS from whiteboard
    let cves = getCVEs(document.querySelector('#status_whiteboard'));

    // start processing comments
    let submissions = {};
    let crd;

    for (let c of document.querySelectorAll('.bz_comment_head, .bz_first_comment_head')) {
        let text = c.parentNode.querySelector('.bz_comment_text').textContent.trim();

        crd = getCRD(text) || crd;
        getSubmissions(text, submissions);
    }

    let table = document.querySelector('#bz_show_bug_column_2 > table > tbody');

    addSpacer(table);

    if (cves.length > 0)
        addCVEs(table, cves);

    if (crd)
        addCRD(table, crd);

    if (Object.keys(submissions).length > 0)
        addSubmissions(table, submissions);


    // getter and "setter"

    function getCVEs(whiteboard) {
        const cvss_regex = /CVSSv3.1:SUSE:(CVE-[^:]+):(\d+.\d+):[^\s]+/g;

        let cves = [];
        let value;

        if (whiteboard)
            // get whiteboard value
            value = whiteboard['value'];

        if (value) {
            let match;

            while ((match = cvss_regex.exec(value)) !== null) {
                let cve = {cve: null, cvss: 0, severity: null};

                // CVE id
                cve.id = match[1];

                // get score as a float
                cve.cvss = parseFloat(match[2]) || 0;

                // calculate severity
                if (cve.cvss >= 9)
                    cve.severity = 'critical';
                else if (cve.cvss >= 7)
                    cve.severity = 'important';
                else if (cve.cvss >= 4)
                    cve.severity = 'moderate';
                else
                    cve.severity = 'low';

                cves.push(cve);
            }
        }

        return cves;
    }


    function addCVEs(table, cves) {
        let label = 'CVSS Score';
        let cont = document.createElement('div');

        if (cves.length == 1) {
            addRow(table, document.createTextNode(`${cves[0].cvss.toFixed(1)} (${cves[0].severity})`), label);
            return;
        }

        // multiple CVEs
        label += 's';
        cont.appendChild(document.createElement('br'));

        for (let cve of cves.toSorted((a, b) => -(a.cvss - b.cvss))) {
            cont.appendChild(document.createTextNode(`${cve.id}: ${cve.cvss.toFixed(1)} (${cve.severity})`));
            cont.appendChild(document.createElement('br'));
        }

        // remove trailing <br>
        cont.removeChild(cont.lastChild);

        addRow(table, cont, label);
    }


    function getCRD(comment) {
        const crd_regex = /CRD:\s*(.*)/;

        let match = crd_regex.exec(comment);

        // get CRD, if any
        if (match !== null)
            return match[1];
    }


    function addCRD(table, crd) {
        addRow(table, document.createTextNode(crd), 'CRD');
    }


    function getSubmissions(comment, subs) {
        const ignore_products = /Channels/;
        const ignore_packages = /Live-Patch/;
        const rr_regex = /(?<url>https:[^\s]+) (?<product>[^\s]+) \/ (?<package>[^\s]+)/g;
        const id_regex = /(\d+)\/?$/;

        let match;
        // get submissions
        while ((match = rr_regex.exec(comment)) !== null) {
            if ((ignore_products.test(match.groups.product)) || (ignore_packages.test(match.groups.package)))
                continue;

            let key = `${match.groups.product}/${match.groups.package}`;

            if (typeof(subs[key]) === 'undefined')
                subs[key] = [];

            subs[key].push({product: match.groups.product,
                            package: match.groups.package,
                            url: match.groups.url,
                            id: parseInt(id_regex.exec(match.groups.url)[1])});

        }
    }


    function addSubmissions(table, subs) {
        let cont = document.createElement('div');
        cont.appendChild(document.createElement('br'));

        for (let cs of Object.keys(subs).toSorted()) {
            let span = document.createElement('span');
            span.appendChild(document.createTextNode(`${subs[cs][0].product}/${subs[cs][0].package}: `));

            for (let sr of subs[cs].toReversed((a, b) => -(a.id - b.id))) {
                let url = createLink(sr.url, `SR#${sr.id}`);

                span.appendChild(url);
                span.appendChild(document.createTextNode(', '));
            }

            // remove trailing commas
            span.removeChild(span.lastChild);
            cont.appendChild(span);
            cont.appendChild(document.createElement('br'));
        }

        addRow(table, cont, 'Submissions');
    }


    // utilities

    function addSpacer(table) {
        let td = addRow(table);

        td.classList.add('bz_section_spacer');
    }


    function createLink(url, text) {
        let a = document.createElement('a');
        a.setAttribute('href', url);
        a.textContent = text;

        return a;
    }


    function addRow(table, content, label) {
        let row = document.createElement('tr');
        let td = document.createElement('td');

        if (label) {
            let th = document.createElement('th');
            let th_label = document.createElement('label');

            th_label.textContent = `${label}:`;
            th_label.classList.add('field_label');

            th.appendChild(th_label);
            row.appendChild(th);
        }

        if (content)
            td.appendChild(content);

        row.appendChild(td);

        table.appendChild(row);
        return td;
    }

})();
