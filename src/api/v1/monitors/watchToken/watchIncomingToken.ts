import { ethers } from "ethers";
import { appConstants } from "../../../../core/constants/appConstants";
import providers from "../../../../core/providers";
import envConstants from "../../../../core/constants/envConstants";

const abi = [
  "event Transfer(address indexed _from, address indexed _to, uint256 _value)",
];

async function watchIncomingToken() {

  const contract = new ethers.Contract(
    appConstants.USDC_ON_ETH,
    abi,
    providers.ethereumWs, 
  )as any;

  const filter = contract.filters.Transfer(null, envConstants.RECEIVER_ADDRESS);

  console.log(`Watching for incoming USDC to ${envConstants.RECEIVER_ADDRESS}...`);

  contract.on(filter, (from: any, to: any, amount: ethers.BigNumberish, event: { log: { transactionHash: any; blockNumber: any; }; }) => {
    const formatted = ethers.formatUnits(amount, 6);

    console.log("Incoming transfer detected!");
    console.log({
      from,
      to,
      amount: formatted,
      txHash: event.log.transactionHash,
      block: event.log.blockNumber,
    });

  
  });
}

export default watchIncomingToken;
