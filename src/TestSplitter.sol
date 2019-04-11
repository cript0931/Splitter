pragma solidity >=0.4.25 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Splitter.sol";

contract TestSplitter {
    function testInitialBalanceUsingDeployedContract() public {
        Splitter split = Splitter(DeployedAddresses.Splitter());

        uint expected = 10000;

        Assert.equal(1000, expected, "Owner should have 10000 MetaCoin initially");
    }
}
