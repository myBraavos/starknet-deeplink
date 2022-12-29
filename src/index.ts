import type { Token, TransferOptions } from "starknet-url";
import {
    addToken as addTokenUrl,
    dapp as dappUrl,
    parse,
    STARKNET_SCHEMA,
    transfer as transferUrl,
} from "starknet-url";

export const baseUrl = "https://starknet.app.link";

/**
 * Generates a "dapp" deeplink url for the given dapp url
 *
 * @param url valid http(s) url
 */
export const dapp = (url: string): string => {
    const res = dappUrl(url);
    return res.replace(STARKNET_SCHEMA, baseUrl).replace("dapp-", "/dapp/");
};

/**
 * Generates a "transfer" deeplink url for the given token/address
 *
 * @param to_address beneficiary address
 * @param options - `token` to be used for this transfer
 *                  `amount` requested (optional)
 */
export const transfer = (to_address: string, options: TransferOptions): string => {
    const res = transferUrl(to_address, options);
    const parsed = parse(res);

    let url = `${baseUrl}/${parsed.function_name}/${parsed.target_address}@${parsed.chain_id}`;
    if (parsed.parameters) url += res.substring(res.lastIndexOf("?"));

    return url;
};

/**
 * Generates a "watchAsset" deeplink url for adding ("watching") the given token ("asset")
 *
 * @param token `token` to be requested for adding
 */
export const addToken = (token: Token): string => {
    const res = addTokenUrl(token);
    const parsed = parse(res);

    return `${baseUrl}/${parsed.function_name}/${parsed.target_address}@${
        parsed.chain_id
    }${res.substring(res.lastIndexOf("?"))}`;
};
