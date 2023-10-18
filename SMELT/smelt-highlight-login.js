// ==UserScript==
// @name        SMELT - Highlight Login
// @namespace   SUSE SecTools
// @match       https://smelt.suse.de/*
// @match       https://maintenance.suse.de/*
// @run-at      document-idle
// @grant       none
// @version     1.0.0
// @author      crazybyte
// @description Highlight the login button
// ==/UserScript==

let login_button = document.querySelector("a > .fa-sign-in-alt");

if (!login_button) {
    // User already logged in
    console.log("SMELT: smelt-highlight-login: No login form found. Exit.");
    return;
}

login_button.append(" Login Required");
