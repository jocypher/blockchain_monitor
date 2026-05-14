import { ethers } from "ethers";
import envConstants from "../../../../core/constants/envConstants";
import providers from "../../../../core/providers";

async function estimatePolTransferGas() {
  try {
    const amount = ethers.parseEther("0.001");
    const [feeData, gasUnits] = await Promise.all([
        providers.polygon.getFeeData(),
        providers.polygon.estimateGas({
      to: envConstants.RECEIVER_ADDRESS,
      value: amount,
    })
])
    
  if (!feeData.maxFeePerGas) {
    throw new Error("Could not fetch gas price from Polygon network");
  }

  const totalGasCost = feeData.maxFeePerGas * gasUnits;

  const result = {
    gasUnits: gasUnits.toString(),
    totalCostInPOL: ethers.formatEther(totalGasCost),
  };
  console.log(result)
  } catch (error) {
    console.log("Server Error, couldn't estimate eth gas fees.", error);
    throw new Error("I'm Exhausted of estimating Gas Errors");
  }
}

export default estimatePolTransferGas;
