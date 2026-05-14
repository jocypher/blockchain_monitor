import { ethers } from "ethers";
import envConstants from "../../../../core/constants/envConstants";
import providers from "../../../../core/providers";
import { appConstants } from "../../../../core/constants/appConstants";
import { isAddress } from "ethers";

async function sendEth() {
  try {
    // to send eth you need to first get the receiver address,
    // sign the transaction
    const wallet = new ethers.Wallet(
      envConstants.PRIVATE_KEY,
      providers.ethereum,
    );

    const senderAddress = wallet.address;
    const receiverAddress = envConstants.RECEIVER_ADDRESS;

    if (!isAddress(senderAddress) || !isAddress(receiverAddress)) {
      throw new Error("Invalid addresses provided");
    }

    const [senderBalanceBefore, receiverBalanceBefore] = await Promise.all([
      providers.ethereum.getBalance(senderAddress),
      providers.ethereum.getBalance(receiverAddress),
    ]);

    const formattedSenderBalanceBefore =
      ethers.formatEther(senderBalanceBefore);
    const formattedReceiverBalanceBefore = ethers.formatEther(
      receiverBalanceBefore,
    );

    // Log Balance
    console.log(`Sender balance before: ${formattedSenderBalanceBefore} `);
    console.log(`Receiver balance before: ${formattedReceiverBalanceBefore}`);

    const MIN_BALANCE = ethers.parseUnits("0.0003", "gwei");

    if (senderBalanceBefore < MIN_BALANCE) {
      console.log("Insufficient Balance to make such transactions ");
    }
    const amount = ethers.parseEther("0.00000002");

    const feeData = await providers.ethereum.getFeeData()
    if(feeData.maxFeePerGas == null){
        throw new Error("No Max Fee Per Gas")
    }
    console.log(feeData.maxFeePerGas)
    console.log(Number(formattedSenderBalanceBefore))
    
    if(feeData.maxFeePerGas > ethers.parseEther(formattedSenderBalanceBefore)){
        throw new Error("Insufficient Balance to proceed such transaction")
    }
    const transaction = await wallet.sendTransaction({
      to: receiverAddress,
      value: amount,

      maxFeePerGas: feeData.maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
    });

    const receipt = await transaction.wait(5);

    if (!receipt) {
      console.log("Transaction is pending");
    }
    const status = receipt?.status;

    const [senderBalanceAfter, receiverBalanceAfter] = await Promise.all([
      providers.ethereum.getBalance(senderAddress),
      providers.ethereum.getBalance(receiverAddress),
    ]);

    const formattedSenderBalanceAfter = ethers.formatEther(senderBalanceAfter);

    const formattedReceiverBalanceAfter =
      ethers.formatEther(receiverBalanceAfter);

    const result = {
      senderBalanceBefore: formattedSenderBalanceBefore,
      receiverBalanceBefore: formattedReceiverBalanceBefore,
      status: status != 1 ? "Failed" : "Confirmed",
      receipt: receipt,
      transaction: transaction,
      senderBalanceAfter: formattedSenderBalanceAfter,
      receiverBalanceAfter: formattedReceiverBalanceAfter,
    };

    console.log(result);
  } catch (error) {
    console.log("Server error occurred at: ", error);
    throw error;
  }
}

export default sendEth;
