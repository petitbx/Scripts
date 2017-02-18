var Web3 = require('web3/index.js');

// CONFIGURATION FILE
// var config = require('./config');

// ATTRIBUTION Varibales
// var static_coinbase = config.static_coinbase;
// var abiArray = config.abiArray;
// config = config.config;
var account = config.account;
var contractAddress = config.contractAddress;
var waitEvent = { state: false, hashTransac: null };

// Fonctions utiles
function renameAddressIfRegistered(addressToCheck) {
  if (addressToCheck==account) {
    addressToCheck = "Moi";
  }
  else if (addressToCheck in static_coinbase) {
    addressToCheck = static_coinbase[addressToCheck];
  }
  return (addressToCheck);
}

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider(config.RPCListingAddress));
}

// NOTE: Need to compile with browserify init.js -o main.js
var SolidityCoder = require("web3/lib/solidity/coder.js");

web3.eth.defaultAccount = account;

var now = new Date();

// Update Variables
var contract, functionHashes;
updateVariables(abiArray, contractAddress);

function updateVariables(newAbi, newContract) {
  // Assemble function hashes
  functionHashes = getFunctionHashes(newAbi);

  // Get hold of contract instance
  contract = web3.eth.contract(newAbi).at(newContract);
}
function getModalValues() {
  $('#coinbase').text(account);
  $('#contractAddress').text(contractAddress);
  $('#abiArray').text(JSON.stringify(abiArray));
}

// Setup filter to watch transactions
var filter = web3.eth.filter('latest');
//var filter = web3.eth.filter({fromBlock:0, toBlock: 'latest', address: contractAddress, 'topics':['0x' + web3.sha3('newtest(string,uint256,string,string,uint256)')]});

filter.watch(function(error, result){

  if (error) return;
  
  var block = web3.eth.getBlock(result, true);
  console.log('block #' + block.number);

  console.dir(block.transactions);

  for (var index = 0; index < block.transactions.length; index++) {
    var t = block.transactions[index];

    // Decode from
    var from = t.from;
    from = renameAddressIfRegistered(from);
    // Decode TO
    var destination = t.to;
    destination = renameAddressIfRegistered(destination);

    // Decode function
    var func = findFunctionByHash(functionHashes, t.input);

    if (func == 'setProduction') {
      var inputData = SolidityCoder.decodeParams(["uint256"], t.input.substring(10));
      console.dir(inputData);
      $('#transactions').append('<tr><td>' + t.blockNumber + 
        '</td><td>' + from + 
        '</td><td>' + "DAISEE" + 
        '</td><td>setProduction(' + inputData[0].toString() + ')</td></tr>');
    } else if (func == 'consumeEnergy') {
      var inputData = SolidityCoder.decodeParams(["uint256"], t.input.substring(10));
      console.dir(inputData);
      $('#transactions').append('<tr><td>' + t.blockNumber + 
        '</td><td>' + from + 
        '</td><td>' + "DAISEE" + 
        '</td><td>consumeEnergy(' + inputData[0].toString() + ')</td></tr>');
    } else if (func == 'buyEnergy') {
      var inputData = SolidityCoder.decodeParams(["uint256", "uint256"], t.input.substring(34));
      console.dir(inputData);
      $('#transactions').append('<tr><td>' + t.blockNumber + 
        '</td><td>' + from + 
        '</td><td>' + "DAISEE" + 
        '</td><td>buyEnergy(' + inputData[1].toString() + ')</td></tr>');
      } else {
      // Default log => for debug
      var result = t;
      if ((result.value !== undefined) && (result.value !== null)) result = web3.fromWei(result.value, "ether") + " ether";
      else result = result.input;

      $('#transactions').append('<tr><td>' + t.blockNumber + '</td><td>' + from + '</td><td>' + destination + '</td><td>' + result + '</td></tr>')
    }
  }
});

