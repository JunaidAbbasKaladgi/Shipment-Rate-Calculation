import mongoose from './config/db.js'
import Charges from './models/Charges.model.js'
import Regions from './models/Regions.model.js'

const chargesData = {
  oda1: { base: 750, per_kg: 5 },
  oda2: { base: 1500, per_kg: 7 },
  fuel_surcharge: 0.2,
  docket_charge: 100,
  appointment_charge: { base: 1200, per_kg: 5 },
  fov: {
    owner_risk: { percentage: 0.005, minimum: 50 },
    carrier_risk: { percentage: 0.02, minimum: 300 },
  },
  max_liability: 2000,
  minimum_weight: { weight: 40, freight: 400 },
};

const regionsData = {
  regions: {
    Malwa: { Malwa: 5, Nimar: 5, Bhopal: 6, Mahakoshal: 8 },
    Nimar: { Malwa: 5, Nimar: 5, Bhopal: 6, Mahakoshal: 9 },
  },
};

const populateData = async () => {
  try {
    await Charges.create(chargesData);
    await Regions.create(regionsData);
    console.log('Data inserted successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting data:', error.message);
    mongoose.disconnect();
  }
};

populateData();
