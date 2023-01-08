import { addToken, baseUrl, dapp, StarknetChainId, transfer } from "../src";

const STARKNET_TEST_ACCOUNT = "0x12345";
const STARKNET_ETH = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

describe("transfer", () => {
    it("should generate mainnet-ETH transfer URL without amount", function () {
        expect(
            transfer(STARKNET_TEST_ACCOUNT, {
                token: { token_address: STARKNET_ETH, chainId: StarknetChainId.MAINNET },
            })
        ).toEqual(
            `${baseUrl}/transfer/${STARKNET_ETH}@${StarknetChainId.MAINNET}?address=${STARKNET_TEST_ACCOUNT}`
        );
    });

    it("should generate mainnet-ETH transfer URL with amount", function () {
        expect(
            transfer(STARKNET_TEST_ACCOUNT, {
                token: { token_address: STARKNET_ETH, chainId: StarknetChainId.MAINNET },
                amount: 1,
            })
        ).toEqual(
            `${baseUrl}/transfer/${STARKNET_ETH}@${StarknetChainId.MAINNET}?address=${STARKNET_TEST_ACCOUNT}&uint256=1`
        );
    });

    it("should generate mainnet-ERC20 transfer URL without amount", function () {
        expect(
            transfer(STARKNET_TEST_ACCOUNT, {
                token: { token_address: "0xabcdef", chainId: StarknetChainId.MAINNET },
            })
        ).toEqual(
            `${baseUrl}/transfer/0xabcdef@${StarknetChainId.MAINNET}?address=${STARKNET_TEST_ACCOUNT}`
        );
    });

    it("should generate mainnet-ERC20 transfer URL with amount", function () {
        expect(
            transfer(STARKNET_TEST_ACCOUNT, {
                token: { token_address: "0xabcdef", chainId: StarknetChainId.MAINNET },
                amount: 1,
            })
        ).toEqual(
            `${baseUrl}/transfer/0xabcdef@${StarknetChainId.MAINNET}?address=${STARKNET_TEST_ACCOUNT}&uint256=1`
        );
    });

    it("should generate testnet-ETH transfer URL without amount", function () {
        expect(
            transfer(STARKNET_TEST_ACCOUNT, {
                token: { token_address: STARKNET_ETH, chainId: StarknetChainId.GOERLI },
            })
        ).toEqual(
            `${baseUrl}/transfer/${STARKNET_ETH}@${StarknetChainId.GOERLI}?address=${STARKNET_TEST_ACCOUNT}`
        );
    });

    it("should generate mainnet-ETH transfer URL with amount", function () {
        expect(
            transfer(STARKNET_TEST_ACCOUNT, {
                token: { token_address: STARKNET_ETH, chainId: StarknetChainId.MAINNET },
                amount: 1,
            })
        ).toEqual(
            `${baseUrl}/transfer/${STARKNET_ETH}@${StarknetChainId.MAINNET}?address=${STARKNET_TEST_ACCOUNT}&uint256=1`
        );
    });

    it("should generate testnet-ERC20 transfer URL without amount", function () {
        expect(
            transfer(STARKNET_TEST_ACCOUNT, {
                token: { token_address: "0xabcdef", chainId: StarknetChainId.GOERLI },
            })
        ).toEqual(
            `${baseUrl}/transfer/0xabcdef@${StarknetChainId.GOERLI}?address=${STARKNET_TEST_ACCOUNT}`
        );
    });

    it("should generate testnet-ERC20 transfer URL with amount", function () {
        expect(
            transfer(STARKNET_TEST_ACCOUNT, {
                token: { token_address: "0xabcdef", chainId: StarknetChainId.GOERLI },
                amount: 1,
            })
        ).toEqual(
            `${baseUrl}/transfer/0xabcdef@${StarknetChainId.GOERLI}?address=${STARKNET_TEST_ACCOUNT}&uint256=1`
        );
    });
});

describe("dapp", () => {
    it("should generate dapp launch url", function () {
        expect(dapp("https://example.com")).toEqual(`${baseUrl}/dapp/example.com`);
    });

    it("should generate dapp launch url with hash", function () {
        expect(dapp("https://example.com/#/test")).toEqual(
            `${baseUrl}/dapp/example.com/#/test`
        );
    });

    it("should generate dapp launch url with query", function () {
        expect(dapp("https://example.com/#test?q=foo")).toEqual(
            `${baseUrl}/dapp/example.com/#test?q=foo`
        );
    });

    it("should not generate dapp launch url for invalid urls", function () {
        expect(() => dapp("example.com")).toThrow();
        expect(() => dapp("ftp://example.com")).toThrow();
        expect(() => dapp("https://example")).toThrow();
        expect(() => dapp("https://1.1.1.1.1")).toThrow();
    });
});

describe("addToken", () => {
    it("should generate a watchAsset request for mainnet-ERC20", function () {
        expect(
            addToken({ token_address: STARKNET_ETH, chainId: StarknetChainId.MAINNET })
        ).toEqual(
            `${baseUrl}/watchAsset/${STARKNET_ETH}@${StarknetChainId.MAINNET}?type=ERC20`
        );
    });

    it("should generate a watchAsset request for testnet-ERC20", function () {
        expect(
            addToken({ token_address: STARKNET_ETH, chainId: StarknetChainId.GOERLI })
        ).toEqual(
            `${baseUrl}/watchAsset/${STARKNET_ETH}@${StarknetChainId.GOERLI}?type=ERC20`
        );
    });

    it("should generate a watchAsset request for custom chainId custom ERC20", function () {
        // @ts-ignore
        expect(addToken({ token_address: "0xabcdef", chainId: "foo" })).toEqual(
            `${baseUrl}/watchAsset/0xabcdef@foo?type=ERC20`
        );
    });

    it("should throw for invalid options", function () {
        // @ts-expect-error TS2322 we want to test raw js access
        expect(() => addToken({ token_address: null })).toThrow();

        // @ts-expect-error TS2322 we want to test raw js access
        expect(() => addToken({ token_address: "foo" })).toThrow();

        // @ts-expect-error TS2322 we want to test raw js access
        expect(() => addToken({ token_address: "0x0", chainId: null })).toThrow();

        // @ts-expect-error TS2322 we want to test raw js access
        expect(() => addToken({})).toThrow();

        // @ts-expect-error TS2322 we want to test raw js access
        expect(() => addToken()).toThrow();
    });
});
