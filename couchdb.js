// setup databases
import Nano from 'nano';

export const CouchDB = Nano('http://127.0.0.1:5984');