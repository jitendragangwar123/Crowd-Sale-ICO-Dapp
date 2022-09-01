var MyToken=artifacts.require("./MyToken.sol");

contract('MyToken',function(accounts){
    var tokenInstance;
    it("Initializes the contract with the correct value",function(){
        return MyToken.deployed().then(function(instance){
            tokenInstance=instance;
            return tokenInstance.name();
            }).then(function(name){
                assert.equal(name,"GFG Token","Has the Correct Name");
                return tokenInstance.symbol();

            }).then(function(symbol){
                assert.equal(symbol,"GFG","Has the correct Symbol");
                return tokenInstance.standard();
            }).then(function(standard){    
                assert.equal(standard,"GFG Token v1.0","has the correct standard");
            });
        });
    it('allocates the initial supply upon deployment',function(){
        return MyToken.deployed().then(function(instance){
            tokenInstance=instance;
            return tokenInstance.totalSupply();
                }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(),1000000,'Sets the total supply to 100000');
                return tokenInstance.balanceOf(accounts[0]);
            }).then(function(adminBalance){
                assert.equal(adminBalance.toNumber(),1000000,'It allocates the initial supply to the admin account');
            });
        });
    it("Transfer token ownership",function(){
        return MyToken.deployed().then(function(instance){
            tokenInstance=instance;
            //Test 'require' statement first by transfering something larger than the sender's balance
            return tokenInstance.transfer.call(accounts[1],99999999);
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0,"error message must contain revert");
            return tokenInstance.transfer.call(accounts[1],250000,{from:accounts[0]});
        }).then(function(success){
            assert.equal(success,true,"It returns true")
            return tokenInstance.transfer(accounts[1],250000,{from:accounts[0]});
        }).then(function(receipt){
            assert.equal(receipt.logs.length,1,"triggers one event");
            assert.equal(receipt.logs[0].event,"Transfer","Should be the Transfer event");
            assert.equal(receipt.logs[0].args._from,accounts[0],"logs the account the tokens are transferred from");
            assert.equal(receipt.logs[0].args._to,accounts[1],"logs the account the tokens are transferred to");
            assert.equal(receipt.logs[0].args._amount,250000,"logs the transfer amount");
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance){
            assert.equal(balance.toNumber(),250000,"Adds the amount to the receiving account");
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.toNumber(),750000,"Deducts the amount from the sending account");
        });
    });
    it("approve tokens for delegated transfer",function(){
        return MyToken.deployed().then(function(instance){
            tokenInstance=instance;
            return tokenInstance.approve.call(accounts[1],100);
        }).then(function(success){
            assert.equal(success,true,"It will return true.");
            return tokenInstance.approve(accounts[1],100);
        }).then(function(receipt){
            assert.equal(receipt.logs.length,1,"triggers one event");
            assert.equal(receipt.logs[0].event,"Approval","Should be the Transfer event");
            assert.equal(receipt.logs[0].args._owner,accounts[0],"logs the account the tokens are transferred from");
            assert.equal(receipt.logs[0].args._spender,accounts[1],"logs the account the tokens are transferred to");
            assert.equal(receipt.logs[0].args._amount,100,"logs the transfer amount");
            return tokenInstance.allowance(accounts[0],accounts[1]);
        }).then(function(allowance){
            assert.equal(allowance.toNumber(),100,"stores the allowance for delegated transfer");
        });
    });
    it("handles delegated token transfer",function(){
        return MyToken.deployed().then(function(instance){
            tokenInstance=instance;
            fromAccount=accounts[2];
            toAccount=accounts[3];
            spendingAccount=accounts[4];
            //transfer some tokens to fromAccount
            return tokenInstance.transfer(fromAccount,100,{from:accounts[0]});
        }).then(function(receipt){
            //approve spendingAccount to spend 10 tokens from fromAccount
            return tokenInstance.approve(spendingAccount,10,{from:fromAccount});
        }).then(function(receipt){
            //try tranferring something larger than the sender's balance
            return tokenInstance.transferFrom(fromAccount,toAccount,9999,{from:spendingAccount});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0,"cannot transfer value larger than balance");
            //try transferring something larger than the approved amount
            return tokenInstance.transferFrom(fromAccount,toAccount,20,{from:spendingAccount});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0,"cannot transfer value larger than approved amount");
        })
    });
})









