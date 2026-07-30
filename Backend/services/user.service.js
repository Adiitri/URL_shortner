// services related to crud operation related to user
import {db} from '../db/index.js'
import {usersTable} from '../models/user.model.js'
import {eq} from 'drizzle-orm'

// checking if user with same email exists or not
export async function getUserByEmail(email){ 
const [existingUser]=await db
.select({
    id:usersTable.id,
    firstname: usersTable.firstname,
    lastname: usersTable.lastname,
    email:usersTable.email,
    password: usersTable.password,

})
.from(usersTable)
.where(eq(usersTable.email,email));

return existingUser;  // return undefined if no matches found
}

export async function createUser(firstname, lastname,email,hashedPassword){ 
    const [user] = await db.insert(usersTable).values({
        firstname,
        lastname,
        email,
        password: hashedPassword,
    }).returning({ id: usersTable.id});
    
    return user;  
    }
