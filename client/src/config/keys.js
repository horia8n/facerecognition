import prod from './prod';
import dev from './dev';

let keys = dev;

if(process.env.NODE_ENV === "production"){
    keys =  prod;
}

export default keys;