import Users from './users.js';

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
    let users = new Users();
    // todo
    let results = await users.generate(numUsers);

    console.log(results);
};

app();