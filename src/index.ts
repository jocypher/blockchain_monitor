import express from "express";
import envConstants from "./core/constants/envConstants";
import main from "./api/v0/sendAccount/sendAccount";
import sendSignedTransaction from "./api/v0/sendSignedTransaction/sendSignedTransaction";
import readSmartContract from "./api/v0/readSmartContract/readSmartContract";
import writeSmartContract from "./api/v0/writeSmartContract/writeSmartContract";
import contractEvents from "./api/v0/contractEvent/contract_event";
import getEthBalance from "./api/v1/wallets/balances/getEthBalance";
import getPolBalance from "./api/v1/wallets/balances/getPolBalance";
import getTokenBalance from "./api/v1/wallets/balances/getTokenBalance";
import getAllTokenBalance from "./api/v1/wallets/balances/getTokenBalance";
import getAllTokenSupply from "./api/v1/wallets/balances/getTokenSupply";
import getFullWalletReport from "./api/v1/wallets/reports/getWalletFullReports";
import compareTokenBalances from "./api/v1/wallets/reports/compareTokenBalance";
import multiChainBalanceReport from "./api/v1/wallets/reports/multichainBalanceReport";
import isAddressValid from "./core/validation/isAddressValid";
import getTokenDecimals from "./api/v1/token/info/getTokenDecimals";
import getTokenSymbols from "./api/v1/token/info/getTokenSymbol";
import getBlockInfo from "./api/v1/blocks/reader/getBlockInfo";
import getCurrentBlockNumber from "./api/v1/blocks/reader/getCurrentBlockNumber";
import getTransactionDetails from "./api/v1/blocks/transactions/getTransactionDetails";
import getTransactionStatus from "./api/v1/blocks/transactions/getTransactionStatus";
import getTransactionConfirmations from "./api/v1/blocks/transactions/getTransactionConfirmations";
import sendEth from "./api/v1/transfers/send/sendEth";
import sendPolWithMemo from "./api/v1/transfers/send/sendEthWithMemo";
import sendToken from "./api/v1/transfers/send/sendToken";
import checkAndSendToken from "./api/v1/transfers/send/checkAndSendToken";
import estimateEthTransferGasFees from "./api/v1/transfers/gas/estimateETHTransferGas";
import estimatePolTransferGas from "./api/v1/transfers/gas/estimatePolTransferGas";
import estimateTokenTransferGas from "./api/v1/transfers/gas/estimateTokenTransferGas";
import getCurrentGasPrice from "./api/v1/transfers/gas/getCurrentGasPrice";
import getTokenTransferHistory from "./api/v1/monitors/history/getTokenTransferHistory";
import watchIncomingEth from "./api/v1/monitors/watchChain/watchIncomingEth";
import watchIncomingPol from "./api/v1/monitors/watchChain/watchIncomingPol";

const app = express();
const PORT = envConstants.PORT;

// main()

//sendSignedTransaction()

//  readSmartContract()

//writeSmartContract()

//contractEvents()
// getEthBalance();
// getPolBalance();
// getAllTokenBalance();
// getAllTokenSupply();
// getFullWalletReport();
// compareTokenBalances();
// multiChainBalanceReport();
// isAddressValid();
// getTokenDecimals();
// getTokenSymbols();
// getBlockInfo();
// getCurrentBlockNumber();
// getTransactionDetails();
// getTransactionStatus();
// getTransactionConfirmations()

//sendEth()

//sendPolWithMemo()
//checkAndSendToken()
// estimateEthTransferGasFees()
// estimatePolTransferGas()
//estimateTokenTransferGas()
//getCurrentGasPrice()
//getTokenTransferHistory()
// watchIncomingEth()
watchIncomingPol()

// app.listen(PORT, ()=>{
//     console.log(`Server running on PORT ${PORT}`)
// })
