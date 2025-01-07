import { useState, useEffect } from 'react';
import game from '../../api/game';

export default function useGetAll() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    (async function () {
      const response = await game.getAllGames();
      setGames(Object.values(response));
      setIsLoading(false);
    })();
  }, []);
  return { games, isLoading };
}
