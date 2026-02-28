import { Router } from 'express';
const router = Router();
import { getClients, addClient } from '../controllers/clientController.js';

router.get('/', getClients);
router.post('/', addClient);

export default router;