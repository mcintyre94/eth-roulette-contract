async function main() {
    const rouletteContractFactory = await hre.ethers.getContractFactory("Roulette")
    const rouletteContract = await rouletteContractFactory.deploy({value: hre.ethers.utils.parseEther("100.0")})

    await rouletteContract.deployed();
    console.log("Contract deployed to: ", rouletteContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(rouletteContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    const requestId = 100
    for(i=0; i<10; i++) {
        const betTxn = await rouletteContract.spin(requestId, 3, 1, {value: hre.ethers.utils.parseEther("1.0")});
        const betReceipt = await betTxn.wait();
        console.log(betReceipt.events.map(e => e.event));
    }

    contractBalance = await hre.ethers.provider.getBalance(rouletteContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));



    /*
    let waveCount = await waveContract.getTotalWaves();
    console.log("Wave count: ", waveCount.toNumber());

    let waveTxn = await waveContract.wave("A message!", {value: ethers.BigNumber.from("1000000000000")});
    await waveTxn.wait();

    waveTxn = await waveContract.connect(randoPerson).wave("Another message!");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    const randoBalance = await hre.ethers.provider.getBalance(randoPerson.address);
    console.log("Rando balance: ", hre.ethers.utils.formatEther(randoBalance));

    const allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    waveTxn = await waveContract.connect(randoPerson).wave("Another message!");
    await waveTxn.wait();
    */
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });