import fetchApi from './fetchApi';

function getAllGames() {
  return fetchApi.get('/jsonstore/games');
}
function getGameById(gameId) {
  return fetchApi.get(`/jsonstore/games/${gameId}`);
}
function createGame(game) {
  Object.values(game).forEach((el) => {
    if (el === '') {
      throw new Error('All fields are required');
    }
  });
  return fetchApi.post('/jsonstore/games', game);
}
export default { getAllGames, getGameById, createGame };
