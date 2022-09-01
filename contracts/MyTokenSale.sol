// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./MyToken.sol";

contract MyTokenSale{
    address admin;
    MyToken public tokenContract;
    uint public tokenPrice;
    constructor(MyToken _tokenContract,uint _tokenPrice){
        //Assign An Admin
        admin=msg.sender;
        tokenContract=_tokenContract;
        tokenPrice=_tokenPrice;

        //Token Contract
        //Token Price 
    }
}