import express from 'express'
const router = express.Router();

import getVerified from '../controllers/users/getVerified.js'
import signIn from '../controllers/users/signIn.js'
import createUser from '../controllers/users/createUser.js'

router.get('/' , getVerified);
router.post('/signUp', createUser);
router.post('/signIn', signIn);

export default router;