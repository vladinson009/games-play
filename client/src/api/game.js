import fetchApi from './fetchApi';

function getAllGames() {
  return fetchApi.get('/data/games?sortBy=title');
}
function getRecentGames() {
  return fetchApi.get(`/data/games?sortBy=_createdOn%20desc&pageSize=3`);
}
function getGameById(gameId) {
  return fetchApi.get(`/data/games/${gameId}`);
}
function deleteGameById(gameId) {
  return fetchApi.del(`/data/games/${gameId}`);
}
function createGame(game) {
  Object.values(game).forEach((el) => {
    if (el === '') {
      throw new Error('All fields are required');
    }
  });
  return fetchApi.post('/data/games', game);
}
function updateGame(game, gameId) {
  Object.values(game).forEach((el) => {
    if (el === '') {
      throw new Error('All fields are required');
    }
  });
  return fetchApi.put('/data/games/' + gameId, game);
}
function addComment(comment) {
  for (const el in comment) {
    if (comment[el] == '') {
      throw new Error('Can not send empty comment! :)');
    }
  }
  return fetchApi.post(`/data/comments/`, comment);
}
function getComments(gameId) {
  return fetchApi.get(`/data/comments?where=_gameId%3D%22${gameId}%22`);
}
export default {
  getAllGames,
  getRecentGames,
  getGameById,
  createGame,
  addComment,
  getComments,
  updateGame,
  deleteGameById,
};
