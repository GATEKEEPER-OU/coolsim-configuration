import USER from "./User/index.js";
import DEVICE from "./Device/index.js";
import LOCATION from "./Location/index.js";
// import store

// todo create entry in the master db with list of simulations
// todo copy templates in the details DB of the simulation

// class config
// constructor > simulation id > json
// set > update and save new json
// get > return config 
// return config 

// export default class Config {
    
//     constructor (simulationId){
//         // check or create new simulation
//     }
//     // set setAge(age){
//     // }
//     // get list(){
//     // };
//     static get simulations(){
//         // return simulations in store
//     }
// }



const Bootstrap = {
    user: USER,
    device: DEVICE,
    location: LOCATION
};

export default Bootstrap;