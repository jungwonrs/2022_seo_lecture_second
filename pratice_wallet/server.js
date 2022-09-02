var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var Web3 = require('web3');
var ethTx = require('ethereumjs-tx');

//besu
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
//ganche
//var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

const address = '269aea26EF44Fd5aF096510A048e3b4E465FB6A4'
const priv_key = Buffer.from('74c3051c1bc21f22791b78b8eeaaad079d7091e0a4785f23d031c495ce5af7c2','hex')

var ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol_",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "mint_",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.get('/deploy', function(req, res){
  res.sendFile(__dirname+"/deploy.html")
})

app.post('/deploy', function(req, res){
  var name_ = req.body.tn;
  var symbol_ = req.body.ts;
  var mint_ = req.body.supply;

  var erc20Contract = new web3.eth.Contract([{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"mint_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]);
  var erc20 = erc20Contract.deploy({
       data: '0x60806040523480156200001157600080fd5b506040516200192f3803806200192f833981810160405281019062000037919062000341565b82600390805190602001906200004f929190620001fc565b50816004908051906020019062000068929190620001fc565b506200007b33826200008460201b60201c565b505050620006c0565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415620000f7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000ee9062000413565b60405180910390fd5b6200010b60008383620001f260201b60201c565b80600260008282546200011f9190620004c2565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620001d2919062000435565b60405180910390a3620001ee60008383620001f760201b60201c565b5050565b505050565b505050565b8280546200020a906200055f565b90600052602060002090601f0160209004810192826200022e57600085556200027a565b82601f106200024957805160ff19168380011785556200027a565b828001600101855582156200027a579182015b82811115620002795782518255916020019190600101906200025c565b5b5090506200028991906200028d565b5090565b5b80821115620002a85760008160009055506001016200028e565b5090565b6000620002c3620002bd846200047b565b62000452565b905082815260208101848484011115620002e257620002e16200065d565b5b620002ef84828562000529565b509392505050565b600082601f8301126200030f576200030e62000658565b5b815162000321848260208601620002ac565b91505092915050565b6000815190506200033b81620006a6565b92915050565b6000806000606084860312156200035d576200035c62000667565b5b600084015167ffffffffffffffff8111156200037e576200037d62000662565b5b6200038c86828701620002f7565b935050602084015167ffffffffffffffff811115620003b057620003af62000662565b5b620003be86828701620002f7565b9250506040620003d1868287016200032a565b9150509250925092565b6000620003ea601f83620004b1565b9150620003f7826200067d565b602082019050919050565b6200040d816200051f565b82525050565b600060208201905081810360008301526200042e81620003db565b9050919050565b60006020820190506200044c600083018462000402565b92915050565b60006200045e62000471565b90506200046c828262000595565b919050565b6000604051905090565b600067ffffffffffffffff82111562000499576200049862000629565b5b620004a4826200066c565b9050602081019050919050565b600082825260208201905092915050565b6000620004cf826200051f565b9150620004dc836200051f565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115620005145762000513620005cb565b5b828201905092915050565b6000819050919050565b60005b83811015620005495780820151818401526020810190506200052c565b8381111562000559576000848401525b50505050565b600060028204905060018216806200057857607f821691505b602082108114156200058f576200058e620005fa565b5b50919050565b620005a0826200066c565b810181811067ffffffffffffffff82111715620005c257620005c162000629565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b620006b1816200051f565b8114620006bd57600080fd5b50565b61125f80620006d06000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461016857806370a082311461019857806395d89b41146101c8578063a457c2d7146101e6578063a9059cbb14610216578063dd62ed3e14610246576100a9565b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100fc57806323b872dd1461011a578063313ce5671461014a575b600080fd5b6100b6610276565b6040516100c39190610d20565b60405180910390f35b6100e660048036038101906100e19190610b6a565b610308565b6040516100f39190610d05565b60405180910390f35b61010461032b565b6040516101119190610e22565b60405180910390f35b610134600480360381019061012f9190610b17565b610335565b6040516101419190610d05565b60405180910390f35b610152610364565b60405161015f9190610e3d565b60405180910390f35b610182600480360381019061017d9190610b6a565b61036d565b60405161018f9190610d05565b60405180910390f35b6101b260048036038101906101ad9190610aaa565b6103a4565b6040516101bf9190610e22565b60405180910390f35b6101d06103ec565b6040516101dd9190610d20565b60405180910390f35b61020060048036038101906101fb9190610b6a565b61047e565b60405161020d9190610d05565b60405180910390f35b610230600480360381019061022b9190610b6a565b6104f5565b60405161023d9190610d05565b60405180910390f35b610260600480360381019061025b9190610ad7565b610518565b60405161026d9190610e22565b60405180910390f35b60606003805461028590610f52565b80601f01602080910402602001604051908101604052809291908181526020018280546102b190610f52565b80156102fe5780601f106102d3576101008083540402835291602001916102fe565b820191906000526020600020905b8154815290600101906020018083116102e157829003601f168201915b5050505050905090565b60008061031361059f565b90506103208185856105a7565b600191505092915050565b6000600254905090565b60008061034061059f565b905061034d858285610772565b6103588585856107fe565b60019150509392505050565b60006001905090565b60008061037861059f565b905061039981858561038a8589610518565b6103949190610e74565b6105a7565b600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6060600480546103fb90610f52565b80601f016020809104026020016040519081016040528092919081815260200182805461042790610f52565b80156104745780601f1061044957610100808354040283529160200191610474565b820191906000526020600020905b81548152906001019060200180831161045757829003601f168201915b5050505050905090565b60008061048961059f565b905060006104978286610518565b9050838110156104dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104d390610e02565b60405180910390fd5b6104e982868684036105a7565b60019250505092915050565b60008061050061059f565b905061050d8185856107fe565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610617576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161060e90610de2565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610687576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067e90610d62565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516107659190610e22565b60405180910390a3505050565b600061077e8484610518565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146107f857818110156107ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e190610d82565b60405180910390fd5b6107f784848484036105a7565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561086e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086590610dc2565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156108de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108d590610d42565b60405180910390fd5b6108e9838383610a76565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561096f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161096690610da2565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610a5d9190610e22565b60405180910390a3610a70848484610a7b565b50505050565b505050565b505050565b600081359050610a8f816111fb565b92915050565b600081359050610aa481611212565b92915050565b600060208284031215610ac057610abf610fe2565b5b6000610ace84828501610a80565b91505092915050565b60008060408385031215610aee57610aed610fe2565b5b6000610afc85828601610a80565b9250506020610b0d85828601610a80565b9150509250929050565b600080600060608486031215610b3057610b2f610fe2565b5b6000610b3e86828701610a80565b9350506020610b4f86828701610a80565b9250506040610b6086828701610a95565b9150509250925092565b60008060408385031215610b8157610b80610fe2565b5b6000610b8f85828601610a80565b9250506020610ba085828601610a95565b9150509250929050565b610bb381610edc565b82525050565b6000610bc482610e58565b610bce8185610e63565b9350610bde818560208601610f1f565b610be781610fe7565b840191505092915050565b6000610bff602383610e63565b9150610c0a82610ff8565b604082019050919050565b6000610c22602283610e63565b9150610c2d82611047565b604082019050919050565b6000610c45601d83610e63565b9150610c5082611096565b602082019050919050565b6000610c68602683610e63565b9150610c73826110bf565b604082019050919050565b6000610c8b602583610e63565b9150610c968261110e565b604082019050919050565b6000610cae602483610e63565b9150610cb98261115d565b604082019050919050565b6000610cd1602583610e63565b9150610cdc826111ac565b604082019050919050565b610cf081610f08565b82525050565b610cff81610f12565b82525050565b6000602082019050610d1a6000830184610baa565b92915050565b60006020820190508181036000830152610d3a8184610bb9565b905092915050565b60006020820190508181036000830152610d5b81610bf2565b9050919050565b60006020820190508181036000830152610d7b81610c15565b9050919050565b60006020820190508181036000830152610d9b81610c38565b9050919050565b60006020820190508181036000830152610dbb81610c5b565b9050919050565b60006020820190508181036000830152610ddb81610c7e565b9050919050565b60006020820190508181036000830152610dfb81610ca1565b9050919050565b60006020820190508181036000830152610e1b81610cc4565b9050919050565b6000602082019050610e376000830184610ce7565b92915050565b6000602082019050610e526000830184610cf6565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610e7f82610f08565b9150610e8a83610f08565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610ebf57610ebe610f84565b5b828201905092915050565b6000610ed582610ee8565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015610f3d578082015181840152602081019050610f22565b83811115610f4c576000848401525b50505050565b60006002820490506001821680610f6a57607f821691505b60208210811415610f7e57610f7d610fb3565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600080fd5b6000601f19601f8301169050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b61120481610eca565b811461120f57600080fd5b50565b61121b81610f08565b811461122657600080fd5b5056fea2646970667358221220e6611ea7ec4d4e5cc7d132b734074a3bb9ab5d57fe15019218a05ae2ed91c19964736f6c63430008070033',
       arguments: [
            name_,
            symbol_,
            mint_,
       ]
  })

  var set_string_byte_code = erc20.encodeABI();

  web3.eth.getTransactionCount (address, "pending", (err, nonce)=>{
    var Raw_Tx = {
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(1000),
      gasLimit: web3.utils.toHex(3000000),
      data: set_string_byte_code,
      from: address
    };

    var Signature = new Buffer.from(priv_key, "hex");
    var Make_Tx = new ethTx(Raw_Tx);
    Make_Tx.sign(Signature);

    var Serialized_Tx = Make_Tx.serialize();
    var Raw_Tx_Hex = '0x' + Serialized_Tx.toString('hex');

    web3.eth.sendSignedTransaction(Raw_Tx_Hex).on('receipt', receipt => {
      console.log ('receipt', receipt);
    }) //sendsigned transacton 끝

  }) // get transaction count 끝

}) //post 끝

app.get('/send', function(req, res){
  res.sendFile(__dirname+"/send.html");
})

app.post('/send', function(req, res){
  var contract_address = "0x4C0fcf4F2c50eD19e9E08F479a9d1F7dE9f8fc8A";
  var contract = new web3.eth.Contract(ABI, contract_address);

  var set_contract = contract.methods.transfer(req.body.address, req.body.value);

  var set_contract_byte = set_contract.encodeABI();

  web3.eth.getTransactionCount(address, "pending", (err, nonce) => {
    var Raw_Tx = {
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(1000),
      gasLimit: web3.utils.toHex(3000000),
      data: set_contract_byte,
      from: address,
      to: contract_address
    };

    var Signature = new Buffer.from(priv_key, "hex");
    var Make_Tx = new ethTx(Raw_Tx);
    Make_Tx.sign(Signature);

    var Serialized_Tx = Make_Tx.serialize();
    var Raw_Tx_Hex = '0x' + Serialized_Tx.toString('hex');

    web3.eth.sendSignedTransaction(Raw_Tx_Hex).on('receipt', receipt =>{
      console.log('receipt: ', receipt)
    })
  })
})

app.get('/balance', function(req, res){
	res.sendFile(__dirname+"/balance.html")
})

app.post('/balance', function(req, res){
	var contract_address = "0x4C0fcf4F2c50eD19e9E08F479a9d1F7dE9f8fc8A"
	var contract = new web3.eth.Contract(ABI, contract_address);

	contract.methods.balanceOf(req.body.address).call().then(data =>{

		var decimal = Math.pow(10, 1)
		var new_data = data/decimal

		res.send("balance= " + new_data)
	})

})


var server = app.listen(3000, function(){
  console.log("server is working");
})
