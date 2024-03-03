import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

export let options = {
    thresholds: {
        'http_reqs': ['count < 20'],
        'http_req_duration': ['p(95) < 1000'],
        // tag for 200 return request
        'http_req_duration{status:200}': ['p(95) < 1000'],
        // tag for 201 return request
        'http_req_duration{status:201}': ['p(95) < 1000'],
        // custom tag checking
        'http_req_duration{page:order}': ['p(95) < 1000'],
        // custom error
        'http_errors': ['count < 2'],
        // custom error
        'http_errors{page:order}': ['count < 2'],
        // checks 
        'checks': ['rate>=.99'],
        // check filter with page order tag
        'checks{page:order}': ['rate>=.99']
    }
};

// custom metrics defs
let httpErrs = new Counter('http_errors');

export default function () {
    // mock service: https://designer.mocky.io

    // 200 mock endpoint
    const mock01 = 'https://run.mocky.io/v3/9b229fc9-64b5-4823-99b6-c9f1f6834fde';

    // 201 mock endpoint, 2 seconds delay added
    const mock02 = 'https://run.mocky.io/v3/b7de789f-8f91-4825-87c7-a7a5da31c8e0?mocky-delay=2000ms';

    // 404 mock endpoint
    const mock03 = 'https://run.mocky.io/v3/4dcd08da-29cf-4471-bebc-66c69cf2312a'

    // test workflow
    http.get(mock01);

    sleep(1)

    // custom tagging
    let res = http.get(mock02, {
        tags: {
            page: 'order'
        }
    });

    check(res,
        {'res status is 201': (r) => r.status === 201},
        { page: 'order' }
    );

    res = http.get(mock03)
    if (res.error) {
        httpErrs.add(1);
        console.log('error request status: ' + res.status)
    }

    check(res,
        {'res status is 404': (r) => r.status === 404},
        { page: 'order' }
    );
}