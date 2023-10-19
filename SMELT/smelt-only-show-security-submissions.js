// ==UserScript==
// @name        SMELT - Hide non-security items
// @namespace   SUSE SecTools
// @match       https://smelt.suse.de/overview/
// @match       https://maintenance.suse.de/overview/
// @run-at      document-idle
// @grant       none
// @version     1.1.0
// @author      crazybyte
// @description Automatically hide non-security items in SMELT
// ==/UserScript==

(function () {

    // In order to filter out all the non-security items the script simply select the
    // Security category via a simulated mouse click.

    // With the term "tab" the following tabs in SMELT are intended:
    // Submissions->Ready, Submissions->Under Review, Submissions->Declined, Stopped->All,
    // Stopped->Attention Required, Staging, Testing, Tested->Ready, Tested->Declined,
    // Released, Planned, Others->Under Review, Others->Accepted, Others->Declined, Announced

    const category = "security";
    let previous_tab;

    function get_category_form() {
        // The category we want to filter is defined in the variable ${category}, but we need to work with the category ID.
        // Since the ID may change over time, this function finds and returns it.
        let category_form = document.querySelector(`.form-check-label > span[data-original-title="${category}"]`);
        if (!category_form) {
            console.log(`Userscript: smelt-only-show-security-submissions: Cannot find the ${category} category.`);
        }
        return document.getElementById(`${category_form.parentElement.getAttribute("for")}`);
    }

    function switch_to_security_category() {
        let current_tab = document.querySelector('.tab-pane.active').getAttribute('id');

        if (previous_tab === current_tab) {
            // The tab is not changed but the content of the table is (observer), that means the user manually changed the category.
            // Hence, do nothing.
            return;
        }

        // Filter out non-security items
        let category_form = get_category_form();
        if (category_form) {
            category_form.click();
            previous_tab = current_tab;
            console.log(`Userscript: smelt-only-show-security-submissions: Category changed to ${category}.`);
        }
    }

    // Monitor the table section to understand when rows are succesfully loaded
    let table_observer = new MutationObserver(switch_to_security_category);
    table_observer.observe(document.querySelector('#overview_tabcontent'), {
        childList: true,
        subtree: true
    });

})();
