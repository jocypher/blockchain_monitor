import { ethers } from "ethers"
import providers from "../../../../core/providers"

async function getCurrentGasPrice(){
    try{

    const currentGasPrice = (await providers.ethereum.getFeeData()).gasPrice
    const formattedCurrentGasPrice = ethers.formatEther(currentGasPrice!)
    console.log("Current Gas Price:", formattedCurrentGasPrice)
    }catch(error){
        console.log("Server error occurred: ", error)
        throw new Error("An Error occurred here")
    }
}


export default getCurrentGasPrice