import { ethers } from "ethers"
import { appConstants } from "../../../core/constants/appConstants"

const abi=[
    "function symbol() view returns (string)"
]
async function getTokenSymbols(){
    try{
     const contract =  new ethers.Contract(appConstants.USDC_ON_ETH, abi) as any


     const symbol = await contract.symbol()

     console.log("Token symbol:", symbol)
    }catch(error){
        console.log("Server error occurred on ", error)
        throw error
    }
}



export default getTokenSymbols