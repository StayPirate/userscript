// ==UserScript==
// @name        Bugzilla - Hide bots comments
// @namespace   SUSE SecTools
// @match       https://bugzilla.suse.com/show_bug.cgi?*
// @match       https://bugzilla.opensuse.org/show_bug.cgi?*
// @run-at      document-end
// @grant       none
// @version     1.2.5
// @author      gsonnu
// @description Hides bots comment in bugzilla by default. Also add links to quickly collapse or expand them as needed
// ==/UserScript==

(function() {
    const bots = {'bwiedemann+obsbugzillabot@suse.com': '',
                  'swamp@suse.de': '',
                  'smash_bz@suse.de': '',
                  'maint-coord+maintenance_robot@suse.de': '',
                  'openqa-review@suse.de': '',
                  'bwiedemann@suse.com': 'This is an autogenerated message',
                  'okurz@suse.com': 'This is an autogenerated message',
                  'autobugz': ''};
    let botsComments = [];

    for (let c of document.querySelectorAll('.bz_comment_head')) {
        let user = c.querySelector('.bz_comment_user a.email')['href'].replace('mailto:', '');
        let text = bots[user];
        let ctext = c.parentNode.querySelector('.bz_comment_text').textContent.trim()

        if ((typeof(text) !== 'undefined') && ((text === '') || ctext.startsWith(text)))
            botsComments.push(c);
    }

    let actionList = document.querySelector('.bz_collapse_expand_comments');

    addListItem(actionList, 'Collapse All Bot Comments', hideAllBots);
    addListItem(actionList, 'Expand All Bot Comments', showAllBots);

    hideAllBots();

    function addListItem(parent, text, func) {
        let li = document.createElement('li');
        let a = document.createElement('a');

        a.setAttribute('href', '#');
        a.textContent = text;
        a.onclick = (e) => func()

        li.appendChild(a);
        parent.appendChild(li);
    }

    function hideAllBots() {
        botsComments.map((c) => {
            let action = c.querySelector('.bz_comment_actions a.bz_collapse_comment');
            action.textContent = action.textContent.replace('???', '+');
            c.parentElement.querySelector('.bz_comment_text').classList.add('collapsed');
        });

        return false;
    }

    function showAllBots() {
        botsComments.map((c) => {
            let action = c.querySelector('.bz_comment_actions a.bz_collapse_comment');
            action.textContent = action.textContent.replace('+', '???');
            c.parentElement.querySelector('.bz_comment_text').classList.remove('collapsed');
        });

        return false;
    }

})();
