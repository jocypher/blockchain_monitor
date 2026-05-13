import { ethers } from "ethers";
import envConstants from "../../../core/constants/envConstants";
import providers from "../../../core/providers";

async function main() {
  const balance = await providers.ethereum.getBalance(
    envConstants.RECEIVER_ADDRESS!,
  );

  console.log(
    `\n ETH Balance of ${
      envConstants.RECEIVER_ADDRESS
    } --> ${ethers.formatEther(balance)}`,
  );
}

export default main;
