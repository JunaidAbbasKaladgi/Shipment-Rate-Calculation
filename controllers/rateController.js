import Rate from '../models/rate.js'
import City from '../models/city.js'

export const calculateRate = async (req, res) => {
  const { origin, destination, weight, invoiceValue, riskType } = req.body;

  try {
    // Fetch city blocks
    const originCity = await City.findOne({ name: origin });
    const destinationCity = await City.findOne({ name: destination });

    if (!originCity || !destinationCity) {
      return res.status(400).json({ error: 'Invalid origin or destination' });
    }

    const rateEntry = await Rate.findOne({
      originBlock: originCity.block,
      destinationBlock: destinationCity.block
    });

    if (!rateEntry) {
      return res.status(400).json({ error: 'Rate not found for block combination' });
    }

    // Base freight calculation
    const baseFreight = Math.max(400, weight * rateEntry.ratePerKg);

    // Charges
    const fuelSurcharge = 0.2 * baseFreight;
    const dktCharge = 100;
    const fovCharge = Math.max(50, (riskType === 'owner' ? 0.0005 : 0.002) * invoiceValue);

    // Total
    const totalCost = baseFreight + fuelSurcharge + dktCharge + fovCharge;

    res.status(200).json({ baseFreight, fuelSurcharge, dktCharge, fovCharge, totalCost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRates = async (req, res) => {
  const { originBlock, destinationBlock, ratePerKg } = req.body;
  try {
    const rate = await Rate.findOneAndUpdate(
      { originBlock, destinationBlock },
      { ratePerKg },
      { upsert: true, new: true }
    );
    res.status(200).json(rate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRates = async (req, res) => {
  try {
    const rates = await Rate.find();
    res.status(200).json(rates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// module.exports = { calculateRate, updateRates, getRates };
