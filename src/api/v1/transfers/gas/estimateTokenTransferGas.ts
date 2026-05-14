import { ethers } from "ethers"
import providers from "../../../../core/providers"
import envConstants from "../../../../core/constants/envConstants"
import { appConstants } from "../../../../core/constants/appConstants"

const abi = [
    "function transfer(address,uint256) view returns (bool)",
    "function decimals() view returns (uint256)"
]

async function estimateTokenTransferGas(){
    try{
    const wallet = new ethers.Wallet(
        envConstants.PRIVATE_KEY,
        providers.ethereum
    )
    const contract = new ethers.Contract(appConstants.USDC_ON_ETH, abi, wallet)as any
    const decimals = await contract.decimals();
    const amount = ethers.parseUnits("1", decimals);

    const gasUnits = await contract.transfer.estimateGas(
        envConstants.RECEIVER_ADDRESS,
        amount
    )
    const feeData = await providers.ethereum.getFeeData()
    console.log(feeData)

    const totalCost = feeData.maxFeePerGas! * gasUnits

    const result = {
      gasUnits: gasUnits.toString(),
      totalCostETH: ethers.formatEther(totalCost),
    };

    console.log("Token transfer gas estimate:", result);
    return result;
    }catch(error){
        console.log("Server error occurred", error)
    }
}


export default estimateTokenTransferGas