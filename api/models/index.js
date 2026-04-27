import db from '../config/db.js';

import Manga from './Manga.js';
import User from './User.js';
import Game from './Game.js';
import Anime from './Anime.js';
import Category from './Category.js';
import Gender from './Gender.js';

Manga.belongsToMany(User, { through: 'UserManga' });
User.belongsToMany(Manga, { through: 'UserManga' });

Game.belongsToMany(User, { through: 'UserGame' });
User.belongsToMany(Game, { through: 'UserGame' });

Anime.belongsToMany(User, { through: 'UserAnime' });
User.belongsToMany(Anime, { through: 'UserAnime' });

Game.belongsTo(Category);
Manga.belongsTo(Category);
Anime.belongsTo(Category);

Category.hasMany(Game);
Category.hasMany(Manga);
Category.hasMany(Anime);

Game.belongsTo(Gender);
Manga.belongsTo(Gender);
Anime.belongsTo(Gender);

Gender.hasMany(Game);
Gender.hasMany(Manga);
Gender.hasMany(Anime);


db.sync({ alter: true });

export {
    Manga,
    User,
    Game,
    Anime,
    Category,
    Gender
}