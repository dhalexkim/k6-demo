/*
 * Creator: Firefox 136.0.4
 * Browser: Firefox 136.0.4
 */

import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {}

export default function main() {
  let response

  group('page_4 - https://practicetestautomation.com/logged-in-successfully/', function () {
    response = http.get('https://practicetestautomation.com/logged-in-successfully', {
      headers: {
        Host: 'practicetestautomation.com',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-CA,en-US;q=0.7,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        Connection: 'keep-alive',
        Referer: 'https://practicetestautomation.com/practice-test-login/',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        Priority: 'u=0, i',
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
      },
    })
  })

  // Automatically added sleep
  sleep(1)
}
