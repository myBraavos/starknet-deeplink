// noinspection UnnecessaryLocalVariableJS

import type { Token, TransferOptions } from "starknet-url";
import {
    addToken as addTokenUrl,
    ChainId,
    dapp as dappUrl,
    parse,
    STARKNET_SCHEMA,
    StarknetChainId,
    transfer as transferUrl,
} from "starknet-url";

export const baseUrl = "https://starknet.app.link";

/**
 * Generates a "dapp" deeplink url for the given dapp url
 *
 * @param url valid http(s) url
 *
 * @return "dapp" deeplink, i.e. https://starknet.app.link/dapp/example.xyz
 */
export const dapp = (url: string): string => {
    const raw = dappUrl(url);
    const result = raw.replace(STARKNET_SCHEMA, baseUrl).replace("dapp-", "/dapp/");

    return result;
};

/**
 * Generates a "transfer" deeplink url for the given token/address
 *
 * @param to_address beneficiary address
 * @param options - `token` to be used for this transfer
 *                  `amount` requested (optional)
 *
 * @return "transfer" deeplink, i.e. -
 * https://starknet.app.link/transfer/<token_address>@<chain_id>?address=<beneficiary_address>(&uint256=1)
 */
export const transfer = (to_address: string, options: TransferOptions): string => {
    const raw = transferUrl(to_address, options);
    const parsed = parse(raw);

    let result = `${baseUrl}/${parsed.function_name}/${parsed.target_address}@${parsed.chain_id}`;
    if (parsed.parameters) result += raw.substring(raw.lastIndexOf("?"));

    return result;
};

/**
 * Generates a "watchAsset" deeplink url for adding ("watching") the given token ("asset")
 *
 * @param token `token` to be requested for adding
 *
 * @return "addToken" deeplink, i.e. -
 * https://starknet.app.link/watchAsset/<token_address>@<chain_id>?type=ERC20
 */
export const addToken = (token: Token): string => {
    const raw = addTokenUrl(token);
    const parsed = parse(raw);

    const result = `${baseUrl}/${parsed.function_name}/${parsed.target_address}@${
        parsed.chain_id
    }${raw.substring(raw.lastIndexOf("?"))}`;

    return result;
};

export type { Token, TransferOptions };
export { ChainId, StarknetChainId };
