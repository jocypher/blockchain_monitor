import { ethers } from "ethers";
import providers from "../../../../core/providers";
import { appConstants } from "../../../../core/constants/appConstants";
import { Wallet } from "ethers";
import envConstants from "../../../../core/constants/envConstants";

const abi = [
  "event Transfer(address indexed _from, address indexed _to, uint256 _value)",
];
async function getTokenTransferHistory() {
  try {

    const contract = new ethers.Contract(
      appConstants.USDC_ON_POL,
      abi,
      providers.polygon,
    );
    const block = await providers.polygon.getBlockNumber();

    // const [sentLogs, receivedLogs] = await Promise.all([
    //   contract.queryFilter(
    //     contract.filters.Transfer!(
    //       "0x13CB6AE34A13a0977F4d7101eBc24B87Bb23F0d5",
    //       null,
    //     ),
    //     block-1,
    //     block,
    //   ),
    //   contract.queryFilter(
    //     contract.filters.Transfer!(
    //       null,
    //       "0x13CB6AE34A13a0977F4d7101eBc24B87Bb23F0d5",
    //     ),
    //     block-1,
    //     block,
    //   ),
    // ]);

    // const logs = [...sentLogs, ...receivedLogs];

    const logs = await contract.queryFilter("Transfer", block - 1, block);

    const formatted = logs.map((log) => {
      const eventLog = log as ethers.EventLog;

      return {
        txHash: eventLog.transactionHash,
        block: eventLog.blockNumber,
        from: eventLog.args._from,
        to: eventLog.args._to,
        amount: ethers.formatUnits(eventLog.args._value, 6),
      };
    });

    formatted.sort((a, b) => a.block - b.block);

    console.log(`Found ${formatted.length} transfers:`, formatted);
  } catch (error) {
    console.log("Error occurred:", error);
    throw new Error("");
  }
}

export default getTokenTransferHistory;
