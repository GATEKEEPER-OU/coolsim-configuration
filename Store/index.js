// list of stores
// description of store for each entity type
// list of dbs to for each entity
// each db is described by
//      name of the db
//      connection, either, from, to or sync
//          - from: string with the path to the db from which it should get data
//          - to: string with the path to the db to which it should push data
//          - sync: string to the path to the db to sync with
//          - id:true, uses the agent id in the db name
//          - simulation:true uses simulation id in the db name

const STORES = new Map(Object.entries(
    {
        simulations:{
            name:"simulations", //"http://cool:sim@localhost:5984/simulations"
            mode:"memory",
            format:"default" // or fhir
        },
        diary:{ // agent manager
            simulation:true,
            name:"diary",
            mode:"file", // e.g., file, memory
            format:"fhir"
        },
        logs:{
            simulation:true,
            name:"logs",
            mode:"file",
            format:"default"
        }
    },
));


export default STORES;