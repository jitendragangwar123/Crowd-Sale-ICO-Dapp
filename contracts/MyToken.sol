// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract MyToken{
    string public name; 
    string public symbol;
    string public standard;
    //set the total number of tokens
    //read the total number of tokens
    uint public totalSupply;
    //Transfer event
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _amount
    );
    //Approve event
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _amount
    );

    mapping(address=>uint) public balanceOf;
    //allowance => returns the amount which _spender is still allowed to withdraw from _owner.
    mapping(address=>mapping(address=>uint))public allowance;

    //function name same as contract name then it work like a constructor
    //it works as a constructor in solidity for version ^0.4.2
    // function MyToken(uint _initialSupply) public {}
    //but in solidity version ^0.8.0 or more , you can write this function name to constructor
    
    constructor(string memory _name,string memory _symbol,string memory _standard,uint _initialSupply){
        //Allocate the initial supply
        balanceOf[msg.sender]=_initialSupply;
        totalSupply=_initialSupply;
        name=_name;
        symbol=_symbol;
        standard=_standard;
        
    }
    function transfer(address _to,uint _amount)public returns(bool success){
        //transfer
        //exception if account does not have enough amount
        //return a boolean
        //tranfer event
        require(balanceOf[msg.sender] >= _amount);
        balanceOf[msg.sender]-= _amount;
        balanceOf[_to]+=_amount;
        emit Transfer(msg.sender, _to, _amount);
        return true;
    }
    //approve() => allows _spender to withdrraw deom your account multiple times,up to the _value amount.
    function approve(address _spender,uint _amount) public returns(bool success){
        allowance[msg.sender][_spender]=_amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }
    //transferFrom()
    function transferFrom(address _from,address _to,uint _amount) public returns(bool success){
        //require _from has enough tokens
        require(balanceOf[_from]>=_amount);
        //require allowance is big enough
        require(allowance[_from][msg.sender]>=_amount);
        //change the balance 
        balanceOf[_from]-=_amount;
        balanceOf[_to]+=_amount;
        //update the allowance
        allowance[_from][msg.sender]-=_amount;
        //emit transfer event
        emit Transfer(_from,_to,_amount);
        //return a boolean
        return true;
    }
}   
