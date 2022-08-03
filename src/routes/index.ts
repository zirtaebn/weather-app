import { Router } from "express";

import { home } from '../controllers/home.controller';
import { query } from '../controllers/query.controller';

const router = Router();

router.get('/', home)

router.post('/', query)

export default router;