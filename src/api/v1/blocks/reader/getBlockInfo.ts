import providers from "../../../../core/providers";

async function getBlockInfo() {
  try {
    const blockInfo = await providers.ethereum.getBlock("latest");
    const safeBlockInfo = await providers.ethereum.getBlock("safe");

    console.log("Latest Block:\n", blockInfo);
    console.log("Safe block:\n", safeBlockInfo);
  } catch (error) {
    console.log("Server error occurred: ", error);
    throw error;
  }
}

export default getBlockInfo;
