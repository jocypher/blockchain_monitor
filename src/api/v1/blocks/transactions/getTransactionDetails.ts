import { appConstants } from "../../../../core/constants/appConstants";
import providers from "../../../../core/providers";

async function getTransactionDetails() {
  try {
    const transactions = await providers.ethereum.getTransaction(
      appConstants.RAND_TRX_HASH,
    );

    const transactionCount = await providers.ethereum.getTransactionCount(
      "0x13cb6ae34a13a0977f4d7101ebc24b87bb23f0d5",
    );

    const transactionReceipt = await providers.ethereum.getTransactionReceipt(
      appConstants.RAND_TRX_HASH,
    );
    const transactionDetails = {
      transactions,
      transactionCount,
      transactionReceipt,
    };

    console.log("Transaction Details:\n", transactionDetails);
  } catch (error) {
    console.log("Server error occurred on: ", error);
    throw error;
  }
}

export default getTransactionDetails;
