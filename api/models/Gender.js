import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Gender = db.define('Gender', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

export default Gender;