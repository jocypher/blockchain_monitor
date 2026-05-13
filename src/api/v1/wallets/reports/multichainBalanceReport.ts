// multiChain balance report
// take different chain and return balance information given the wallet address
// chains: Ethereum, Polygon
// wallet Address: mine
// since this is directly speaking with the chain we do not need an abi

import { ethers } from "ethers";
import envConstants from "../../../../core/constants/envConstants";
import providers from "../../../../core/providers";

async function multiChainBalanceReport() {
  try {
    const address = new ethers.Wallet(
      envConstants.PRIVATE_KEY,
      providers.ethereum,
    ).address;

    const [ethBalance, polBalance] = await Promise.all([
      providers.ethereum.getBalance(address),
      providers.polygon.getBalance(address),
    ]);
    const formattedEthBalance = ethers.formatEther(ethBalance);
    const formattedPolBalance = ethers.formatEther(polBalance);

    if (Number(formattedEthBalance) === 0) {
      console.log("You have no eth in this wallet");
    }
    if (Number(formattedPolBalance) === 0) {
      console.log("You have no eth in this wallet");
    }
    const result = {
      address: address,
      ethBalance: formattedEthBalance,
      polBalance: formattedPolBalance,
    };

    console.log(result);
  } catch (error) {
    console.log(`Server error occurred here:`, error);
    throw error;
  }
}

export default multiChainBalanceReport;
