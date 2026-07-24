import express from 'express'
import {eq} from 'drizzle-orm'
import {urlsTable} from '../models/index.js'
import {db} from '../db/index.js'

const router=express.Router();
router.get('/:shortCode', async function (req,res){
    // login not mandate
    const code= req.params.shortCode;
    const [result]= await db.select({
    targetURL:urlsTable.targetURL
    }).from(urlsTable).where(eq(urlsTable.shortCode,code));

    if(!result){
    return res.status(404).json({error: 'URL not found'});
    }
    return res.redirect(result.targetURL);
});
export default router;