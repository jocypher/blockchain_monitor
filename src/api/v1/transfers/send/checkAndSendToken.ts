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

async function checkAndSendToken() {
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

    const [balance, receiverBalance, decimals] = await Promise.all([
      contract.balanceOf(wallet.address),
      contract.balanceOf(envConstants.RECEIVER_ADDRESS),
      contract.decimals(),
    ]);

    const amount = ethers.parseUnits("0.0001", decimals);

    const [gasEstimate, feeData] = await Promise.all([
      contract.transfer.estimateGas(envConstants.RECEIVER_ADDRESS, amount),
      providers.ethereum.getFeeData(),
    ]);

    const maxFeePerGas = feeData.maxFeePerGas;
    if (maxFeePerGas == null) {
      throw new Error("No Gas fee");
    }

    const senderBalanceBefore = ethers.formatUnits(balance, decimals);
    const receiverBalanceBefore = ethers.formatUnits(receiverBalance, decimals);

    if (balance < amount) {
      throw new Error(
        `Insufficient USDC. Have ${ethers.formatUnits(
          balance,
          decimals,
        )}, need ${ethers.formatUnits(amount, decimals)}`,
      );
    }

    const ethBalance = await providers.polygon.getBalance(wallet.address);
    const gasCost = gasEstimate * maxFeePerGas;

    if (ethBalance < gasCost) {
      throw new Error(
        `Insufficient ETH for gas. Have ${ethers.formatEther(
          ethBalance,
        )}, need ${ethers.formatEther(gasCost)}`,
      );
    }

    const tx = await contract.transfer(envConstants.RECEIVER_ADDRESS, amount);

    const receipt = await tx.wait(3);

    const [senderBalanceAfter, receiverBalanceAfter] = await Promise.all([
      contract.balanceOf(wallet.address),
      contract.balanceOf(envConstants.RECEIVER_ADDRESS),
    ]);

    const result = {
      senderBalanceBefore,
      receiverBalanceBefore,
      txHash: tx.hash,
      status: receipt.status == 1 ? "Confirmed" : "Failed",
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      gasCost,
      senderBalanceAfter: ethers.formatUnits(senderBalanceAfter, decimals),
      receiverBalanceAfter: ethers.formatUnits(receiverBalanceAfter, decimals),
    };

    console.log(result);
  } catch (error) {
    console.log("Error occurred at a specific place around the time", error);
    throw new Error("Insufficient USDC balance");
  }
}

export default checkAndSendToken;
