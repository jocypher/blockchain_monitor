import providers from "../../../../core/providers";

async function getCurrentBlockNumber() {
  try {
    const blockNumber = await providers.ethereum.getBlockNumber();

    console.log("Block Number: ", blockNumber);
  } catch (error) {}
}

export default getCurrentBlockNumber;
