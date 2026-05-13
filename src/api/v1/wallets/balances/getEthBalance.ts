import { ethers } from "ethers";
import providers from "../../../../core/providers";
import envConstants from "../../../../core/constants/envConstants";

const address = new ethers.Wallet(envConstants.PRIVATE_KEY, providers.ethereum)
  .address;

async function getEthBalance() {
  try {
    const provider = providers.ethereum;
    const balance = await provider.getBalance(address);
    const formattedEth = ethers.formatEther(balance);

    console.log("ETH Balance:", formattedEth);
  } catch (error) {
    throw error;
  }
}

export default getEthBalance;
