/*const { DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/sequelize');

const Sessions = sequelize.define('sessions', {
    session_id: {
        type: DataTypes.STRING(128),
        primaryKey: true
    },
    expires: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    data: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'sessions',
    timestamps: false
});

module.exports = Sessions;
*/