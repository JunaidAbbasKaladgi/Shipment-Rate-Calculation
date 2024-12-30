import express from 'express'
import { addCity, getCityBlocks } from '../controllers/cityController.js'
const router = express.Router();

router.post('/add-city', addCity);
router.get('/city-blocks', getCityBlocks);

export default router;
