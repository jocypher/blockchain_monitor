import { ethers } from "ethers"
import { appConstants } from "../../../core/constants/appConstants"
import providers from "../../../core/providers"

const abi = [
    "function decimals() view returns (uint256)"
]
async function getTokenDecimals(){
    try{
    
    const usdcEthContract = new ethers.Contract(appConstants.USDC_ON_ETH, abi, providers.ethereum) as any
    const usdcPolContract = new ethers.Contract(appConstants.USDC_ON_POL, abi, providers.polygon) as any

    const [usdcEthDec, usdcPolDec] = await Promise.all([
        usdcEthContract.decimals(),
        usdcPolContract.decimals()
    ])
    
    const result = {
        usdcEthDecimals: usdcEthDec,
        usdcPolDecimals: usdcPolDec
    }
    console.log(result)
    }catch(error){
        console.log("Error occurred on the server")
        throw error
    }
}


export default getTokenDecimals