import { ethers } from 'hardhat';

async function main() {
  const waveContractFactory = await ethers.getContractFactory('WavePortal');
  //deploy and fund contract
  const waveContract = await waveContractFactory.deploy({
    value: ethers.utils.parseEther('0.1'),
  });
  await waveContract.deployed();

  console.log(`Contract deployed to: ${waveContract.address}`);

  let contractBalance = await ethers.provider.getBalance(waveContract.address);
  console.log('Contract balance:', ethers.utils.formatEther(contractBalance));

  const waveTxn = await waveContract.wave('This is a wave #1');
  await waveTxn.wait(); //wait for the transaction to be mined

  const waveTx2 = await waveContract.wave('This is a wave #2');
  await waveTx2.wait();

  contractBalance = await ethers.provider.getBalance(waveContract.address);
  console.log('Contract balance:', ethers.utils.formatEther(contractBalance));

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
