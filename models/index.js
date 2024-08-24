const { Sequelize } = require("sequelize");
const parameters = require("../config/config");

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
db.oficina = require("./oficina")(sequelize, Sequelize);

// Establecer relaciones
db.oficina.hasMany(db.persona, { foreignKey: 'oficinaId' });
db.persona.belongsTo(db.oficina, { foreignKey: 'oficinaId' });

module.exports = db;