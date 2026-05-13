import { appConstants } from "../../../../core/constants/appConstants";
import providers from "../../../../core/providers";

async function getTransactionConfirmations() {
  try {
    const receipt = await providers.ethereum.getTransactionReceipt(
      appConstants.RAND_TRX_HASH,
    );

    const block = receipt?.blockNumber ?? 0;

    const blockNumber = await providers.ethereum.getBlockNumber();

    const confirmations = blockNumber - block;

    if (confirmations <= Number(appConstants.REQUIRED_CONFIRMATIONS)) {
      console.log(
        `${confirmations}/${appConstants.REQUIRED_CONFIRMATIONS} confirmations`,
      );
    } else {
      console.log(
        "Transaction is Confirmed: ",
        confirmations,
        ". User can be credited",
      );
    }

  } catch (error) {
    console.log("Server error occurred: ", error);
    throw error;
  }
}

export default getTransactionConfirmations;
