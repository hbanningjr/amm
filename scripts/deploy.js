// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("Token");

  // Deploy (token 1)
  let DAPPU = await Token.deploy("DAPPU Token", "DAPPU", "1000000"); // 1 million tokens
  await DAPPU.deployed();
  console.log(`DAPPU token deployed to: ${DAPPU.address}\n`);

  // Deploy (token 2)
  let usd = await Token.deploy("USD Token", "USD", "1000000"); // 1 million tokens
  await usd.deployed();
  console.log(`DAPPU token deployed to: ${usd.address}\n`);

  // Deploy Auto Market Maker
  const AMM = await hre.ethers.getContractFactory("AMM");
  const amm = await AMM.deploy(DAPPU.address, usd.address);

  console.log(`AMM contract deployed to${amm.address}\n:`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
