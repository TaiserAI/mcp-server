import { networks} from "./networks.js";

export const getRpcUrl = (networkName: string) => {
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
