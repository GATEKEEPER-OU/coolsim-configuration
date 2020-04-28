import * as db from "./init_couch.js";
import * as users from './init_users.js';

// console.log("------------",db);

// todo create simulation
// given number of roles and age
// bbox
// size of population
// subscribe users to the simulation
// spacename of the simulation that can be shared by multiple simulations


const numUsers = 10;


// init dbs
const app = async ()=>{
    // init databases and values
    await bootstrapDB();

    // todo
    await bootstrapUsers(numUsers);
};

app();






// #ZONE functions
async function bootstrapDB() {
    let r = await db.init().then(
        async _=>{
            console.log(`All databases initalized!`);
            return true;
        }).catch(async err=>{

        console.error(err);
        return err;
    });

    return r
}

async function bootstrapUsers(num) {
    let r = users.init(num).then(status=>{
        console.log(status);
        return status;
    }).catch(err=>{
        console.error(err);
        return err;
    });

    return r;
}
// #ZONEEND functions