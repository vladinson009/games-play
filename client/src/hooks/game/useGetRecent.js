import { useEffect, useState } from 'react';
import gameApi from '../../api/game';

export default function () {
  const [games, setGames] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async function () {
      const response = await gameApi.getRecentGames();
      const recentGames = Object.values(response);
      setGames(recentGames);
      setIsLoading(false);
    })();
  }, []);
  return { games, setGames, isLoading, setIsLoading };
}
