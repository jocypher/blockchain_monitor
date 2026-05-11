// setup our url

import { ethers } from "ethers";
import envConstants from "../../core/constants/envConstants";
import { appConstants } from "../../core/constants/appConstants";

const provider = new ethers.JsonRpcProvider(envConstants.TENDERLY_URL);

// write the ERC_20 ABI

const ERC20_ABI = [
  "function decimals() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address, uint256) external returns (bool)",
] as const;

const contract = new ethers.Contract(
  appConstants.BNB_ADDRESS,
  ERC20_ABI,
  provider,
) as any;

async function writeSmartContract() {
  const decimals = await contract.decimals();

  const wallet = new ethers.Wallet(
    envConstants.PRIVATE_KEY as string,
    provider,
  );

  console.log(wallet.address);
  const senderBalanceBefore = await contract.balanceOf(wallet.address);
  const receiverBalanceBefore = await contract.balanceOf(appConstants.RECEIVER);

  console.log(`\nReading from ${appConstants.RECEIVER}\n`);
  console.log(
    `Sender Balance Before: ${ethers.formatUnits(
      senderBalanceBefore,
      decimals,
    )}`,
  );
  console.log(
    `Receiver Balance Before: ${ethers.formatUnits(
      receiverBalanceBefore,
      decimals,
    )}`,
  );

  // working on the transaction section
  const AMOUNT = ethers.parseUnits("1", decimals);

  const transaction = await contract
    .connect(wallet)
    .transfer(appConstants.RECEIVER, AMOUNT);

  await transaction.wait();

  console.log("\n RECEIPT AFTER TRANSACTION:\n",transaction);

  const senderBalanceAfter = await contract.balanceOf(wallet.address);
  const receiverBalanceAfter = await contract.balanceOf(appConstants.RECEIVER);

  console.log(
    `Sender Balance After: ${ethers.formatEther(senderBalanceAfter)}`,
  );
  console.log(
    `Receiver Balance After: ${ethers.formatEther(receiverBalanceAfter)}`,
  );
}

export default writeSmartContract;
