import { useEffect, useState } from "react";
import gameApi from "../../api/game";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [games, setGames] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        (async function () {
            const response = await gameApi.getRecentGames()
            const recentGames = Object.values(response)
            setGames(recentGames)
            setIsLoading(false);

        })()

    }, []);


    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero" />

            <div id="home-page">
                <h1>Latest Games</h1>

                {isLoading
                    ? (<div>...Loading</div>)
                    : (games.length > 0
                        ? (games.map(game => (
                            <div key={game._id} className="game">
                                <div className="image-wrap">
                                    <img src={game.imageUrl} />
                                </div>
                                <h3>{game.title}</h3>
                                <div className="rating">
                                    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                                </div>
                                <div className="data-buttons">
                                    <Link to={`/games/details/${game._id}`} className="btn details-btn">Details</Link>
                                </div>
                            </div>)))
                        : (<p className="no-articles">No articles yet</p>)
                    )}
            </div>
        </section>
    )
}