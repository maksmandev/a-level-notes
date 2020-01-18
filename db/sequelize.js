const Sequelize = require("sequelize");
const NotesModel = require("../models/note");

const sequelize = new Sequelize("QkxgxWlv8y", "QkxgxWlv8y", "bEK0dgs4NM", {
  host: "remotemysql.com",
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
