let MyToken=artifacts.require("./MyToken.sol");
let MyTokenSale=artifacts.require("./MyTokenSale.sol");

contract('MyTokenSale',function(accounts){
    let tokenInstance;
    let tokenSaleInstance;
    let admin=accounts[0];
    let buyer=accounts[1];
    let numberOfTokens;
    let tokenPrice=1000000000000000;
    let tokensAvailable=750000;
    it("Initializes the contract with the correct values",function(){
        return MyTokenSale.deployed().then(function(instance){
            tokenSaleInstance=instance;
            return tokenSaleInstance.address;
        }).then(function(address){
            assert.notEqual(address,0x0,"has contract address");
            return tokenSaleInstance.tokenContract();
        }).then(function(address){
            assert.notEqual(address,0x0,"has token contract address");
            return tokenSaleInstance.tokenPrice();
        }).then(function(price){
            assert.equal(price,tokenPrice,"token price is correct");
        });
    });
    it("facilitates token buying",function(){
        return MyToken.deployed().then(function(instance){
            //gra token instance first
            tokenInstance=instance;
            return MyTokenSale.deployed();
        }).then(function(instance){
            //then grab token sale instance
            tokenSaleInstance=instance;
            //provision 75% of all tokens to the token sell
            return tokenInstance.transfer(tokenSaleInstance.address,tokensAvailable,{from:admin});
        }).then(function(receipt){
            numberOfTokens=10;
            return tokenSaleInstance.buyTokens(numberOfTokens,{from:buyer,value:numberOfTokens*tokenPrice});
        }).then(function(receipt){
            assert.equal(receipt.logs.length,1,"triggers one event");
            assert.equal(receipt.logs[0].event,"Sell","Should be the Sell event");
            assert.equal(receipt.logs[0].args._buyer,buyer,"logs the account the purchased the tokens");
            assert.equal(receipt.logs[0].args._amount,numberOfTokens,"logs the account the tokens purchased");
            return tokenSaleInstance.tokenSold();
        }).then(function(amount){
            assert.equal(amount.toNumber(),numberOfTokens,"increments the number of tokens sold");
            return tokenInstance.balanceOf(buyer);
        }).then(function(balance){
            assert.equal(balance.toNumber(),numberOfTokens);
            return tokenInstance.balanceOf(tokenSaleInstance.address);    
        }).then(function(balance){
            assert.equal(balance.toNumber(),tokensAvailable-numberOfTokens);
            //try to buy tokens different from the ether value
            return tokenSaleInstance.buyTokens(numberOfTokens,{from:buyer,value:1});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0,"msg.value must equal numer of tokens in wei");
            return tokenSaleInstance.buyTokens(80000,{from:buyer,value:numberOfTokens*tokenPrice});
        }).then(assert.fail).catch(function(error){
            // console.log(error.message);
            assert(error.message.indexOf('revert')>=0,"can not purchase more tokens than available");
        });
    });
    it("end token sale",function(){
        return MyToken.deployed().then(function(instance){
            //grab token instance first
            tokenInstance=instance;
            return MyTokenSale.deployed();
        }).then(function(instance){
            //then grab token sale instance
            tokenSaleInstance=instance;
            //try to end sale from account other than the admin
            return tokenSaleInstance.endSale({from:buyer});
        }).then(assert.fail).catch(function(error){
           // console.log(error.message);
            assert(error.message.toString().indexOf('revert')>=0,"must be admin to end sale ");
            //end sale as admin
            return tokenSaleInstance.endSale({from:admin});
        }).then(function(receipt){
            return tokenInstance.balanceOf(admin);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 999990, "returns all unsold GFG Tokens to the admin");
            //check that token price was reset when selfdestruct was called 
            return tokenSaleInstance.tokenPrice();
        }).then(function(price){
            assert.equal(price.toNumber(), 0, "token price was reset");
        });
    });
})