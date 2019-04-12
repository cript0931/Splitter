pragma solidity >=0.4.21 < 0.6.0;

contract Splitter {

    mapping(uint => address) people;
    mapping(address => uint) personCount;
    mapping(address => uint) funds;

    uint private cont = 0;

    function add() public {
        require (personCount[msg.sender] == 0);

        people[cont] = msg.sender;
        personCount[msg.sender]++;
        cont++;
    }

    function setFunds() payable external {
        require(msg.value > 0 ether);

        uint amount = msg.value / (cont - 1);

        for (uint i=0; i < cont; i++) {
            if (msg.sender != people[i]) {
                funds[people[i]] = amount;
            }
        }
    }

    function withdraw() external {
        uint fund = funds[msg.sender];
        funds[msg.sender] = 0;
        msg.sender.transfer(fund);
    }
}
