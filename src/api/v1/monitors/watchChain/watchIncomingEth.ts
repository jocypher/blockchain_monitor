import { ethers } from "ethers";
import { appConstants } from "../../../../core/constants/appConstants";
import providers from "../../../../core/providers";

async function watchIncomingEth() {
  try {
    const watchedAddress = "0xF467EC26cf1911A0Ff87E3A6D36b3aeC915506a9";
    console.log(`Watching for incoming ETH to ${watchedAddress}...`);

    providers.ethereumWs.on("block", async (blockNumber) => {
      const block = await providers.ethereumWs.getBlock(blockNumber, true);

      if (!block || !block.transactions) return;

      for (const tx of block.transactions) {
        const fullTx = await providers.ethereumWs.getTransaction(tx as string);

        if (!fullTx) continue;

        console.log("Outgoing ETH detected!");
        console.log({
          from: fullTx.from,
          to: fullTx.to,
          amount: ethers.formatEther(fullTx.value),
          txHash: fullTx.hash,
          block: blockNumber,
        });
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error("Server couldn't connect to websocket");
  }
}

export default watchIncomingEth;
