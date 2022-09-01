const MyToken = artifacts.require("MyToken");
const MyTokenSale=artifacts.require("MyTokenSale");
module.exports = function (deployer) {
  deployer.deploy(MyToken,"GFG Token","GFG","GFG Token v1.0",1000000).then(function(){
    let tokenPrice=1000000000000000;
    return deployer.deploy(MyTokenSale,MyToken.address,tokenPrice);
  });
};
