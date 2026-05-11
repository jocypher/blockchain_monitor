// for token we are reading a smart contract on a specific chain
// for tokens we have usdt on eth and usdt on pol

import { ethers } from "ethers";
import envConstants from "../../../core/constants/envConstants";
import providers from "../../../core/providers";
import { appConstants } from "../../../core/constants/appConstants";

const abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const address = new ethers.Wallet(envConstants.PRIVATE_KEY, providers.ethereum)
  .address;

async function getAllTokenBalance() {
  try {
    const usdcEth = new ethers.Contract(
      appConstants.USDC_ON_ETH,
      abi,
      providers.ethereum,
    ) as any;

    const usdcPol = new ethers.Contract(
      appConstants.USDC_ON_POL,
      abi,
      providers.polygon,
    ) as any;

    const [usdcEthDec, usdcPolDec, usdcEthBalance, usdcPolBalance] =
      await Promise.all([
        usdcEth.decimals(),
        usdcPol.decimals(),
        usdcEth.balanceOf(address),
        usdcPol.balanceOf(address),
      ]);

    const ethFormatted = ethers.formatUnits(usdcEthBalance, usdcEthDec);
    const polFormatted = ethers.formatUnits(usdcPolBalance, usdcPolDec);

    console.log(`USDC ON ETH: ${ethFormatted}`);
    console.log(`USDC ON POL: ${polFormatted}`);
  } catch (error) {
    console.error("Failed to get token balances:", error);
    throw error;
  }
}

export default getAllTokenBalance;
