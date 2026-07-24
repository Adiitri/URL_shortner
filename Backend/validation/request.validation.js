// create schemas for incoming request
import {z} from "zod";

export const signupPostReqBodySchema = z.object({
    // what we expect the i/p to be 
    firstname: z.string(),
    lastname: z.string().optional(),
    email: z.email(),
    password: z.string().min(8),
});

export const loginPostRequestBodySchema= z.object({
    email: z.email(),
    password:z.string().min(3),

});

export const shortenPostReqBodySchema=z.object({
    url : z.url(),
    
});

