const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContract = await domainContractFactory.deploy();
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);
    console.log("Contract deployed by:", owner.address);
  
    let txn = await domainContract.register("max");
    await txn.wait();
  
    const domainAddress = await domainContract.getAddress("max");
    console.log("Owner of domain max:", domainAddress);
  
    txn = await domainContract.connect(owner).setRecord("max","👋");
    await txn.wait();

    const domainRecord = await domainContract.getRecord("max");
    console.log("Record of max:", domainRecord);

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