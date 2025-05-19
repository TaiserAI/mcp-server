import { networks } from "./networks.js";

const normalize = (str: string) => str.trim().toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ');
const findNetwork = (networkName: string) => {
    const normalizedInput = normalize(networkName);
    let exactMatch: keyof typeof networks | null = null;
    let partialMatches: { key: keyof typeof networks, diff: number }[] = [];

    for (const key in networks) {
        const network = networks[key as keyof typeof networks];
        const normalizedKey = normalize(key);
        const normalizedNetworkName = normalize(network.name || "");

        if (normalizedInput === normalizedKey || normalizedInput === normalizedNetworkName) {
            exactMatch = key as keyof typeof networks;
            break;
        }
        // Partial match: input in key/name or key/name in input
        if (
            normalizedKey.includes(normalizedInput) ||
            normalizedNetworkName.includes(normalizedInput) ||
            normalizedInput.includes(normalizedKey) ||
            normalizedInput.includes(normalizedNetworkName)
        ) {
            // diff: how close the match is (smaller is better)
            const diff = Math.abs(normalizedKey.length - normalizedInput.length) + Math.abs(normalizedNetworkName.length - normalizedInput.length);
            partialMatches.push({ key: key as keyof typeof networks, diff });
        }
    }

    if (exactMatch) return networks[exactMatch];

    if (partialMatches.length > 0) {
        // Pick the closest match by diff
        partialMatches.sort((a, b) => a.diff - b.diff);
        return networks[partialMatches[0].key];
    }

    return null;
}

export const getRpcUrlByName = (networkName: string) => {
    const finded = findNetwork(networkName);
    if(finded) return finded.rpcUrls[0];
    return null;
}

export const getChainIDByNetwork = (networkName: string) => {
    const finded = findNetwork(networkName);
    if(finded) return finded.chainId;
    return null;
}