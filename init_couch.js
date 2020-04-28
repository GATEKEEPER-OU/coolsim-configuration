import {CouchDB as couch} from "./couchdb.js";

import util from 'util';
import allSettled from 'promise.allsettled';

const databases = ['simulations','planners','users','events','messages'];

const destroyDB  = util.promisify(couch.db.destroy);
const createDB  = util.promisify(couch.db.create);



export const init = async () => initDBs()
    .then(results => {
        // console.log(results);
        return results.forEach(result=>{
            console.log("----------------",result);
            if(result.status === 'fulfilled'){
                console.log(`${result.value}`);
            } else {
                console.error(`${result.reason}`);
                throw Error(result.reason);
            }
        })
    });

export const reset = resetDatabase;
export const dbs = databases;
export const create = createDatabase;
export const destroy = destroyDatabase;




// #ZONE internal functions //
async function initDBs() {
    return allSettled( databases.map((db)=>resetDatabase(db)) );
}

async function resetDatabase(db) {
    let destroy = await destroyDatabase(db);
    let create = await createDatabase(db);
    return Promise.all([destroy,create])
        .then(results => {
            // console.log(results);
            return results.reduce( (result,partial)=> {
                return partial.status !== 'ok' ? partial : result;
            },{status:'ok',
                message:`Reset db ${db} OK`,
                statusCode: 200});
        }).catch(err=>Promise.reject(err));
}

async function destroyDatabase(db) {
    return destroyDB(db)
        .then(_=>{
            console.log(`Deleted db ${db}`);
            return Promise.resolve({
                status:'ok',
                message:`Deleted db ${db}`,
                statusCode: 200
            });
        })
        .catch((err) => {
            if (err && err.statusCode == 404) {
                console.log('nothing to delete');
                return Promise.resolve({
                    status:'ok',
                    message:`Deleted db ${db}`,
                    statusCode: 200
                });
            } else {
                console.log("??????????",err.reason);
                return Promise.reject({err});
            }
        });
}

async function createDatabase(db) {
    return createDB(db)
        .then(_=>{
            console.log(`Created db ${db}`);
            return Promise.resolve({
                status:'ok',
                message:`Created db ${db}`,
                statusCode:200
            });
        })
        .catch(err => {
            if (err && err.statusCode == 412) {
                console.log('nothing to create',err);
                return Promise.resolve({
                    status:'ok',
                    message:`${db} already exists`,
                    statusCode:200
                })
            } else {
                console.error('create error', err.reason);
                return Promise.reject({err});
            }
        });
}
// #ENDZONE


async function test() {
    await destroyDatabase('test');
    console.log('destroy database ok!');
    await createDatabase('test');
    console.log('create database ok!');
    await resetDatabase('test');
    console.log('reset database ok!');
    await destroyDatabase('test');
    console.log('cleaning test ok!');
}

test();