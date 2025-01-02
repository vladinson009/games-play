import fetchApi from './fetchApi';

function getAllGames() {
  return fetchApi.get('/jsonstore/games');
}
function getGameById(gameId) {
  return fetchApi.get(`/jsonstore/games/${gameId}`);
}
function deleteGameById(gameId) {
  return fetchApi.del(`/jsonstore/games/${gameId}`);
}
function createGame(game) {
  Object.values(game).forEach((el) => {
    if (el === '') {
      throw new Error('All fields are required');
    }
  });
  return fetchApi.post('/jsonstore/games', game);
}
function updateGame(game, gameId) {
  Object.values(game).forEach((el) => {
    if (el === '') {
      throw new Error('All fields are required');
    }
  });
  return fetchApi.put('/jsonstore/games/' + gameId, game);
}
function addComment(gameId, comment) {
  return fetchApi.post(`/jsonstore/comments/${gameId}`, comment);
}
function getComments(gameId) {
  return fetchApi.get(`/jsonstore/comments/${gameId}`);
}
export default {
  getAllGames,
  getGameById,
  createGame,
  addComment,
  getComments,
  updateGame,
  deleteGameById,
};
