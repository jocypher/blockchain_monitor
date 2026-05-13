import { ethers } from "ethers";
import providers from "../../../../core/providers";
import envConstants from "../../../../core/constants/envConstants";

const address = new ethers.Wallet(envConstants.PRIVATE_KEY, providers.ethereum)
  .address;
async function getPolBalance() {
  try {
    const provider = providers.polygon;

    const balance = await provider.getBalance(address);
    const formattedPol = ethers.formatEther(balance);
    console.log("POL BALANCE:", formattedPol);
  } catch (error) {
    console.log("Error occurred on server ", error);
    throw error;
  }
}

export default getPolBalance;
