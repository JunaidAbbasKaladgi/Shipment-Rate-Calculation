import express from 'express'
import { updateRates, getRates, calculateRate } from '../controllers/rateController.js'
const router = express.Router();

router.post('/update-rates', updateRates);
router.get('/rates', getRates);
router.post('/calculate-rate', calculateRate);

export default router;
