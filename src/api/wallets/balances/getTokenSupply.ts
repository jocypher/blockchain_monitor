import { ethers } from "ethers";
import envConstants from "../../../core/constants/envConstants";
import providers from "../../../core/providers";
import { appConstants } from "../../../core/constants/appConstants";

const abi = [
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint256)",
];

async function getAllTokenSupply() {
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

    const [usdcEthSupply, usdcPolSupply] = await Promise.all([
      await usdcEth.totalSupply(),
      await usdcPol.totalSupply(),
    ]);

    const formattedUsdc = ethers.formatUnits(usdcEthSupply, 18);
    const formattedPol = ethers.formatUnits(usdcPolSupply, 18);

    console.log(`USDC-ETH Total Supply: `, formattedUsdc);
    console.log(`USDC-POLTotal Supply: `, formattedPol);
  } catch (error) {
    console.log(`Error occurred: ${error}`);
    throw error;
  }
}

export default getAllTokenSupply;
