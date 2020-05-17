const PROFILE = [
    { label:"age", type:"normal", correction:(num)=> Math.max(0,Math.floor(num*100)) },
    { label:"gender", type:"uniform", correction:(num)=> Math.floor(num*10)%2 === 0 ? "male" : "female" }
];


export default PROFILE;