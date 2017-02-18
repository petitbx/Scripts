var config = {
	RPCListingAddress: "http://192.168.78.136:8545",
	account: '0x1acbf4abbeeea5a210066f4518203796df49ed97',
	contractAddress: '0xcf961c1b5becf104eb57cdafe360df4bd3731302'
};
var static_coinbase = {
	'0x1acbf4abbeeea5a210066f4518203796df49ed97':	'Faisal',
	'0xd4bf58f5bed7b669e13ef01e0a1bdefbf9018b12':	'Faisal 2',
	'0xdaa2c2c3cfc465d8c164f6db08ceb567318dd85b':	'Yoann',
	'0xb54c53ec82882f5f5f4333d26383fc0943eb4777':	'Tonio',
	'0x4ef650f3952c3728f8229892c2eb4586671fbf75':	'Romain',
	'0x0413fd0c8fc2f6dded299aa581631deba55f2533':	'Houvet',
	'0xc592c0ab934d25125d5076df9f06ac29348e6d5e':	"Pierre",
}
var abiArray = [{"constant":false,"inputs":[],"name":"getEnergyConsumption","outputs":[{"name":"energyBal","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ret","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"energy","type":"uint256"}],"name":"consumeEnergy","outputs":[{"name":"EnergyBal","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"seller","type":"address"},{"name":"energy","type":"uint256"}],"name":"buyEnergy","outputs":[{"name":"transactionOK","type":"bool"}],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"adrs","type":"address"}],"name":"sendEther","outputs":[{"name":"","type":"bool"}],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"kwh","type":"uint256"}],"name":"setProduction","outputs":[{"name":"EnergyBal","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getRate","outputs":[{"name":"energyRate","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getSold","outputs":[{"name":"energySold","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getEnergyBalance","outputs":[{"name":"energyBal","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getGain","outputs":[{"name":"finneyGain","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"receiveEther","outputs":[{"name":"","type":"bool"}],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"adrs","type":"address"}],"name":"getSent","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":true,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"kwh","type":"uint256"}],"name":"Prod","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"energy","type":"uint256"}],"name":"Cons","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"energy","type":"uint256"}],"name":"Buy","type":"event"}];