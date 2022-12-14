const { utils } = require('../utils/web3');
const { deploy } = require('../utils/contract');
const { NFTENCRYPTION, EVTENCRYPTION } = require('../utils/config');
const { mint_token, mint_EVT } = require('./call');

async function main(){
    const price = await utils.parseEther('1');
    const TokenContract = await deploy(NFTENCRYPTION.path, NFTENCRYPTION.name, [price.toString()])
    console.log("TokenAddress: " + TokenContract.address);
    await mint_token()
    const EVTContract = await deploy(EVTENCRYPTION.path, EVTENCRYPTION.name, [TokenAddress])
    console.log("CONTRACT_ADDRESS: " + EVTContract.address);
    await mint_EVT()
    return TokenContract.address, EVTContract.address
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });