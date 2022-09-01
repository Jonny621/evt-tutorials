const { wallet } = require('../utils/web3')
const { 
    EVTCOMMON, EVTACOMMON,
    EVT_ADDRESS, EVTA_ADDRESS
} = require('../utils/config')
const { getContract } = require('../utils/contract');

module.exports = {
    mintEVT: async function(){
        const myContract = await getContract(EVTCOMMON.path, EVTCOMMON.name, EVT_ADDRESS);
        const contractWithSigner = myContract.connect(wallet);
        let tx = await contractWithSigner.safeMint(wallet.address);
        console.log(tx);
        console.log('=======Mint EVT Success=======');
    },
    mintEVTA: async function(amount){
        const myContract = await getContract(EVTACOMMON.path, EVTACOMMON.name, EVTA_ADDRESS);
        const contractWithSigner = myContract.connect(wallet);
        let tx = await contractWithSigner.safeMint(wallet.address, amount);
        console.log(tx);
        console.log('=======Mint EVTA Success=======');
    },

}
