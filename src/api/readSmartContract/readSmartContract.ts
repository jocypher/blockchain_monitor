import { ethers } from "ethers";
import envConstants from "../../core/constants/envConstants";
import { appConstants } from "../../core/constants/appConstants";

const provider = new ethers.JsonRpcProvider(envConstants.ALCHEMY_URL);


const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() public view returns (uint8)",
    "function totalSupply() public view returns (uint256)"
] as const;

const contract = new ethers.Contract(
  appConstants.BNB_ON_ETH_ADDRESS,
  ERC20_ABI,
  provider,
) as ethers.Contract & { name: () => Promise<string>, symbol: ()=> Promise<string>, decimals: ()=> Promise<Int32Array> };


async function readSmartContract() {
  const name = await contract.name();
  const symbols = await contract.symbol();
  const decimals = await contract.decimals()

  console.log(`\n Reading from ${appConstants.BNB_ON_ETH_ADDRESS}\n`);
  console.log(`\nName: ${name}`);
  console.log(`\nSymbol: ${symbols}`)
  console.log(`\n Decimals: ${decimals}`);
  
}

export default readSmartContract;
