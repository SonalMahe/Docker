const playerScores = "SELECT P.name, S.score , G.title from players P JOIN scores S ON P.id = S.player_id JOIN games G ON G.id = S.game_id";


module.exports = {
  playerScores
};