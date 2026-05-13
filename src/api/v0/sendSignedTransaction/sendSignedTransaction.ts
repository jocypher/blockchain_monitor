import dotenv from "dotenv";
import { ethers } from "ethers";
import envConstants from "../../../core/constants/envConstants";

//setup connection
const provider = new ethers.JsonRpcProvider(envConstants.TENDERLY_URL);

async function sendSignedTransaction() {
  //const privateKey = await promptForKey()

  // setup wallet
  const wallet = new ethers.Wallet(
    envConstants.PRIVATE_KEY as string,
    provider,
  );

  // Get Balance
  console.log(wallet.address);
  const senderBalanceBefore = await provider.getBalance(wallet.address);
  const receiverBalanceBefore = await provider.getBalance(
    envConstants.RECEIVER_ADDRESS,
  );

  // Log Balance
  console.log(
    `Sender balance before: ${ethers.formatEther(senderBalanceBefore)} `,
  );
  console.log(
    `Receiver balance before: ${ethers.formatUnits(receiverBalanceBefore)}`,
  );

  // Create Transaction
  const transaction = await wallet.sendTransaction({
    to: envConstants.RECEIVER_ADDRESS,
    value: ethers.parseUnits("2", 18),
  });

  // wait for the transaction
  const receipt = await transaction.wait();

  console.log(transaction);
  console.log(receipt);

  //Get balances After
  const senderBalanceAfter = await provider.getBalance(wallet.address);
  const receiverBalanceAfter = await provider.getBalance(
    envConstants.RECEIVER_ADDRESS!,
  );

  // Log Balances
  console.log(
    `\n Sender Balance After: ${ethers.formatUnits(senderBalanceAfter, 18)}`,
  );

  console.log(
    `\n Receiver Balance After: ${ethers.formatUnits(
      receiverBalanceAfter,
      18,
    )}`,
  );
}

export default sendSignedTransaction;
