import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import sessionContext from '../../util/sessionContext';
import gameApi from '../../api/game';

export default function () {
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState({
    title: '',
    category: '',
    maxLevel: '',
    imageUrl: '',
    summary: '',
    _ownerId: '',
  });
  const { session } = useContext(sessionContext);
  const navigate = useNavigate();
  async function onSubmit(e) {
    e.preventDefault();
    const { title, category, maxLevel, imageUrl, summary } = userInput;
    const game = {
      title,
      category,
      maxLevel,
      imageUrl,
      summary,
      _ownerId: session._id,
      _createdOn: Date.now(),
    };
    try {
      const response = await gameApi.createGame(game);
      navigate(`/games/details/${response._id}`);
    } catch (error) {
      setError(error.message);
    }
  }
  return { setError, error, setUserInput, userInput, onSubmit };
}
