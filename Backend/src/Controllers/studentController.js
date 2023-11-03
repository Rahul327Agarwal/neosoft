const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const Student = require("../Models/studentModel");

const staticPath = path.join(__dirname, "../../public");
const viewPath = path.join(__dirname, "../../templates/views");
const partialsPath = path.join(__dirname, "../../templates/partials");

const operatorMappings = {
  gt: "$gt",
  gte: " $gte",
  lt: "$lt",
  lte: "$lte",
};

app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.json());

hbs.registerPartials(partialsPath);

app.get("/:id", async (req, res) => {
  try {
    if (Object.keys(req.query).length === 0) {
      const searchedData = await Student.find();
      res.status(200).send({ result: searchedData });
    }
    const { searchBy, searchValue } = req.query;
    const { key, value } = JSON.parse(searchBy);
    if (key && key === "marks") {
      let query = {
        [key]: { [operatorMappings[value]]: parseInt(searchValue) },
      };
      const searchedData = await Student.find(query)
        .sort({ email: 1 })
        .select({ email: 1 });
      res.status(200).send({ result: searchedData });
    } else {
      const searchedData = await Student.find({ [searchBy.key]: searchValue })
        .select({ name: 1 })
        .limit(1);
      res.status(200).send({ result: searchedData });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
});

app.post("/", async (req, res) => {
  try {
    req.body.contact = parseInt(req.body.contact);
    const responseFromData = await Student.create(req.body);
    if (responseFromData) {
      res
        .status(200)
        .send({ message: "Data created successfully", data: responseFromData });
    } else {
      res.status(500).send({ error: "Data creation failed" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedDocument = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    res
      .status(200)
      .send({ message: "Data Updated Successfully", response: updatedData });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedDocument = await Student.findByIdAndDelete(_id);
    if (!deletedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    return res.status(200).send({
      message: "Data Deleted Successfully",
      response: deletedDocument,
    });
  } catch (error) {
    res.status(500).send({ message: "Some Error", error });
  }
});

// here we are gicing path for all the static files/images that will be used in your hbs file.
// keeping this at last otherwise this will be run at the top
app.use(express.static(staticPath));

module.exports = app;
