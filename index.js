import USER from "./User/index.js";
import DEVICE from "./Device/index.js";
import LOCATION from "./Location/index.js";


// todo create entry in the master db with list of simulations
// todo copy templates in the details DB of the simulation



const Bootstrap = {
    user: USER,
    device: DEVICE,
    location: LOCATION
};

export default Bootstrap;