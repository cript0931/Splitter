// contract to be tested
const Splitter = artifacts.require("./Splitter.sol");
const truffleAssert = require('truffle-assertions');

contract("Splitter", function(accounts) {
    let splitterInstance;

    let Admin = accounts[0];
    let Alice = accounts[1];
    let Bob = accounts[2];
    let Carol = accounts[3];

    it("throw an exception if the admin try to set a person", async () => {
        splitterInstance = await Splitter.deployed();
         await truffleAssert.reverts(splitterInstance.setPerson({from: Admin}));
    });

    it("throw an exception if the person try to use the setPerson function more than one time", async () => {
        splitterInstance = await Splitter.deployed();
        const person1 = await splitterInstance.setPerson({from: Alice});
        await truffleAssert.reverts(splitterInstance.setPerson({from: Alice}));
    });

    it("should send 1 ether for each account", async () => {
        splitterInstance = await Splitter.deployed();

        await splitterInstance.setPerson({from: Bob});
        await splitterInstance.setPerson({from: Carol});

        const amount = 2;
        const amountHalf = amount / 2;

        // Get initial balances.
        const bobInitialBalance = await web3.eth.getBalance(Bob);
        const carolInitialBalance = await web3.eth.getBalance(Carol);

        // send the ether
        await splitterInstance.sendEth({from: Alice, to: Bob, value: web3.utils.toWei(amountHalf.toString())});
        await splitterInstance.sendEth({from: Alice, to: Carol, value: web3.utils.toWei(amountHalf.toString())});

        // Get final balances.
        const bobFinalBalance = await web3.eth.getBalance(Bob);
        const carolFinalBalance = await web3.eth.getBalance(Carol);

        // Sum the initial balance with 1 ether ( in wei )
        assert.equal(parseInt(bobInitialBalance) + 1000000000000000000, bobFinalBalance, "Wrong amount");
        assert.equal(parseInt(carolInitialBalance) + 1000000000000000000, carolFinalBalance, "Wrong amount");
    });
});