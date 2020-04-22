const couch = require('./init_couch');
const initUsers = require('./init_users');



// todo create simulation
// given number of roles and age
// bbox
// size of population
// subscribe users to the simulation
// spacename of the simulation that can be shared by multiple simulations



// init dbs
const app = async ()=>{
    // init databases and values
    await bootstrapDB();

    // todo
};

app();






// #ZONE functions
async function bootstrapDB() {
    const numUsers = 10;

    let r = await couch.init().then(
        async _=>{
            console.log(`All databases initalized!`);
            return true;
        }).catch(async err=>{
            console.error(err);
            return err;
        });

    r = await bootstrapUsers(numUsers);


    return r
}

async function bootstrapUsers(num) {
    let r = initUsers.init(num).then(status=>{
        console.log(status);
        return status;
    }).catch(err=>{
        console.error(err);
        return err;
    });
    return r;
}
// #ZONEEND functions