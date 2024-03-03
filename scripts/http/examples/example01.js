import http from 'k6/http';
import { check, sleep } from 'k6';
import execution from 'k6/execution';
import { Counter, Trend } from 'k6/metrics'; // adding new custome metric types

export let options = {
  // vus: 10,
  duration: '10s',
  
  // checkpoint examples, making sure requirements are met
  // such as SLO
  thresholds: {
    'http_req_duration': ['p(95) < 100'],
    'http_req_duration': ['max < 40'],
    'http_req_failed': ['rate < 0.01'], //less than 1%
    'http_reqs': ['count > 20'],
    'http_reqs': ['rate > 4'],
    'http_reqs{status:200}': ['rate > 4'],
    'http_reqs{status:404}': ['rate > 4'],
    'vus': ['value > 9'],
    'checks': ['rate >= 98'],
    'my_counter': ['count > 10'],
    'response_time_news_page': ['p(95) < 60']
  }
}

// custom metric examples
let myCounter = new Counter('my_counter');
let newsPageResponseTrend = new Trend('response_time_news_page');


export default function () {
  // assigning one of iteration to hit different endpoint
  let res = http.get('https://test.k6.io/' + (execution.scenario.iterationInTest === 7 ? 'foo': ''));
  
  // displays unique number assigned to each iteration in the test
  console.log(execution.scenario.iterationInTest)
  
  // updating custom metric, myCounter
  myCounter.add(1)

  // response validation examples
  check(res, {
    'response status is 200': (r) => r.status === 200,
    'page contains expected message': (r) => r.body.includes('Collection of simple web-pages suitable for load testing.')
  });
  
  sleep(1);
  
  res = http.get('https://test.k6.io/news.php');

  // updating custom metric, newsPageResponse
  newsPageResponseTrend.add(res.timings.duration);
  
  sleep(1);
}