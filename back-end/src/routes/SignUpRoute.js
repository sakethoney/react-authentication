import { getDbConnection } from "../db";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const singUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async(req, res) => {
        const {email, password} = req.body;
        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({email})

        if(user) {
            res.sendStatus(409);
        }
        const passwordHash = await bcrypt.hash(password,10);

        const startingInfo = {
            hairColor:'',
            favoriteFood: '',
            bio: '',
        };

        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            info: startingInfo,
            isVerified: false,
        });

        jwt.sign({
            id: insertedId,
            email,
            info: startingInfo,
            isVerified: false,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2d',
        },
        (err,token)=>{
            if(err){
                return res.status(500).send(err);
            }
            res.status(200).json({token});
        }
        );
        const {insertedId} = result;

    }
}