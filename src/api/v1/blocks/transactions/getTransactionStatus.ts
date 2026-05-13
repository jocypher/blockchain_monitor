import { appConstants } from "../../../../core/constants/appConstants";
import providers from "../../../../core/providers";

async function getTransactionStatus() {
  try {
    const receipt = await providers.ethereum.getTransactionReceipt(
      appConstants.RAND_TRX_HASH,
    );

    if (receipt === null) {
      console.log("Transaction Status: Pending");
    }
    const status = receipt?.status == 1 ? "Confirmed" : "Failed";

    console.log("Transaction Status: ", status);
  } catch (error) {
    console.log("Server error occurred on: ", error);
    throw error;
  }
}

export default getTransactionStatus;
