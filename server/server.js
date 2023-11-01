require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");
const BrandsModel = require("./db/brands.model");
const CompanyModel = require("./db/company.model");

const { MONGO_URL, PORT = 8080 } = process.env;

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

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

app.get("/employees/:search", async (req, res) => {
  const searchRegex = new RegExp(`${req.params.search}`, "i");
  const employee = await EmployeeModel.find({ name: searchRegex});
  return res.json(employee);
});

app.get("/missing/", async (req, res) => {
  const employee = await EmployeeModel.find({ status: "not present"});
  return res.json(employee);
});

app.get("/api/brands/", async (req, res) => {
  const brands = await BrandsModel.find().sort({ created: "desc" });
  return res.json(brands);
});

app.post("/api/employees/", async (req, res, next) => {
  req.body.level = levelCalculator(req.body.salary);
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  req.body.level = levelCalculator(req.body.salary);
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.patch("/missing/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/equipments/", async (req, res) => {
  const equipments = await EquipmentModel.find().sort({ created: "desc" });
  return res.json(equipments);
});

app.get("/api/equipments/:id", async (req, res) => {
  const equipment = await EquipmentModel.findById(req.params.id);
  return res.json(equipment);
});

app.post("/api/equipments/", async (req, res, next) => {
  const equipment = req.body;

  try {
    const saved = await EquipmentModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/equipments/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(equipment);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/equipments/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    const deleted = await equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/companies/", async (req, res) => {
  const companies = await CompanyModel.find().sort({ created: "desc" });
  return res.json(companies);
});

app.post("/api/companies/", async (req, res, next) => {
  const company = req.body;

  try {
    const saved = await CompanyModel.create(company);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
