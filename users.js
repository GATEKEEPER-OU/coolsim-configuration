// const async = require('async');
import axios from 'axios';
import random from '@turf/random';



// southWest:[latitude, longitude], northEast:[latitude, longitude]
const bbox = [-0.7138101195,52.0217227662,-0.7044157712,52.0275801162];



export default class Users{

    constructor(){
        this.userServer = axios.create({
            baseURL: 'http://localhost:3000/api',
            timeout: 5000
        });
    }

    // generate # random users
    async generate(totalUsers = 1){
        const userGenerator = this._createUser();
        let users = [];
        // console.log(`Done initializing generators`);
        if(userGenerator.next){
            console.log(`Start generating users...`);

            for( let i = 0; i < totalUsers; i++ ){
                // get a user
                let user = await userGenerator.next();
                // check if there is at least a person in the generated list
                // get the first one of the list
                if(user){
                    users.push(user.value);
                }else{
                    return new Error('Not possible to generate users');
                }
                // console.log(user);

                console.log(`Generated users: ${i + 1} of ${totalUsers}`);
            }
            console.log(`Generated ${totalUsers} users`);
        }else{
            return new Error('Not possible to generate users');
        }
        return users;
    }




    // generate random user
    async * _createUser(num = 1) {
        const params = `?nat=gb&results=${num}`;
        while(true){
            let users = await this.userServer.get(params).then(({status,statusText,data})=>{
                // console.log(`Status: ${statusText}`);
                // console.log(`Number of new users received:`,data.info.results);

                if(status != 200){
                    return new Error(`Couldn't get users :(`);
                }

                if(data.info.results >= num){
                    return data.results;
                }
                return new Error(`Couldn't get users :(`);
            }).catch((err)=>{
                console.log("ERROR in getting users from the random service:",err);
                return err;
            });
            // console.log(`Got users ${users.length}`);
            yield users;
        }
    }

}










// generator role
export function* getRole() {
    // init
    let indexRole = 0;
    // generate mins
    while(indexRole < roles.length){
        let role = roles[indexRole];
        let roleMap = rolesMap.get(role.label);
        // does not have a min
        if(!role.min){
            indexRole++;
        } else if(rolesMap.counter >= role.min){
            // the min is fulfilled
            indexRole++;
        } else {
            // increment counter and yield role
            roleMap.counter++;
            yield role.label;
        }
    }
    // generate the rest of the roles
    // extract a default role
    const defaultRole = roles.reduce((defaultRole,role)=>{
        if(defaultRole){return defaultRole;}
        if(!role.type){return defaultRole;}
        return role.label;
    },null);
    const rates = ratesMap.keys();
    // console.log('default role ',defaultRole);
    while(true){
        // generate a rate (between 0 and 1)
        let rolerate = Math.random();
        // if new rate is higher than the previous && lower than the math.random
        // then new rate is the new candidate
        let keyrate = rates.reduce((r,v) => {
            return r < v && v <= rolerate ? v : r;
        }, 0);
        // get label of the role
        let role = rolesMap.get(keyrate);
        // lower discount
        rolesMap.get(role).discount--;
        // send new role
        yield role;
    }
}

// generate random location
export function* getLocation (bbox) {
    while(true){
        // return [longitude,latitude]
        let position = random.randomPosition(bbox);
        yield {coordinates: {longitude:position[0].toString(),latitude:position[1].toString()} };
    }
}