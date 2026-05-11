import { ethers } from "ethers";
import { appConstants } from "../../core/constants/appConstants";
import envConstants from "../../core/constants/envConstants";

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbols() view returns (string)",
  "function decimals() view returns (uint8)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
] as any;

const provider = new ethers.JsonRpcProvider(envConstants.TENDERLY_URL);

const contract = new ethers.Contract(
  appConstants.BNB_ON_ETH_ADDRESS,
  ERC20_ABI,
  provider,
) as any;

async function contractEvents() {
  const block = await provider.getBlockNumber();

  const transferEvents = await contract.queryFilter(
    "Transfer",
    block - 1,
    block,
  );

  console.log(transferEvents.length);

  console.log(transferEvents);
}

export default contractEvents;
