const fs = require('fs');
const solc = require('solc');
const { ContractFactory, wallet, Contract } = require('./web3');
const ex = {
    getCompile: function(filepath, name){
        const content = fs.readFileSync(filepath, 'utf8');
        const input = {
            language: 'Solidity',
            sources: {
                'contract': { content }
            },
            settings: {
                outputSelection: {
                    '*': {'*': ['*']}
                }
            }
        }
        const { contracts } = JSON.parse(
            solc.compile(JSON.stringify(input))
        );
        const contract = contracts['contract'][name];
        return {
            abi: contract.abi,
            bytecode: contract.evm.bytecode.object
        }
    },
    deploy: async function(contractPath, contractName, arguments){
        console.log("Start Deploy Contract: " +contractName);
        const contract = ex.getCompile(contractPath, contractName);
        const account = wallet.address;
        console.log("Account: " + account);
        /* 3. Send Smart Contract To Blockchain */
        let factory = await new ContractFactory(contract.abi, contract.bytecode, wallet)
        let c;
        if(arguments) {
            c = await factory.deploy(...arguments);
        } else {
            c = await factory.deploy()
        }
        return c;
    },
    getContract: async function(contractPath, contractName, address){
        const contract = ex.getCompile(contractPath, contractName);
        return new Contract(address, contract.abi, wallet);
    }
}
module.exports = ex