// K6 script sample navigates test.k6.io

import { group } from "k6";
import { mainpage, contactspage } from './modules/pages.js';
import { d3 } from "d3";

export let options = {
    vus: 1
}

// main script section
export default function() {
    const testK6HomeUrl = 'https://test.k6.io';
    const testK6ContactsUrl = testK6HomeUrl+"/contacts.php";

    d3.csv("../data/AuthorUsers-250_nw.csv")
    .get(function(data) {
        console.log(data);
    });

    // Group: Main page
    group('Main page',  function () {
        mainpage(testK6HomeUrl);
    });

    // Group: Main page
    group('Contacts page',  function () {
        contactspage(testK6ContactsUrl);
    });
}

// data setup, api init, etc for setup
export function setup() {
    // sleep(1);
}

// only executed for once
export function teardown(data) {
}