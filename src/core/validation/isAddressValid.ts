import { ethers, isAddress } from "ethers";
import envConstants from "../constants/envConstants";
import providers from "../providers";

function isAddressValid() {
  try {
    const address = new ethers.Wallet(
      envConstants.PRIVATE_KEY,
      providers.ethereum,
    ).address;

    if (isAddress(address)) {
      console.log("Address is valid");
    } else {
      console.log("Address is not valid");
    }
  } catch (error) {
    console.log("Server error occurred", error);
    throw error;
  }
}

export default isAddressValid;
