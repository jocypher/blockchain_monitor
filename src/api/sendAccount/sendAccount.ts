import {ethers} from "ethers"
import envConstants from "../../core/constants/envConstants"
import { appConstants } from "../../core/constants/appConstants";


async function main(){
    
const provider = new ethers.JsonRpcProvider(
  envConstants.ALCHEMY_URL
);

    const balance = await provider.getBalance(appConstants.ADDRESS)
    
    console.log(`\n ETH Balance of ${appConstants.ADDRESS} --> ${ethers.formatEther(balance)}`)
}

export default main 