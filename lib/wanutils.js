const Web3 = require('web3');
const net = require('net');
const config = require('../config');
const BigNumber = require('bignumber.js');

const web3 = new Web3(new Web3.providers.IpcProvider(config.gwan.ipcPath, net));
web3.extend({
  property: 'storeman',
  methods: [{
      name: 'getPeers',
      call: 'storeman_peers',
  }]
});

exports.getPeersAmount = async function() {
  try {
    let amount = await web3.storeman.getPeers();
    return amount.length;
  } catch (err) {
    console.error("get peers failed: %s", err);
    return null;
  }
}

exports.closeWeb3 = function() {
  // web3 has not yet provided a way to disconnect
  process.exit(0);
}
