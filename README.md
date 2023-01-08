# starknet-deeplink

StarkNet deeplink generator.\
Securely generate links for payment requests, dApp launching & assets listing (aka "add token").

## Installation

using npm -
```bash
  npm install starknet-deeplink
```
or yarn -

```bash
  yarn add starknet-deeplink
``` 


## Examples

Goerli ETH payment request:

```javascript
import { StarknetChainId, transfer } from 'starknet-deeplink'

const STARKNET_ETH = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

const beneficiaryAddress = "0x123456789abcdef";
const url = transfer(beneficiaryAddress, {
    token: { token_address: STARKNET_ETH, chainId: StarknetChainId.GOERLI },
    amount: 0.02,
});

// "https://starknet.app.link/transfer/0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7@0x534e5f474f45524c49?address=0x123456789abcdef&uint256=2e-2"
```
\
dApp launching request:

```javascript
import { dapp } from 'starknet-deeplink'

const url = dapp("https://example.com");

// "https://starknet.app.link/dapp/example.com"
```
\
Add (list) token request:

```javascript
import { addToken, StarknetChainId } from 'starknet-deeplink'

const url = addToken({
    token_address: "0x123456789abcdef",
    chainId: StarknetChainId.GOERLI,
});

// "https://starknet.app.link/watchAsset/0x123456789abcdef@0x534e5f474f45524c49?type=ERC20"
```

## API Reference

### transfer _(to_address: string, options: TransferOptions)_
Generate a `transfer` StarkNet URL, i.e. for a payment request.
\
returns a URL `string`

| Parameter    | Type              | Description                                                                           |
|:-------------|:------------------|:--------------------------------------------------------------------------------------|
| `to_address` | `string`          | **Required**. beneficiary address                                                     |
| `options`    | `TransferOptions` | **Required**. defines a token to be used, and optionally the amount to be transferred |

### addToken _(token: Token)_
Generate a `watchAsset` StarkNet URL, for watching the given token (asset).
\
returns a URL `string`

| Parameter | Type    | Description                                                         |
|:----------|:--------|:--------------------------------------------------------------------|
| `token`   | `Token` | **Required**. the to be added (listed) by this `watchAsset` request |

### dapp _(url: string)_
Generate a `dapp` StarkNet URL, for launching a dApp by a StarkNet supporting browser client.
\
returns a URL `string`

| Parameter | Type     | Description            |
|:----------|:---------|:-----------------------|
| `url`     | `string` | **Required**. dapp url |

### Types

#### TransferOptions
| Parameter | Type                 | Description                    |
|:----------|:---------------------|:-------------------------------|
| `token`   | `Token`              | **Required**. token to be used |
| `amount`  | `string` or `number` | **Optional**. requested amount |


#### Token
| Parameter       | Type      | Description                            |
|:----------------|:----------|:---------------------------------------|
| `token_address` | `string`  | **Required**. the token address        |
| `chainId`       | `ChainId` | **Required**. token address's chain ID |

#### ChainId
Could be either `StarknetChainId`, `string` or a `number` (hex)

#### StarknetChainId
`enum` of common StarkNet chain IDs, such as -
```
    MAINNET = "0x534e5f4d41494e",
    GOERLI = "0x534e5f474f45524c49",
    GOERLI2 = "0x534e5f474f45524c4932",
```

## License
[MIT](https://choosealicense.com/licenses/mit/)


## Related
[starknet-url](https://www.npmjs.com/package/starknet-url) - StarkNet URL generator
