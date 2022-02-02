import { ethers } from "hardhat";

async function main() {
  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  //deploy and fund contract
  const waveContract = await waveContractFactory.deploy({
    value: ethers.utils.parseEther("0.001"),
  });

  await waveContract.deployed();

  console.log(`Wave Portal address: ${waveContract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
