import { ethers } from "ethers"
import envConstants from "../../../../core/constants/envConstants"
import providers from "../../../../core/providers"

async function estimateEthTransferGasFees(){
    try{

    const amount = ethers.parseEther("50")
    const feeData = await providers.ethereum.getFeeData()
    const estimateGas = await providers.ethereum.estimateGas({
        to: envConstants.RECEIVER_ADDRESS,
        value: amount
    })

    const totalGasCost = feeData.maxFeePerGas! * estimateGas

    console.log("Gas Estimate is:", ethers.formatEther(totalGasCost));
    }catch(error){
        console.log("Server Error, couldn't estimate eth gas fees.",error)
        throw new Error("I'm Exhausted of estimating Gas Errors")
    }
}


export default estimateEthTransferGasFees