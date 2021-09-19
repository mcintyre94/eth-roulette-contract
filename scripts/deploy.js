async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account: ", deployer.address);
  const balance = (await deployer.getBalance()).toString();
  console.log("Account balance: ", balance);

  const Token = await ethers.getContractFactory("Roulette");
  const token = await Token.deploy({value: ethers.utils.parseEther("0.1")});
  await token.deployed();

  console.log("Roulette address: ", token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
      console.error(error)
      process.exit(1)
  });