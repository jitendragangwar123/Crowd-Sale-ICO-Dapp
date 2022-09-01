// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./MyToken.sol";

contract MyTokenSale{
    address admin;
    MyToken public tokenContract;
    uint public tokenPrice;
    uint public tokenSold;

    event Sell(address _buyer,uint _amount);
    constructor(MyToken _tokenContract,uint _tokenPrice){
        //Assign An Admin
        admin=msg.sender;
        //Token Contract
        tokenContract=_tokenContract;
        //Token Price
        tokenPrice=_tokenPrice;
    }
    //multiply library
    function multiply(uint x,uint y) internal pure returns(uint z){
        require(y==0 ||(z=x*y)/y==x);
    }

    //Buy Tokens
    function buyTokens(uint _numberOfTokens)public payable{
        //require that value is equal to tokens
        require(msg.value == multiply(_numberOfTokens,tokenPrice));
        //require that the contract has enough tokens
        require(tokenContract.balanceOf(address(this))>=_numberOfTokens);
        //require that a transfer is successful
        require(tokenContract.transfer(msg.sender, _numberOfTokens));
        //keep track of tokenSold
        tokenSold+=_numberOfTokens;
        //trigger sell event
        emit Sell(msg.sender,_numberOfTokens);
    }
}