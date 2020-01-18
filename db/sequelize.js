const Sequelize = require("sequelize");
const NotesModel = require("../models/note");

const sequelize = new Sequelize("notes", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Note = NotesModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  Note
};
