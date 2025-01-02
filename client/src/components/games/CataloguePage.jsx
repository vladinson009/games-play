import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import game from "../../api/game"

export default function CataloguePage() {
    const [games, setGames] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true);
        (async function () {
            const response = await game.getAllGames()
            setGames(Object.values(response))
            setIsLoading(false);
        })()
    }, [])


    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {isLoading ? <div>...Loading</div> : games.length > 0
                ? games.map(game => (
                    <div key={game._id} className="allGames">
                        <div className="allGames-info">
                            <img src={game.imageUrl} />
                            <h6>{game.category}</h6>
                            <h2>{game.title}</h2>
                            <Link to={`/games/details/${game._id}`} className="details-button">Details</Link>
                        </div>
                    </div>))
                : <h3 className="no-articles">No articles yet</h3>}

        </section>
    )
}