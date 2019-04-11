pragma solidity >=0.4.21 < 0.6.0;

contract Splitter {
    address public admin;

    constructor() public {
        admin = msg.sender;
    }

    struct People {
        string name;
        address payable addr;
    }

    People[] public person;

    function setPerson() public {
        require(admin != msg.sender);
        require(person.length < 3);
        require(checkUniqueAddress());

        People memory p = People(getPersonName(), msg.sender);
        person.push(p);
    }

    function checkUniqueAddress() private view returns (bool) {
        for (uint i=0; i < person.length; i++) {
            if (person[i].addr == msg.sender) {
                return false;
            }
        }
        return true;
    }

    function getPersonName() internal view returns (string memory) {
        uint pLength = person.length;

        if (pLength == 0) return "Alice";
        if (pLength == 1) return "Bob";
        if (pLength == 2) return "Carol";
    }

    function sendEth() public payable {
        require(msg.value > 0);
        require(person[0].addr == msg.sender);

        person[1].addr.transfer(msg.value / 2);
        person[2].addr.transfer(msg.value / 2);
    }

    function getAdmin() public view returns (address) {
        return admin;
    }
}

