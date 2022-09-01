const { deploy } = require('../utils/contract');
const { EVTCOMMON, EVTACOMMON } = require('../utils/config');

async function main(){
    const EVTContract = await deploy(EVTCOMMON.path, EVTCOMMON.name)
    console.log("EVT_ADDRESS: " + EVTContract.address);

    const EVTAContract = await deploy(EVTACOMMON.path, EVTACOMMON.name)
    console.log("EVTA_ADDRESS: " + EVTAContract.address);
    return EVTContract.address, EVTAContract.address;
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });