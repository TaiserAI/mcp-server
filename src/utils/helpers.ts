import { networks } from "./networks.js";

export const getRpcUrlByName = (networkName: string) => {
    const normalizedInput = networkName.trim().toLowerCase();

    for (const key in networks) {
        const network = networks[key as keyof typeof networks];
        const normalizedNetworkName = (network.name || "").trim().toLowerCase();

        if (normalizedNetworkName === normalizedInput) {
            return network.rpcUrls?.[0] || null;
        }
    }

    return null;
}

export const getChainIDByNetwork = (networkName: string) => {
    const normalizedInput = networkName.trim().toLowerCase();

    for (const key in networks) {
        const network = networks[key as keyof typeof networks];
        const normalizedNetworkName = (network.name || "").trim().toString();

        if (normalizedNetworkName === normalizedInput) {
            return network.chainId || null;
        }
    }

    return null;
}