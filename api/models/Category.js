import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Category = db.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

export default Category;