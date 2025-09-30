import { Connection, clusterApiUrl } from "@solana/web3.js";

export const mainnet = new Connection(process.env.NEXT_PUBLIC_SOLANA_MAINNET || clusterApiUrl("mainnet-beta"));
export const devnet = new Connection(process.env.NEXT_PUBLIC_SOLANA_DEVNET || clusterApiUrl("devnet"));
export const testnet = new Connection(process.env.NEXT_PUBLIC_SOLANA_TESTNET || clusterApiUrl("testnet"));