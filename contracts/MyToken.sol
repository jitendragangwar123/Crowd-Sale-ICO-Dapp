// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract MyToken{
    string public name; 
    string public symbol;
    string public standard;
    //set the total number of tokens
    //read the total number of tokens
    uint public totalSupply;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _amount);

    mapping(address=>uint) public balanceOf;

    //function name same as contract name then it work like a constructor
    //it works as a constructor in solidity for version ^0.4.2
    //but in solidity version ^0.8.0 or more , you can write this function name to constructor
    //constructor (){
    // totalSupply=1000;
    //}
    constructor(string memory _name,string memory _symbol,string memory _standard,uint _initialSupply){
        //Allocate the initial supply
        balanceOf[msg.sender]=_initialSupply;
        totalSupply=_initialSupply;
        name=_name;
        symbol=_symbol;
        standard=_standard;
        //transfer
        //exception if account does not have enough amount
        //return a boolean
        //tranfer event
    }
    function transfer(address _to,uint _amount)public returns(bool success){
        require(balanceOf[msg.sender] >= _amount);
        balanceOf[msg.sender]-= _amount;
        balanceOf[_to]+=_amount;
        emit Transfer(msg.sender, _to, _amount);
        return true;
    }
}   
