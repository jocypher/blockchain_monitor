import express from "express"
import envConstants from "./core/constants/envConstants"
import main from "./api/sendAccount/sendAccount"
import sendSignedTransaction from "./api/sendSignedTransaction/sendSignedTransaction"
import readSmartContract from "./api/readSmartContract/readSmartContract"
import writeSmartContract from "./api/writeSmartContract/writeSmartContract"
import contractEvents from "./api/contractEvent/contract_event"


const app = express()
const PORT = envConstants.PORT 


// main()

//sendSignedTransaction()


//  readSmartContract()

//writeSmartContract()

contractEvents()

// app.listen(PORT, ()=>{
//     console.log(`Server running on PORT ${PORT}`)
// })