import { ethers } from "ethers";
import providers from "../../../../core/providers";

async function watchIncomingPol() {
  try {
    providers.polygonWs.on("block", async (blockNumber) => {
      const block = await providers.ethereumWs.getBlock(blockNumber);
      if (!block || !block.transactions) return;

      for (const tx of block.transactions) {
        const fullTx = await providers.ethereumWs.getTransaction(tx);

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
    console.log("Error on server occurred.", error);
    throw new Error("Whadupp with all these errors nigga");
  }
}


export default watchIncomingPol
