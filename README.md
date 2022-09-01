# ICO_Dapp
To create the ICO contract where everyone can buy the token from the owner's wallet by using their wallet address.
```shell
mkdir ICO_Contract
cd ICO_Contract
truffle init
touch contracts/MyToken.sol
touch migrations/2_deployed_contracts.js
truffle compile
truffle migrate --reset
truffle console
MyToken.deployed().then(function(i){token=i;})
token.address
token.totalSupply().then(function(s){totalSupply=s})
totalSupply
totalSupply.toNumber()
touch test/MyToken.js
truffle test
Truffle migrate –reset
Truffle console
MyToken.deployed().then(function(instance){tokenInstance=instance;})
tokenInstance
tokenInstance.name()
tokenInstance.symbol()
tokenInstance.standard()
tokenInstance.totalSupply().then(function(s){totalSupply=s;})
totalSupply
totalSupply.toNumber()
acc=await web3.eth.getAccounts()
tokenInstance.balanceOf(accounts[0]).then(function(bal){balance=bal;})
balance.toNumber()
admin=accounts[0]
receiver=accounts[1]
tokenInstance.transfer(receiver,1,{from:admin})
balance.toNumber() //get the updated balance 
tokenInstance.approve(receiver,100) 
tokenInstance.allowance(accounts[0],accounts[1])
fromAccount=accounts[2];
toAccount=accounts[3];
spendingAccount=accounts[4];
tokenInstance.transfer(fromAccount,100,{from:accounts[0]});
tokenInstance.balanceOf(fromAccount);
tokenInstance.approve(spendingAccount,10,{from:fromAccount})
tokenInstance.transferFrom(fromAccount,toAccount,10,{from:spendingAccount})
tokenInstance.balanceOf(fromAccount)
tokenInstance.balanceOf(toAccount)
tokenInstance.allowance(fromAccount,spendingAccount)
```
How the Token Sale works?
```shell
Provision tokens to token sale contract
Set a token price in wei
Assign an Admin
By Tokens
End Sale
```
Export from VsCode to github Repository:
```shell
git config --global user.name "jitendragangwar123"
git config --global user.email "gangwarjitendra2498@gmail.com"
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/jitendragangwar123/ICO_Dapp.git
git push -u origin main
git push -f origin main //forcefully push on github repository

```
