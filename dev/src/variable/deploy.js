const { deploy } = require('../utils/contract');
const { EVTVARIABLE } = require('../utils/config');

async function main(){
    const EVTContract = await deploy(EVTVARIABLE.path, EVTVARIABLE.name)
    console.log("VARIABLE_ADDRESS: " + EVTContract.address);
    return EVTContract.address;
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });