import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Manga = db.define('Manga', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    release_year: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nbVolumes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Manga;