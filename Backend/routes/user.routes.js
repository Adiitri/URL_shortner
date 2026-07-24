import express from 'express'
import { getUserByEmail, createUser} from '../services/user.service.js';
import {signupPostReqBodySchema, loginPostRequestBodySchema} from '../validation/request.validation.js'
import { hashPassword} from '../utils/hash.js';
import {createUserToken} from '../utils/token.js'

const router= express.Router();

router.post('/signup',async(req,res)=>{
const validationResult= await signupPostReqBodySchema.safeParseAsync(req.body);

    if(validationResult.error){  // if validation schema has error
        return res.status(400).json({ error: validationResult.error.format() });
    }

    const {firstname, lastname,email,password}=validationResult.data;
    // if(!firstname)
    //     return res.status(400).json({ error: 'please enter first name'});

    const existingUser=await getUserByEmail(email);

    if(existingUser)
    return res.status(400).json({error: `User with email: ${email} already exists!`});

    const hashedPassword=await hashPassword(password);

    const user=await createUser(firstname, lastname, email,hashedPassword);

    return res.status(201).json({data: {userId: user.id }});

});

router.post('/login', async(req, res)=>{
const validationResult= await loginPostRequestBodySchema.safeParseAsync(req.body)

if(validationResult.error){
    return res.status(400).json({ error:validationResult.error });
}

const {email, password } = validationResult.data;
const user=await getUserByEmail(email);

if(!user){
    return res
    .status(404)
    .json({error: `User with email ${email} does not exists`});
}
//const {password: hashedPassword} = hashPassword(password, user.salt );
const isValid = await verifyPassword(
           user.password,   // correct
           password       // user gave (plain password)
  );
  if (!isValid) {
    return res.status(401).json({message: "Invalid email or password !" });
  }

// else - generate token
const token= await createUserToken({id: user.id});

return res.json({token});
});

export default router;
 