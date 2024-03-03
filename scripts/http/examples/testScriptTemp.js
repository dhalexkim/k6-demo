// K6 script sample navigates test.k6.io

import { check, sleep, group } from "k6";
import execution from 'k6/execution';
import http from "k6/http";

export let options = {
    vus: 1,
    duration: '1s'
}

// console.log('<<init-stage>>');

// main script section
// export default function(data)
export default function() {
    // console.log('<<main-stage>>');
    // console.log('data');
    // console.log(execution.scenario.iterationInTest);
    const testk6HomeUrl = 'https://test.k6.io/';
    let res = http.get(testk6HomeUrl);
    // console.log(JSON.stringify(res.headers));
    // console.log(JSON.stringify(res.body));
    const resDescription = res.html().find('p[class=description]');
    check(resDescription, {
        'response contains correct description element': 
        (r) => r.contents().text() === 'Collection of simple web-pages suitable for load testing.'
    });

    // check(resBodyHTML, {
    //     'page has correct description': (h) => h.description === 'Collection of simple web-pages suitable for load testing.',
    // });
}

// data setup, api init, etc for setup
export function setup() {
    // sleep(1);
}

// only executed for once
export function teardown(data) {
}