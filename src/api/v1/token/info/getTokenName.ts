import { ethers } from "ethers";
import { appConstants } from "../../../../core/constants/appConstants";
import providers from "../../../../core/providers";

const abi = ["function name() view returns (string)"];

async function getTokenName() {
  try {
    const usdcEthContract = new ethers.Contract(
      appConstants.USDC_ON_ETH,
      abi,
      providers.ethereum,
    ) as any;
    const usdcPolContract = new ethers.Contract(
      appConstants.USDC_ON_POL,
      abi,
      providers.polygon,
    ) as any;

    const [usdcEthTokenName, usdcPolTokenName] = await Promise.all([
      usdcEthContract.name(),
      usdcPolContract.name(),
    ]);

    const res = {
      usdcEth: usdcEthTokenName,
      usdcPol: usdcPolTokenName,
    };
    console.log(res);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
