// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat")
require("@nomiclabs/hardhat-ethers");
const Fs = require('@supercharge/filesystem')


const deployContract = async (name, params = []) => {
  const contractFactory = await ethers.getContractFactory(name)
  const contract = await contractFactory.deploy(...params)
  await contract.deployed()
  console.log(`${name} address:`, contract.address)
  // genderate file
  try {
    await Fs.ensureFile(`./address/${name}.json`)
    await Fs.writeFile(`./address/${name}.json`, JSON.stringify({ address: contract.address }, null, 2));
    console.log(`update contract address to ../address/${name}.json`);
  } catch (e) {
    console.log(e)
  }
  return contract
}

async function main() {
  const deployers = await ethers.getSigners();
  const deployer = deployers[0].address
  const initSupply = 5000 * 10 ** 4;
  const bitYoERC20 = await deployContract('BitYoERC20', [initSupply])
  //need to select the staking pairs
  const biyoStaking = await deployContract('BitYoStaking', ["0xDa8226Bdd392e8794dC14cf852d1f138a8209DE8","0xDa8226Bdd392e8794dC14cf852d1f138a8209DE8"])
  console.log('done!')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
