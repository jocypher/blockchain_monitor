import {ethers} from "ethers"
import envConstants from "../../core/constants/envConstants"
import { appConstants } from "../../core/constants/appConstants";


async function main(){
    
const provider = new ethers.JsonRpcProvider(
  envConstants.ALCHEMY_URL
);

    const balance = await provider.getBalance(envConstants.RECEIVER_ADDRESS!)
    
    console.log(`\n ETH Balance of ${envConstants.RECEIVER_ADDRESS} --> ${ethers.formatEther(balance)}`)
}

export default main 