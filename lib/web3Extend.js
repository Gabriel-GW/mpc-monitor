const { AbstractWeb3Module } = require('web3-core');
const { AbstractMethodFactory, AbstractMethod } = require('web3-core-method');
const { formatters } = require('web3-core-helpers');
// const {ProviderResolver} = require ('web3-providers');
const Utils = require('web3-utils');
const Web3 = require('web3');

module.exports = class Web3Extend extends Web3 {
  constructor(nodeUrl, net, options = {}) {
    let provider;
    if (nodeUrl.toString().indexOf("http://") !== -1) {
      provider = new Web3.providers.HttpProvider(nodeUrl);
    } else {
      provider = new Web3.providers.IpcProvider(nodeUrl, net);
    }

    super(provider, net, options);
    this.storeman = new Storeman(provider, net, options);
  }
}

// Storeman extend
class Storeman extends AbstractWeb3Module {
  constructor(provider, net, options) {
    super(provider, net, new StoremanMethodFactory(Utils, formatters), options);
  }
}

class StoremanMethodFactory extends AbstractMethodFactory {
  constructor(utils, formatters) {
    super(utils, formatters);
    this.methods = {
      getPeers: GetPeers
    };
  }
}

class GetPeers extends AbstractMethod {
  constructor(utils, formatters, moduleInstance) {
    super('storeman_peers', 0, utils, formatters, moduleInstance);
  }
}
