import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Manga = db.define('Manga', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    release_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nbVolumes: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Manga;