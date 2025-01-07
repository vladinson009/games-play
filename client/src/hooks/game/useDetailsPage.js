import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import gameApi from '../../api/game';
import sessionContext from '../../util/sessionContext';

export default function () {
  const { gameId } = useParams();
  const { session } = useContext(sessionContext);

  const [game, setGame] = useState({});
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const isCreator = session._id === game._ownerId;

  useEffect(() => {
    (async function () {
      const [response, comments] = await Promise.all([
        gameApi.getGameById(gameId),
        gameApi.getComments(gameId),
      ]);
      response.comments = Object.values(comments);
      setGame(response);
    })();
  }, []);

  async function onComment(e) {
    e.preventDefault();
    const newComment = {
      _gameId: gameId,
      _ownerId: session._id,
      owner: session.email,
      text: comment,
    };
    try {
      const response = await gameApi.addComment(newComment);
      setGame({ ...game, comments: [...game.comments, response] });
      setComment('');
    } catch (error) {
      setError(error.message);
    }
  }
  return {
    error,
    setError,
    comment,
    setComment,
    onComment,
    isCreator,
    session,
    gameId,
    game,
  };
}
