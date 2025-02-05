// // SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

contract Payments {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct Payment {
        uint amount;
        uint timestamp;
        address from;
        string message;
    }

    struct Balance {
        uint totalPayments;
        mapping(uint => Payment) payments;
    }

    mapping(address => Balance) balances;

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function pay(string memory message) public payable {
        uint paymentNum = balances[msg.sender].totalPayments;
        balances[msg.sender].totalPayments++;

        Payment memory newPayment = Payment(
            msg.value,
            block.timestamp,
            msg.sender,
            message
        );
        
        balances[msg.sender].payments[paymentNum] = newPayment;
    }
    
    function getPayment(address _addr, uint _index) public view returns (Payment memory) {
        return balances[_addr].payments[_index];
    }
}