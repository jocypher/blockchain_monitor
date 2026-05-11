import express from "express";
import envConstants from "./core/constants/envConstants";
import main from "./api/sendAccount/sendAccount";
import sendSignedTransaction from "./api/sendSignedTransaction/sendSignedTransaction";
import readSmartContract from "./api/readSmartContract/readSmartContract";
import writeSmartContract from "./api/writeSmartContract/writeSmartContract";
import contractEvents from "./api/contractEvent/contract_event";
import getEthBalance from "./api/wallets/balances/getEthBalance";
import getPolBalance from "./api/wallets/balances/getPolBalance";
import getTokenBalance from "./api/wallets/balances/getTokenBalance";
import getAllTokenBalance from "./api/wallets/balances/getTokenBalance";
import getAllTokenSupply from "./api/wallets/balances/getTokenSupply";
import getFullWalletReport from "./api/wallets/reports/getWalletFullReports";
import compareTokenBalances from "./api/wallets/reports/compareTokenBalance";

const app = express();
const PORT = envConstants.PORT;

// main()

//sendSignedTransaction()

//  readSmartContract()

//writeSmartContract()

//contractEvents()
getEthBalance();
getPolBalance();
getAllTokenBalance();
getAllTokenSupply();
getFullWalletReport()
compareTokenBalances()


// app.listen(PORT, ()=>{
//     console.log(`Server running on PORT ${PORT}`)
// })
