/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const equipmentNames = require("./equipments.json");
const types = require("./type.json");
const brandNames = require("./brands.json");
const companyNames = require("./companies.json");
const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model");
const BrandModel = require("../db/brands.model");
const CompanyModel = require("../db/company.model");
const salaries = [50, 100, 101, 300, 301, 400, 401, 800, 801];

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const levelCalculator = (salary) => {
  if (salary < 101) {
    return "Junior"
  } else if (salary < 301) {
    return "Medior"
  } else if (salary < 401) {
    return "Senior"
  } else if (salary < 801) {
    return "Expert"
  } else {
    return "Godlike"
  }
}

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name,
    salary: pick(salaries),
    position: pick(positions),
  }));

  const allBrands = await BrandModel.find();
  const allCompanies = await CompanyModel.find();

  for (const employee of employees) {
    const randomBrand = pick(allBrands);
    const randomCompany = pick(allCompanies);
    employee.brand = randomBrand._id;
    employee.level = levelCalculator(employee.salary);
    employee.company = randomCompany._id;
  }

  await EmployeeModel.create(...employees);

  console.log("Employees created");
};

const populateEquipments = async () => {
  await EquipmentModel.deleteMany({});

  const equipments = equipmentNames.map((equipment) => ({
    name: equipment,
    type: pick(types),
    amount: Math.floor(Math.random() * 20) + 1,
  }));

  await EquipmentModel.create(...equipments);
  console.log("Equipments created");
};

const populateBrands = async () => {
  await BrandModel.deleteMany({});

  const brands = brandNames.map((brand) => ({
    name: brand,
  }));

  await BrandModel.create(...brands);
  console.log("Brands created");
};

const populateCompanies = async () => {
  await CompanyModel.deleteMany({});

  const companies = companyNames.map((company) => ({
    name: company,
  }));

  await CompanyModel.create(...companies);
  console.log("Companies created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEquipments();
  await populateBrands();
  await populateCompanies();
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
