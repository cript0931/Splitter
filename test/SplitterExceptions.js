// contract to be tested
const Splitter = artifacts.require("./Splitter.sol");
const truffleAssert = require('truffle-assertions');

contract("Splitter", function(accounts) {
    let splitterInstance;

    it("throw an exception if the person try to use the setPerson function more than one time", async () => {
        splitterInstance = await Splitter.deployed();
        const person1 = await splitterInstance.add({from: accounts[6]});
        await truffleAssert.reverts(splitterInstance.add({from: accounts[6]}));
    });

    it("split the correct values between five accounts", async () => {
        splitterInstance = await Splitter.deployed();
        const amount = 0.15;

        await splitterInstance.add({from: accounts[0]});
        await splitterInstance.add({from: accounts[1]});
        await splitterInstance.add({from: accounts[2]});
        await splitterInstance.add({from: accounts[3]});
        await splitterInstance.add({from: accounts[4]});
        await splitterInstance.add({from: accounts[5]});

        await splitterInstance.setFunds({from: accounts[0], value: web3.utils.toWei(amount.toString())});

        await splitterInstance.withdraw({from: accounts[0]});
        await splitterInstance.withdraw({from: accounts[1]});
        await splitterInstance.withdraw({from: accounts[2]});
        await splitterInstance.withdraw({from: accounts[3]});
        await splitterInstance.withdraw({from: accounts[4]});
        await splitterInstance.withdraw({from: accounts[5]});
    });
});