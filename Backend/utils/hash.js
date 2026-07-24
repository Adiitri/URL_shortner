// import {randomBytes, createHmac} from 'crypto'
import argon2 from "argon2";

// export function hashedPasswordWithSalt(password, userSalt= undefined){
//     //generate salt
//     const salt=userSalt ?? randomBytes(256).toString('hex');
//     const hashedPassword=createHmac('sha256', salt)  // creates system
// .update(password).digest('hex');                     // feed data and generate hash

// return {salt, password: hashedPassword};
// }
export async function hashPassword(password) {
    return await argon2.hash(password, {
      type: argon2.argon2id,
    });
  }
  
  export async function verifyPassword(passwordHash, password) {
    return await argon2.verify(passwordHash, password);
  }