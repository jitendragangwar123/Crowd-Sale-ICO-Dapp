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
```
Export from VSCode to github Repository:
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
