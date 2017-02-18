var abiArray = [{
    "constant": false,
    "inputs": [{
        "name": "energy",
        "type": "uint256"
    }],
    "name": "consumeEnergy",
    "outputs": [{
        "name": "EnergyBal",
        "type": "uint256"
    }],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "rate",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "seller",
        "type": "address"
    }, {
        "name": "amount",
        "type": "uint256"
    }],
    "name": "buyEnergy",
    "outputs": [{
        "name": "transactionOK",
        "type": "bool"
    }],
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "kwh",
        "type": "uint256"
    }],
    "name": "setProduction",
    "outputs": [{
        "name": "EnergyBal",
        "type": "uint256"
    }],
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "getRate",
    "outputs": [{
        "name": "energyRate",
        "type": "uint256"
    }],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [{
        "name": "",
        "type": "address"
    }],
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "getEnergyBalance",
    "outputs": [{
        "name": "energyBal",
        "type": "uint256"
    }],
    "type": "function"
}, {
    "inputs": [],
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "from",
        "type": "address"
    }, {
        "indexed": false,
        "name": "kwh",
        "type": "uint256"
    }],
    "name": "Prod",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "from",
        "type": "address"
    }, {
        "indexed": false,
        "name": "energy",
        "type": "uint256"
    }],
    "name": "Cons",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "from",
        "type": "address"
    }, {
        "indexed": false,
        "name": "to",
        "type": "address"
    }, {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
    }],
    "name": "Buy",
    "type": "event"
}]