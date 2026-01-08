import express from 'express'
import {verifyUserToken} from '../controllers/users/getVerified.js'
const router = express.Router();

import getAllLeads from '../controllers/leads/getAllLeads.js'
import getLeadById from '../controllers/leads/getLeadById.js'
import createLead from '../controllers/leads/createLead.js'
import updateLead from '../controllers/leads/updateLead.js'
import deleteLead from '../controllers/leads/deleteLead.js'

router.use(async (req, res, next)=>{
  const user = await verifyUserToken(req);
  if(user){
    req.user = user;
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token!' });
  }
})

router.get('/', getAllLeads);
router.get('/:id', getLeadById);
router.post('/', createLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

export default router;
