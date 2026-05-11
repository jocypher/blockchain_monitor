FOLDER          FILE               FUNCTIONS

config/         index.ts           (no functions — just exports constants)

providers/      index.ts           (no functions — just exports providers)

wallet/         balance.ts         1. getETHBalance
                                   5. getTokenBalance
                                   6. getTokenTotalSupply

                report.ts          15. getWalletFullReport
                                   16. compareTokenBalances
                                   34. multiChainBalanceReport

                validation.ts      12. isAddressValid

token/          info.ts            2. getTokenSymbol
                                   3. getTokenDecimals
                                   4. getTokenName

                batch.ts           13. getETHBalanceBatch
                                   14. getTokenBalanceBatch

blocks/         reader.ts          7. getCurrentBlockNumber
                                   8. getBlockInfo

                transactions.ts    9.  getTransactionDetails
                                   10. getTransactionStatus
                                   11. getTransactionConfirmations

transfers/      send.ts            17. sendETH
                                   18. sendToken
                                   19. sendETHWithMemo
                                   20. checkAndSendToken

                gas.ts             21. estimateETHTransferGas
                                   22. estimateTokenTransferGas
                                   23. getCurrentGasPrice
                                   24. calculateTransactionCost
                                   25. sendTokenWithGasLimit

monitor/        watchETH.ts        26. watchIncomingETH

                watchToken.ts      27. watchIncomingToken
                                   30. watchMultipleAddresses

                history.ts         28. getTokenTransferHistory
                                   29. getLastNTransactions

payments/       deposit.ts         31. isDepositConfirmed
                                   35. detectAndCreditDeposit

                withdrawal.ts      32. processWithdrawal

                sweep.ts           33. sweepTokenToHotWallet