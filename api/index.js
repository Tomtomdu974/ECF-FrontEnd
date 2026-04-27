import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.js';
import gameRoutes from './routes/game.js';
import mangaRoutes from './routes/manga.js';
import animeRoutes from './routes/anime.js';
import categoryRoutes from './routes/category.js';
import genderRoutes from './routes/gender.js';

const app = express();

app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/mangas', mangaRoutes);
app.use('/animes', animeRoutes);
app.use('/categories', categoryRoutes);
app.use('/genders', genderRoutes);

app.listen(3001, () => { console.log('Server started on port 3001') });