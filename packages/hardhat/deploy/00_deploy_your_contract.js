// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

// const localChainId = "1337";

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  // console.log(chainId)

  // await deploy("YourContract", {
  //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
  //   from: deployer,
  //   // args: [ "Hello", ethers.utils.parseEther("1.5") ],
  //   log: true,
  //   waitConfirmations: 5,
  // });

  // // Getting a previously deployed contract
  // const YourContract = await ethers.getContract("YourContract", deployer);

  await deploy("BitYONFT", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [ "https://i.imgur.com/pcutwDe.jpg","https://i.imgur.com/pcutwDe.jpg" ],
    log: true,
    waitConfirmations: 5,
  });

  const BitYONFT = await ethers.getContract("BitYONFT", deployer);

   
  // 代幣
  const initSupply = 5000 * 10 ** 4;

  await deploy("BitYoERC20", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [ initSupply ],
    log: true,
    waitConfirmations: 5,
  });

  const BitYoERC20 = await ethers.getContract("BitYoERC20", deployer);




  await deploy("BitYOstakingRewards", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [ BitYoERC20.address , BitYoERC20.address , BitYONFT.address],  // 暫時先這樣
    log: true,
    waitConfirmations: 5,
  });

  // // NFT存款
  const BitYOstakingRewards = await ethers.getContract("BitYOstakingRewards", deployer);
  await BitYONFT.setStakeContract(BitYOstakingRewards.address);

  // // 代幣質押

  await deploy("BitYoStaking", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args:   ["0xDa8226Bdd392e8794dC14cf852d1f138a8209DE8","0xDa8226Bdd392e8794dC14cf852d1f138a8209DE8", BitYONFT.address],
    log: true,
    waitConfirmations: 5,
  });



  // await deploy("multiSignWallet", {
  //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
  //   from: deployer,
  //   args: [[ "0xCd4418310b85773c65f14a80FD892328D3A43AA5", "0x8712e2652f7Fa99911bA3f440ce381498270Cc48" ]],
  //   log: true,
  //   waitConfirmations: 5,
  // });

  // const multiSignWallet = await ethers.getContract("multiSignWallet", deployer);

  /*  await YourContract.setPurpose("Hello");
  
    To take ownership of yourContract using the ownable library uncomment next line and add the 
    address you want to be the owner. 
    // await yourContract.transferOwnership(YOUR_ADDRESS_HERE);

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify from the command line by running `yarn verify`

  // You can also Verify your contracts with Etherscan here...
  // You don't want to verify on localhost
  // try {
  //   if (chainId !== localChainId) {
  //     await run("verify:verify", {
  //       address: YourContract.address,
  //       contract: "contracts/YourContract.sol:YourContract",
  //       contractArguments: [],
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
};
module.exports.tags = ["YourContract"];
