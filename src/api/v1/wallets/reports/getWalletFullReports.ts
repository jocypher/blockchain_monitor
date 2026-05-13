/**
getWalletFullReport(walletAddress)
- Takes a wallet address
- Returns ETH balance, USDC balance, current block number, and whether the address has ever had any transactions
- Hint: check nonce — if nonce is 0 the address has never sent a transaction
 */

import { ethers } from "ethers";
import envConstants from "../../../../core/constants/envConstants";
import providers from "../../../../core/providers";
import { appConstants } from "../../../../core/constants/appConstants";

const address = new ethers.Wallet(envConstants.PRIVATE_KEY, providers.ethereum)
  .address;

const abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint256)",
];

async function getFullWalletReport() {
  try {
    const contract = new ethers.Contract(
      appConstants.USDC_ON_ETH,
      abi,
      providers.ethereum,
    ) as any;

    const [ethBalance, usdcEth, blockNumber, nonce, decimals] =
      await Promise.all([
        providers.ethereum.getBalance(address),

        contract.balanceOf(address),

        providers.ethereum.getBlockNumber(),

        providers.ethereum.getTransactionCount(address),

        contract.decimals(),
      ]);

    const hasTransacted = nonce > 0;

    const formattedEthBalance = ethers.formatEther(ethBalance);
    const formattedUsdcBalance = ethers.formatUnits(usdcEth, decimals);

    const report = {
      address,
      ethBalance: formattedEthBalance,
      usdcBalance: formattedUsdcBalance,
      blockNumber: blockNumber,
      nonce: nonce,
      hasTransacted: hasTransacted,
    };
    console.log(report);
  } catch (error) {
    console.error("Failed to get wallet report:", error);
    throw error;
  }
}

export default getFullWalletReport;
