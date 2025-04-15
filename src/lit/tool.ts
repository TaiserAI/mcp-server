import { ethers } from 'ethers';
import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import {
    createSiweMessageWithRecaps,
    generateAuthSig,
    LitActionResource,
} from "@lit-protocol/auth-helpers";
import { LIT_ABILITY } from "@lit-protocol/constants";

import dotenv from "dotenv";
dotenv.config();

export const executeTool = async ({
    ipfsId,
    toolParams,
}: {
    ipfsId: string;
    toolParams: any;
}) => {
    const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({ litNetwork: "datil-dev" });
    await litNodeClient.connect();
    const ethersSigner = new ethers.Wallet(process.env.ETH_CREDITS_NFT_PRIVATE_KEY!);

    const sessionSigs = await litNodeClient.getSessionSigs({
        chain: "ethereum",
        expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
        resourceAbilityRequests: [
            {
                resource: new LitActionResource("*"),
                ability: LIT_ABILITY.LitActionExecution,
            },
        ],
        authNeededCallback: async ({
            resourceAbilityRequests,
            expiration,
            uri,
        }) => {
            const toSign = await createSiweMessageWithRecaps({
                uri: uri!,
                expiration: expiration!,
                resources: resourceAbilityRequests!,
                walletAddress: ethersSigner.address,
                nonce: await litNodeClient.getLatestBlockhash(),
                litNodeClient,
            });

            return await generateAuthSig({
                signer: ethersSigner,
                toSign,
            });
        },
    });

    return litNodeClient.executeJs({
        sessionSigs,
        ipfsId: ipfsId,
        ipfsOptions: {
            gatewayUrl: "https://aquamarine-sunny-rhinoceros-949.mypinata.cloud/ipfs/",
        },
        jsParams: {
            params: { ...toolParams }
        },
    });
};
