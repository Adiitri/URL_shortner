import jwt from 'jsonwebtoken';
import { userTokenSchema} from '../validation/token.validation.js'
import 'dotenv/config';

const   JWT_SECRET=process.env.JWT_SECRET;

export function createUserToken(payload){
    // we validate the payload with the zod
    const validationResult= userTokenSchema.safeParse(payload);
    if(validationResult.error)
    throw new Error(validationResult.error.message)

    const payloadValidatedData= validationResult.data  
    const token=jwt.sign(payloadValidatedData, JWT_SECRET);

    return token;
}
export function validateUserToken(token){
    try {
        const payload= jwt.verify(token, JWT_SECRET) //use same sk that is used during siging
        return payload   
    } catch (error) { 
        // verification failed
        return null;
    }

}