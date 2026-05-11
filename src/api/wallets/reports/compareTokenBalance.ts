/**
compareTokenBalances(contractAddress, addressA, addressB)
- Takes a token contract address and two wallet addresses
- Returns which address has more tokens, by how much, and both balances
 * 
 */

import { ethers } from "ethers"
import { appConstants } from "../../../core/constants/appConstants"
import providers from "../../../core/providers"
import envConstants from "../../../core/constants/envConstants"
const abi = [
    "function balanceOf(address) view returns (uint256)"
]
async function compareTokenBalances(){
    try{
        const user1Address = new ethers.Wallet(envConstants.PRIVATE_KEY, providers.ethereum).address

        const user2Address = envConstants.RECEIVER_ADDRESS
        const contract = new ethers.Contract(appConstants.USDC_ON_ETH,abi, providers.ethereum) as any

        const [user1Balance, user2Balance] = await Promise.all([
            contract.balanceOf(user1Address),
            contract.balanceOf(user2Address)
        ])

        const formattedUser1Balance = ethers.formatEther(user1Balance)
        const formattedUser2Balance = ethers.formatEther(user2Balance)

        if(formattedUser1Balance > formattedUser2Balance){
            const result = {
                address: user1Address,
                user1Balance: formattedUser1Balance,
                user2Balance: formattedUser2Balance,
                difference: ethers.formatEther(user1Balance - user2Balance)
            }

            console.log(result)
        }else{
            const result = {
              address: user2Address,
              user1Balance: formattedUser1Balance,
              user2Balance: formattedUser2Balance,
              difference: ethers.formatEther(user2Balance - user1Balance),
            };

            console.log(result);
        }



    }catch(error){
        console.log(`Error failed to compare token balances: ${error}`)
        throw error
    }
}

export default compareTokenBalances