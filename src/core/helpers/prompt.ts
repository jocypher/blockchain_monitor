import prompt from "prompt";

const schema = {
  properties: {
    privateKey: {
      message: "Enter your private Key",
      required: true,
      hidden: true,
    },
  },
};

async function promptForKey():Promise<string> {
  prompt.start();

  const result = await prompt.get(schema);
  return result.privateKey as string;
}

export default promptForKey;
