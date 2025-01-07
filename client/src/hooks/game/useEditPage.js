import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import gameApi from '../../api/game';

export default function () {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const defaultState = {
    title: '',
    category: '',
    maxLevel: '',
    imageUrl: '',
    summary: '',
    _ownerId: '',
  };
  const [userInput, setUserInput] = useState(defaultState);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await gameApi.getGameById(gameId);
        setUserInput(response);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const { title, category, maxLevel, imageUrl, summary, _ownerId, _id } = userInput;
    const game = {
      title,
      category,
      maxLevel,
      imageUrl,
      summary,
      _ownerId,
      _id,
    };
    try {
      await gameApi.updateGame(game, gameId);
      navigate(`/games/details/${userInput._id}`);
    } catch (error) {
      setError(error.message);
    }
  }
  return {
    error,
    setError,
    userInput,
    setUserInput,
    onSubmit,
  };
}
