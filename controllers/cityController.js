import City from '../models/city.js'

export const addCity = async (req, res) => {
  const { name, block } = req.body;
  try {
    const city = await City.findOneAndUpdate({ name }, { block }, { upsert: true, new: true });
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCityBlocks = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// module.exports = { addCity, getCityBlocks };
