import dotenv from "dotenv";
import { ethers } from "ethers";
import providers from "../providers";
dotenv.config();

const envConstants = {
  PORT: process.env.PORT || 3000,
  ALCHEMY_URL: {
    ETH: `${process.env.ALCHEMY_ETH_URL}/${process.env.ALCHEMY_API_KEY}`,
    POL: `${process.env.ALCHEMY_POL_URL}/${process.env.ALCHEMY_API_KEY}`,
  },

  TENDERLY_URL: `${process.env.TENDERLY_BASE_URL}/${process.env.TENDERLY_API_KEY}`,
  WS_ALCHEMY_URL:{
    ETH: `${process.env.WS_ALCHEMY_ETH_URL}/${process.env.ALCHEMY_API_KEY}`,
    POL: `${process.env.WS_ALCHEMY_POL_URL}/${process.env.ALCHEMY_API_KEY}`,
  },
  PRIVATE_KEY: process.env.PRIVATE_KEY ?? "",
  RECEIVER_ADDRESS: process.env.RECEIVER_ADDRESS ?? ""
};



export default envConstants;
