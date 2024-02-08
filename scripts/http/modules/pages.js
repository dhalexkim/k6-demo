import http from 'k6/http';
import { check } from 'k6';

export function mainpage(url) {
    let res = http.get(url);

    // selector, can be used for correlation for perf test script
    const resDescription = res.html().find('p[class=description]');

    check(resDescription, {
        'response contains correct description element': 
        (r) => r.contents().text() === 'Collection of simple web-pages suitable for load testing.'
    });
}

export function contactspage(url) {
    let res = http.get(url);

    const resContacts = res.html().find('h3');

    check(resContacts, {
        'response contains correct header element': 
        (r) => r.contents().text() === 'Contact us'
    });
}