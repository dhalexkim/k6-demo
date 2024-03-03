import http from 'k6/http';
import { check, sleep, group } from 'k6';

export let options = {
    thresholds: {
        'http_req_duration': ['p(95) < 250'],
        'http_req_duration{expected_response:true}': ['p(95) < 250'],
        'group_duration{group:::Main page}': ['p(95) < 3000'],
        'group_duration{group:::Main page::Assets}': ['p(95) < 300']
    }
}

export default function () {

    // Group: Main page
    group('Main page',  function () {
        let res = http.get('https://run.mocky.io/v3/9b229fc9-64b5-4823-99b6-c9f1f6834fde?mocky-delay=900ms');
        check(res, { 'status is 200': (r) => r.status === 200 });
        // nested group
        group('Assets', function () {
            http.get('https://run.mocky.io/v3/9b229fc9-64b5-4823-99b6-c9f1f6834fde?mocky-delay=900ms');
            http.get('https://run.mocky.io/v3/9b229fc9-64b5-4823-99b6-c9f1f6834fde?mocky-delay=900ms');
        });
    })

    // Group: News page
    group('News page',  function () {
        http.get('https://run.mocky.io/v3/9c2fd369-e719-4ee0-90d0-ffd889e2c8b5');
    })

    sleep(1);
}
