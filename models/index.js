const { Sequelize } = require("sequelize");
const parameters = require("../config/config");
const { param } = require("../routes/personaRoutes");

const sequelize = new Sequelize(
    parameters.database,
    parameters.username,
    parameters.password, {
        host: parameters.host,
        dialect: parameters.dialect,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.persona = require("./persona")(sequelize, Sequelize);

module.exports = db;