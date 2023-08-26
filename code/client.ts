import { MongoClient } from "mongodb";


const uri = "mongodb://localHOST:27017";
const client = new MongoClient(uri);

export {client};