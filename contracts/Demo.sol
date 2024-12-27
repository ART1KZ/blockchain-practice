// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

contract Demo {
    bool public boolOne = true; // глобальная переменная
    uint public number = 1; // глобальная переменная доступная извне
    uint numberTwo = 2; // глобальная переменная недоступная извне

    function boolFunc(uint _inputNumber) public {
        bool boolTwo; // локальная переменная
        uint numberThree = _inputNumber; // локальная переменная
    }
}
