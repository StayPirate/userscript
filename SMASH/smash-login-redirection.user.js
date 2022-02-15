// ==UserScript==
// @name        SMASH - login redirection
// @namespace   SUSE SecTools
// @match       https://smash.suse.de/login/
// @run-at      document-end
// @grant       none
// @version     1.1.1
// @author      gsonnu
// @description Redirects login page to actual page - using the next search parameter - if the user is already logged in
// ==/UserScript==

(function() {
    let url = new URL(window.location.href);
    let next = url.searchParams.get('next');
    let userLogged = document.querySelector('#navbarAccount');

    if (!(next && userLogged))
        return;

    url.pathname = next;
    url.searchParams.forEach((v, k) => url.searchParams.delete(k));

    console.log(url.href);
    window.location.replace(url.href);
})()
