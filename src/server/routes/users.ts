import * as express from 'express';
import db from '../db';

const router = express.Router();

router.get('/:id?', async (req, res) => {

    const userid = Number(req.params.id);

    if (userid) {
        try {
            const [user] = await db.Users.one(userid);
            res.json(user);
        } catch (e) {
            console.log(e);
            res.json(e);
        }
    } else {
        try {
            const users = await db.Users.all();
            res.json(users);
        } catch (e) {
            console.log(e);
            res.json(e);
        }
    }


});



export default router;