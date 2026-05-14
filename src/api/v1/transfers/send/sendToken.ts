import { ethers } from "ethers";
import envConstants from "../../../../core/constants/envConstants";
import providers from "../../../../core/providers";
import { appConstants } from "../../../../core/constants/appConstants";
import { error } from "node:console";

const abi = [
  "function transfer(address, uint256) external returns (bool)",
  "function decimals() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
];
async function sendToken() {
  try {
    const wallet = new ethers.Wallet(
      envConstants.PRIVATE_KEY,
      providers.polygon,
    );
    const contract = new ethers.Contract(
      appConstants.USDC_ON_POL,
      abi,
      wallet,
    ) as any;

    const decimals = await contract.decimals();
    const BALANCE = await contract.balanceOf(wallet.address);
    const AMOUNT = ethers.parseUnits("0.0001", decimals);

    console.log(AMOUNT);

    const senderBalanceBefore = ethers.formatUnits(BALANCE, decimals);
    const receiverBalanceBefore = ethers.formatUnits(
      await contract.balanceOf(envConstants.RECEIVER_ADDRESS),
      decimals,
    );

    if (BALANCE < AMOUNT) {
      console.log("Insufficient funds to send token");
      throw error;
    }

    const tx = await contract.transfer(envConstants.RECEIVER_ADDRESS, AMOUNT);
    console.log(tx);

    const receipt = await tx.wait(3);

    if (receipt?.status === 1) {
      console.log("Transaction is confirmed");
    } else {
      console.log("Transaction isn't confirmed");
    }

    const [senderBalanceAfter, receiverBalanceAfter] = await Promise.all([
        await contract.balanceOf(wallet.address),
        await contract.balanceOf(envConstants.RECEIVER_ADDRESS)
    ])

    const result = {
      senderBalanceBefore,
      receiverBalanceBefore,
      txHash: tx.hash,
      status: receipt.status == 1 ? "Confirmed" : "Failed",
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      senderBalanceAfter: ethers.formatEther(senderBalanceAfter),
      receiverBalanceAfter:ethers.formatEther(receiverBalanceAfter),
    };

    console.log(result);
  } catch (error) {
    console.log("Error occurred at a specific place around the time", error);
    throw error;
  }
}

export default sendToken;
