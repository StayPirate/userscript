// ==UserScript==
// @name        SMELT - Autorefresh table
// @namespace   SUSE SecTools
// @match       https://smelt.suse.de/overview/
// @match       https://maintenance.suse.de/overview/
// @run-at      document-idle
// @grant       none
// @version     1.0.0
// @author      crazybyte
// @description Automatically refresh the table content every 10s
// ==/UserScript==

const milliseconds = 10000;

function refresh() {

    let refresh_button = document.querySelector('.tab-pane.active > [title="Reload table"]');

    if (!refresh_button) {
        // Exit the loop if there's no refresh button.
        console.log("Userscript: smelt-auto-refresh-table: Refresh button not found, exit.");
        return;
    }

    refresh_button.click();
    console.log("Userscript: smelt-auto-refresh-table: Delay");

    // Infinite loop with a delay of ${millisecond} between each iteration
    setTimeout(refresh, milliseconds);

}

// Delayed start.
// It makes no sense to refresh the table right after it's loaded for the first time, and
// it also ensure that the refresh button will be successfully loaded once the logic is called.
setTimeout(refresh, milliseconds);
