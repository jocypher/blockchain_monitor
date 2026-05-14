import { ethers, isAddress } from "ethers"
import envConstants from "../../../../core/constants/envConstants"
import providers from "../../../../core/providers"
import { appConstants } from "../../../../core/constants/appConstants"

async function sendPolWithMemo(){
    try{
    const wallet = new ethers.Wallet(envConstants.PRIVATE_KEY, providers.polygon)

    const senderAddress = wallet.address
    const receiverAddress = envConstants.RECEIVER_ADDRESS

    if (!isAddress(senderAddress) && !isAddress(receiverAddress)) {
        throw new Error("Invalid Address Error")
    }


    let [senderBalanceBefore, receiverBalanceBefore] = await Promise.all([
        providers.polygon.getBalance(senderAddress),
        providers.polygon.getBalance(receiverAddress)

    ])

    const formattedSenderBalanceBefore = ethers.formatEther(senderBalanceBefore)
   const formattedReceiverBalanceBefore = ethers.formatEther(receiverBalanceBefore)
    

    const amount = ethers.parseEther("0.001")

    const feeData = await providers.polygon.getFeeData()

    const maxFeePerGas =  feeData.maxFeePerGas
    if(maxFeePerGas == null){
        throw new Error("No Gas fee")
    }

    const gasEstimate = await wallet.estimateGas({
      to: receiverAddress,
      value: amount,
      data: ethers.hexlify(ethers.toUtf8Bytes("This is my memo")),
    });

    const totalFees = gasEstimate * maxFeePerGas

    const totalCost = amount + totalFees

    if(senderBalanceBefore < totalCost){
        throw new Error("Insufficient balance");
    }

    const transaction = await wallet.sendTransaction({
      to: receiverAddress,
      value: amount,
      maxFeePerGas: maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      //data: ethers.hexlify(ethers.toUtf8Bytes("This is my memo")),
    });

    const receipt = await transaction.wait(3)

        if (!receipt) {
          console.log("Transaction is pending");
        }
        const status = receipt?.status;

        const [senderBalanceAfter, receiverBalanceAfter] = await Promise.all([
          providers.ethereum.getBalance(senderAddress),
          providers.ethereum.getBalance(receiverAddress),
        ]);

        const formattedSenderBalanceAfter =
          ethers.formatEther(senderBalanceAfter);

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

    }catch(error){
        console.log("Server error occurred on: ", error)
        throw error
    }
}


export default sendPolWithMemo