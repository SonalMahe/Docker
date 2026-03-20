import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Welcome to this Game Studio API & Node.js and PostgreSQL");
});


//  Task 1: List All Players and Their Scores 
// Endpoint: GET /players-scores 
// Description: 
// Write a route that uses an SQL query to list all players, the games they’ve played, and their scores. Include: 
// Player’s name 
// Game title 
// Score 

app.get('/players-scores', async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT P.name, S.score , G.title 
      from players P
      JOIN scores S ON P.id = S.player_id
      JOIN games G ON G.id = S.game_id

    `);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching data from database:', error);
        res.status(500).json({ error: 'Internal  Server Error' });
    }
});



// Task 2: Find High Scorers --
// Endpoint: GET /top-players 
// Description: 
// Write a route that returns the top 3 players with the highest total scores across all games. Sort them in descending order.

app.get('/top-players', async (req, res) => {
    try {
        const result = await pool.query(`
     SELECT p.name, SUM(s.score) AS total_score
     FROM PLAYERS p
     JOIN SCORES s ON p.id = s.player_id
     GROUP BY p.name
     ORDER BY total_score DESC
     LIMIT 3;
        `);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching data from database:', error);
        res.status(500).json({ error: 'Internal  Server Error' });
    }
});


// Task 3: Players Who Didn’t Play Any Games 
// Endpoint: GET /inactive-players 
// Description: 
// Write a route that lists all players who haven’t played any games yet. 

app.get('/inactive-players', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.id, p.name
            FROM PLAYERS p
            LEFT OUTER JOIN SCORES s ON p.id = s.player_id
            WHERE s.score = 0;   
        `);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching data from database:', error);
        res.status(500).json({ error: 'Internal  Server Error' });
    }
});


// Task 4: Find Popular Game Genres 
// Endpoint: GET /popular-genres 
// Description: 
// Write a route that finds the most popular game genres based on the number of times they’ve been played. 

app.get('/popular-genres', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT g.genre , count(g.genre) as Total
            FROM scores s 
            JOIN games g on g.id = s.game_id
            GROUP by g.genre
            ORDER by Total DESC;
        `);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching data from database:', error);
        res.status(500).json({ error: 'Internal  Server Error' });
    }
});



// Task 5: Recently Joined Players 
// Endpoint: GET /recent-players 
// Description: 
// Write a route that lists all players who joined in the last 30 days. 

app.get('/recent-players', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT name, join_date AS DateJoined from players
            WHERE join_date > '2024-02-15';
        `);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching data from database:', error);
        res.status(500).json({ error: 'Internal  Server Error' });
    }
});



// Bonus Task: Players' Favorite Games 
// Endpoint: GET /favorite-games 
// Description: 
// Write a route that returns each player’s favorite game (the game they’ve played the most). 

app.get('/favorite-games', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.name, g.title, COUNT(*) AS play_count
            FROM players p
            JOIN scores s ON p.id = s.player_id
            JOIN games g ON g.id = s.game_id
            GROUP BY p.name, g.title
            ORDER BY play_count DESC;
        `);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching data from database:', error);
        res.status(500).json({ error: 'Internal  Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});