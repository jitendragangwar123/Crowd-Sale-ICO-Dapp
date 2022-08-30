const MyToken = artifacts.require("MyToken");

module.exports = function (deployer) {
  deployer.deploy(MyToken,"GFG Token","GFG","GFG Token v1.0",1000000)
};