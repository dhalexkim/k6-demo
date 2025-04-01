# K6 demo

## K6 test executions

```sh
> k6 run scripts/http/navtest.js
// debugging
> k6 run --http-debug="full" scripts/http/navtest.js
```

## K6 documentation

- <https://k6.io/docs/>

## Structure

```sh
├── package.json
├── package-lock.json
├── README.md
├── recordings
└── scripts
    ├── data
    ├── http
    │   ├── examples
    │   ├── modules
    │   │   └── pages.js
    │   └── navtest.js
    └── ws
```

## Set K6 intellisense

- reference: <https://k6.io/docs/misc/intellisense/>
- adds K6 intellisense plugin with following commands

```sh
> npm init
> npm install --save-dev @types/k6
```

## Script recordig with HAR from browser with har-to-k6

- get HAR from browser session using DEV tool
- use following command to convert har to k6 js script

```sh
> har-to-k6 scripts/hars/02login.har -o scripts/hars/02login.js
```

- modify and use the generated js to create k6 scripts
