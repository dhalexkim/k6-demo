/*
 * Creator: Firefox 136.0.4
 * Browser: Firefox 136.0.4
 */

import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {}

export default function main() {
  let response

  group('page_1 - http://vbsca.ca/login/login_results.asp', function () {
    response = http.post(
      'http://vbsca.ca/login/login_results.asp',
      {
        txtUsername: 'testme',
        txtPassword: 'plainpassword',
      },
      {
        headers: {
          Host: 'vbsca.ca',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-CA,en-US;q=0.7,en;q=0.3',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/x-www-form-urlencoded',
          Origin: 'http://vbsca.ca',
          Connection: 'keep-alive',
          Referer: 'http://vbsca.ca/login/login.asp',
          Cookie: 'ASPSESSIONIDSSRTQBDC=BLMPIHPDNFFACKGCIFBAIELF',
          'Upgrade-Insecure-Requests': '1',
          Priority: 'u=0, i',
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache',
        },
      }
    )
  })

  // Automatically added sleep
  sleep(1)
}
