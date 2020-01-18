const experess = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { Note } = require("./db/sequelize");

const app = experess();
app.use(experess.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 5000;

app.get("/notes", async (req, res) => {
  const notes = await Note.findAll();
  res.status(200).json(notes);
});

app.get("/notes/:id", async (req, res) => {
  const note = await Note.findOne({ where: { id: req.params.id } });
  res.status(200).json(note);
});

app.post("/notes", async (req, res) => {
  await Note.create(req.body);
  res.status(201).send();
});

app.put("/notes/:id", async (req, res) => {
  try {
    await Note.update(
      { text: req.body.text },
      { where: { id: req.params.id } }
    );
  } catch (e) {
    console.log("TCL: e", e);
  }
  res.status(200).send();
});

app.delete("/notes/:id", async (req, res) => {
  await Note.destroy({ where: { id: req.params.id } });
  res.status(200).send();
});

app.listen(port, () => console.log(`Server listening on port: ${port}`));
