// import { make$ReturningResponseMapper } from 'drizzle-orm';
import express from 'express'
import {shortenPostReqBodySchema} from '../validation/request.validation.js'
import {db} from '../db/index.js'
import {nanoid} from 'nanoid'
import {eq,and} from 'drizzle-orm'
import { ensureAuthentication } from '../middlewares/auth.middleware.js'
import {urlsTable, usersTable} from '../models/index.js'

const router= express.Router()
router.post('/shorten',ensureAuthentication ,async function (req,res, ){
    //console.log("req.body =", req.body);
    
const validatedUser=await shortenPostReqBodySchema.safeParseAsync(req.body);
if(validatedUser.error)
return res.status(400).json({error: validatedUser.error});

const {url}= validatedUser.data;

const [result]=await db.insert(urlsTable).values({
    shortCode: nanoid(6),
    targetURL: url,
    userId: req.user.id,
}).returning({ id: urlsTable.id, shortCode: urlsTable.shortCode, targetURL: urlsTable.targetURL });
return res.status(201).json({
    message: " Short URL created successfully",
    id: result.id, 
    shortCode:result.shortCode,
    targetURL: result.targetURL,
});

});
router.get('/codes',ensureAuthentication,async function(req,res){
const codes=await db.select()  //select everything
.from(urlsTable)
.where(eq(urlsTable.userId,req.user.id ));

return res.json({codes});
})
router.delete('/:id',ensureAuthentication,async function(req,res){
const id=req.params.id;
const userId= req.user.id;
await db.delete(urlsTable).where(and(eq(urlsTable.id, id),eq(urlsTable.userId,userId)));
return res.status(200).json({message: 'Record deleted successfully!'});

});


export default router;