--Game Studio Database Schema and Queries-

create table PLAYERS(
id int PRIMARY key,
name varchar(100),
join_date DATE
);

INSERT INTO PLAYERS (id, name, join_date) VALUES
(1, 'Messi', '2024-03-05'),
(2, 'Ronaldo', '2024-03-05'),
(3, 'Mbappe', '2024-03-05'),
(4, 'Neymar', '2024-03-05'),
(5, 'Haaland', '2024-03-10');

CREATE TABLE GAMES(
id int PRIMARY key,
title varchar(100),
genre varchar(100)
);

INSERT INTO GAMES (id, title, genre) VALUES
(1, 'FIFA 24', 'Sports'),
(2, 'Call of Duty', 'Shooter'),
(3, 'Minecraft', 'Sandbox'),
(4, 'Fortnite', 'Battle Royale'),
(5, 'Rocket League', 'Sports');

CREATE TABLE SCORES(
id int PRIMARY key,
player_id INT,
game_id INT, 
FOREIGN key (player_id) REFERENCES PLAYERS(id),
FOREIGN key (game_id) REFERENCES GAMES(id),
score Int,
date_played DATE
);


INSERT INTO SCORES (id, player_id, game_id, score, date_played) VALUES
(1, 1, 1, 95, '2024-04-01'),
(2, 2, 1, 92, '2024-04-01'),
(3, 1, 3, 88, '2024-04-02'),
(4, 3, 4, 91, '2024-04-02'),
(5, 4, 2, 85, '2024-04-03'),
(6, 5, 5, 90, '2024-04-04'),
(7, 2, 3, 87, '2024-04-05');
(8, 6, 4, 0, '2024-04-05');
(9, 4, 5, 87, '2024-04-05');


select * from players;
select * from games;
select * from scores;


--gistfile2.txt

--Task 1-List All Players and Their Scores.
select P.name, S.score , G.title 
from players P
JOIN scores S ON P.id = S.player_id
JOIN games G ON G.id = S.game_id


--Task2- Find High Scores-
SELECT p.name, SUM(s.score) AS total_score
FROM PLAYERS p
JOIN SCORES s ON p.id = s.player_id
GROUP BY p.name
ORDER BY total_score DESC
LIMIT 3;


--Task 3-Players who didnt play any games
SELECT p.id, p.name
FROM PLAYERS p
LEFT OUTER JOIN SCORES s ON p.id = s.player_id
WHERE s.score = 0;

--Task 4 popular Games genre-
select  g.genre , count(g.genre) as Total
from scores s 
join games g on g.id = s.game_id
group by g.genre
order by Total DESC;


--Task 5 Recently Joined Players-
SELECT name, join_date AS DateJoined from players
where join_date > '2024-02-15'

--Task 6 -Bonus Players' Favorite Games--
 SELECT p.name, g.title, COUNT(*) AS play_count
            FROM players p
            JOIN scores s ON p.id = s.player_id
            JOIN games g ON g.id = s.game_id
            GROUP BY p.name, g.title
            ORDER BY play_count DESC;


-- --Playstation database schema and queries-
--(ID, Title, Year, Developer, Genre)
-- 3	"Minecraft"	2011	"Mojang-Studios"	"sandbox"
-- 4	"The Witcher 3: Wild Hunt"	2015	"CD Projekt Red"	"Action RPG"
-- 7	"Horizon Zero Dawn"	2017	"Guerrilla Games"	"RPG"
-- 8	"Gran Turismo 7"	2022	"Polyphony Digital"	"Racing"
-- 9	"The Last of Us Part II"	2020	"Naughty Dog"	"Action Adventure"
-- 5	"God of War"	2019	"Santa Monica Studio"	"Action Adventure"