// SPDX-License-Identifier: MIT
pragma solidity ^0.4.2;

contract MyToken{
    //set the total number of tokens
    //read the total number of tokens
    uint public totalSupply;
    //function name same as contract name then 
    //it works as a constructor in solidity for version ^0.4.2
    //but in solidity version ^0.8.0 or more , you can write this function name to constructor
    //constructor (){
    // totalSupply=1000;
    //}
    function MyToken() public {
        totalSupply=100000;
    }
}   