# network-informations

[![NPM package version](https://img.shields.io/npm/v/@thadeu/network-informations.svg)](https://www.npmjs.com/package/@thadeu/network-informations)
[![Build Status](https://travis-ci.org/thadeu/network-informations.svg?branch=master)](https://travis-ci.org/thadeu/network-informations)
![Minified size](http://img.badgesize.io/thadeu/network-informations/master/dist/network-informations.min.js.svg?label=min+size)
![Minified+Gzip size](http://img.badgesize.io/thadeu/network-informations/master/dist/network-informations.min.js.svg?compression=gzip&label=min%2Bgzip+size)
![License: MIT](https://img.shields.io/npm/l/@thadeu/network-informations.svg)

Get the client network informations cross-plataform, included network type, local ip address, port number and more

# Instalation
This lib is available as a NPM package. To install it, use the following command:

```bash
npm install @thadeu/network-informations --save
```

If you're using Yarn (and you should):

```bash
yarn add @thadeu/network-informations
```

If you dont use ES6/7/8/x, use unpkg file

[https://unpkg.com/@thadeu/network-informations/dist/network-informations.min.js](https://unpkg.com/@thadeu/network-informations/dist/network-informations.min.js)

## Usage

### localCandidateAttributes

```js
import { withConnectionStats, localCandidateAttributes } from '@thadeu/network-informations'

withConnectionStats(stats => {
  let attributes = localCandidateAttributes(stats.result())
  console.log(attributes)
})
```

it results something as

```json
{
  "candidateType": "host",
  "ipAddress": "192.168.1.3",
  "networkType": "wlan",
  "portNumber": "9",
  "priority": "1518280447",
  "stunKeepaliveRequestsSent": "0",
  "stunKeepaliveResponsesReceived": "0",
  "stunKeepaliveRttSquaredTotal": "0",
  "stunKeepaliveRttTotal": "0",
  "transport": "tcp"
}
```

### allAttributes

```js
import { withConnectionStats, allAttributes } from '@thadeu/network-informations'

withConnectionStats(stats => {
  let attributes = allAttributes(stats.result())
  console.log(attributes)
})
```

it results something as

```json
{
  "candidateType": "host",
  "googActualEncBitrate": "0",
  "googAvailableReceiveBandwidth": "0",
  "googAvailableSendBandwidth": "0",
  "googBucketDelay": "0",
  "googComponent": "1",
  "googDerBase64": "",
  "googFingerprint": "",
  "googFingerprintAlgorithm": "sha-256",
  "googInitiator": "true",
  "googRetransmitBitrate": "0",
  "googTargetEncBitrate": "0",
  "googTransmitBitrate": "0",
  "ipAddress": "192.168.1.3",
  "label": "webrtchacks",
  "localCertificateId": "",
  "networkType": "wlan",
  "portNumber": "9",
  "priority": "1518280447",
  "protocol": "",
  "state": "connecting",
  "stunKeepaliveRequestsSent": "0",
  "stunKeepaliveResponsesReceived": "0",
  "stunKeepaliveRttSquaredTotal": "0",
  "stunKeepaliveRttTotal": "0",
  "transport": "tcp"
}
```

If you have an connection legacy, should be use

```js
import { withConnectionStats, localCandidateAttributes } from '@thadeu/network-informations'

withConnectionStats(stats => {
  let attributes = localCandidateAttributes(stats.result())
  console.log(attributes)
}, myPeerConnectionLegacy)
```

## Do you developer?

**watching tests**

```js
npm run test:watch
```

We going to enjoy!!

# Contributing

Once you've made your great commits (include tests, please):

1. Fork this repository
2. Create a topic branch - `git checkout -b my_branch`
3. Push to your branch - `git push origin my_branch`
4. Create a pull request

That's it!

Please respect the indentation rules and code style. And use 2 spaces, not tabs. And don't touch the version thing or distribution files; this will be made when a new version is going to be released.

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
