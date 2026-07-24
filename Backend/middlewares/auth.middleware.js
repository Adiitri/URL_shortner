import { validateUserToken } from "../utils/token.js";
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export function authenticationMiddleware(req, res, next){
    const authHeader = req.headers['authorization']
    if(!authHeader) return next();

    if(! authHeader.startsWith('Bearer'))
        return res.status(400).json({error: 'Authorization header must start with "Bearer" '})

    const [b, token]=authHeader.split(' ');   // [Bearer , token] 
    const payload= validateUserToken(token);
    req.user= payload;
    next();    
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
// check if authenticated or not
export function ensureAuthentication(req, res, next){
    if(!req.user || !req.user.id)
        return res.status(401).json({message: 'User not authenticated !! Please loggin'});
    next();
}
