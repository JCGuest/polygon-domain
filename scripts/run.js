const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContract = await domainContractFactory.deploy("emoji");
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);
    console.log("Contract deployed by:", owner.address);
  
    let txn = await domainContract.register("mortal",  {value: hre.ethers.utils.parseEther('0.5')});
    await txn.wait();
  
    const address = await domainContract.getAddress("mortal");
    console.log("Owner of domain mortal:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  };
  
const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();