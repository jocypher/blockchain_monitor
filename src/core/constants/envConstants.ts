import dotenv from "dotenv";
dotenv.config();

const envConstants = {
  PORT: process.env.PORT || 3000,
  ALCHEMY_URL: `${process.env.ALCHEMY_BASE_URL}/${process.env.ALCHEMY_API_KEY}`,
  TENDERLY_URL: `${process.env.TENDERLY_BASE_URL}/${process.env.TENDERLY_API_KEY}`,
  PRIVATE_KEY: process.env.PRIVATE_KEY??'',
  RECEIVER_ADDRESS: process.env.RECEIVER_ADDRESS??''
};


export default envConstants;