// Update labels every second
setInterval(function() {

  // Account
  $('#coinbase').text(account);
  $('#contractAddress').text(contractAddress);

  var etherContract = contract.getSent.call(web3.eth.coinbase);
  etherContract = web3.fromWei(etherContract, 'ether');
  $('#abiArray').text(etherContract);

  // Transaction state ReceiveFunction
  if (waitEvent.state) {
    if (web3.eth.getTransactionReceipt(waitEvent.hashTransac) !== null) {
      $("a.waitEvent").removeClass('disabled');
      waitEvent.state = false;
    }
  }

  // Account balance in Ether
  var balanceWei = web3.eth.getBalance(account).toNumber();
  var balance = web3.fromWei(balanceWei, 'ether');
  $('#balance').text(balance);

  // Block infos
  var number = web3.eth.blockNumber;
  if ($('#latestBlock').text() != number)
    $('#latestBlock').text(number);

  var hash = web3.eth.getBlock(number).hash
  $('#latestBlockHash').text(hash);

  var timeStamp = web3.eth.getBlock(number).timestamp;
  var d = new Date(0);
  d.setUTCSeconds(timeStamp);
  $('#latestBlockTimestamp').text(d);

  // Contract energy balance: call (not state changing)
  var energyBalance = contract.getEnergyBalance.call();
  $('#energyBalance').text(energyBalance);

  $('#startedAt').text(now);

}, 1000);




// Get function hashes
// TODO: also extract input parameter types for later decoding

function getFunctionHashes(abi) {
  var hashes = [];
  for (var i=0; i<abi.length; i++) {
    var item = abi[i];
    if (item.type != "function") continue;
    var signature = item.name + "(" + item.inputs.map(function(input) {return input.type;}).join(",") + ")";
    var hash = web3.sha3(signature);
    console.log(item.name + '=' + hash);
    hashes.push({name: item.name, hash: hash});
  }
  return hashes;
}

function findFunctionByHash(hashes, functionHash) {
  for (var i=0; i<hashes.length; i++) {
    if (hashes[i].hash.substring(0, 10) == functionHash.substring(0, 10))
      return hashes[i].name;
  }
  return null;
}

// DOM READY
/*
Mettre les events de click
*/
$(function() {
  $("a.exec-transfert-ether").on('click', function(event) {
    event.preventDefault();
    /* Act on the event */
    if (waitEvent.state) return;
    else {
      waitEvent.state = true;
      $(this).addClass('disabled');
      waitEvent.hashTransac = contract.receiveEther({from: account});
      console.log('"' + waitEvent.hashTransac + '"');
    }
  });

  $('#modal-account').prop({value: account});
  $('#modal-contract-address').prop({value: contractAddress});
  $('#modal-abiArray').text(JSON.stringify(abiArray));
  $('#modal-contract form').on('click', '*[type="submit"]', function(event) {
    event.preventDefault();
    /* Act on the event */
    account = $('#modal-contract #modal-account')[0].value;
    contractAddress = $('#modal-contract-address')[0].value;
    abiArray = JSON.parse($('#modal-abiArray').text());
    updateVariables(abiArray, contractAddress);
    $('#modal-account').prop({value: account});
    $('#modal-contract-address').prop({value: contractAddress});
    $('#modal-abiArray').text(JSON.stringify(abiArray));

  });
  $('#modal-setProduction form').on('click', '*[type="submit"]', function(event) {
    event.preventDefault();
    /* Act on the event */
    var production = $('#modal-form-setProduction')[0].value;
    production = contract.setProduction(production, {from: account});
    console.log('%c' + Date(), 'color: #cd4400;');
    console.log('setProduction# "' + production + '"');
  });
  $('#modal-consumeEnergy form').on('click', '*[type="submit"]', function(event) {
    event.preventDefault();
    /* Act on the event */
    var consumeEnergy = $('#modal-form-consumeEnergy')[0].value;
    consumeEnergy = contract.consumeEnergy(consumeEnergy, {from: account});
    console.log('%c' + Date(), 'color: #cd4400;');
    console.log('consumeEnergy# "' + consumeEnergy + '"');
  });
  if ($('#modal-buyEnergy').length) {
    var modalBuyEnergy = $('#modal-buyEnergy');
    modalBuyEnergy.on('change', '.energyValue', function(event) {
      event.preventDefault();
      /* Act on the event */
      modalBuyEnergy.find('.energyPrice').prop({value: $(this)[0].value});
    }).on('click', '*[type="submit"]', function(event) {
      event.preventDefault();
      /* Act on the event */
      var buyEnergy = contract.buyEnergy.sendTransaction(
        modalBuyEnergy.find('.energySeller')[0].value, parseInt(modalBuyEnergy.find('.energyValue')[0].value),
        {from: account, value: parseInt(web3.toWei(modalBuyEnergy.find('.energyValue')[0].value, "ether")) });
      console.log('%c' + Date(), 'color: #cd4400;');
      console.log('consumeEnergy# "' + buyEnergy + '"');
    });
  }
});
