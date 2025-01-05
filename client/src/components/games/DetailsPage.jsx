import { useParams, Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"

import gameApi from "../../api/game"
import sessionContext from "../../util/sessionContext"
import ErrorModal from "../ErrorModal"
export default function DetailsPage() {
    const { gameId } = useParams()
    const { session } = useContext(sessionContext)

    const [game, setGame] = useState({})
    const [comment, setComment] = useState("")
    const [error, setError] = useState(null)


    const isCreator = session._id === game._ownerId

    useEffect(() => {
        (async function () {
            const [response, comments] = await Promise.all([
                gameApi.getGameById(gameId),
                gameApi.getComments(gameId)
            ])
            response.comments = Object.values(comments);
            setGame(response)


        })()
    }, [])

    async function onComment(e) {
        e.preventDefault();
        const newComment = {
            _gameId: gameId,
            _ownerId: session._id,
            owner: session.email,
            text: comment
        }
        try {
            const response = await gameApi.addComment(newComment)
            setGame({ ...game, comments: [...game.comments, response] })
            setComment("")


        } catch (error) {
            setError(error.message)
        }
    }

    return (
        //   < !--Details Page-- >
        <section id="game-details">
            <h1>Game Details</h1>
            {error && <ErrorModal error={{ error, onClose }} />}
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                {/* // <!-- Bonus ( for Guests and Users ) --> */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {/* <!-- list all comments for current game (If any) --> */}
                        {game.comments?.length > 0 ? game.comments.map(el => <li key={el._id} className="comment">
                            <p>{el.owner}: {el.text}</p>
                        </li>) : <p className="no-comment">No comments.</p>}
                    </ul>
                </div>

                {/* // <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {isCreator && <div className="buttons">
                    <Link to={`/games/edit/${gameId}`} state={game} className="button">Edit</Link>
                    <Link to={`/games/delete/${gameId}`} className="button">Delete</Link>
                </div>}
            </div>

            {/* // <!-- Bonus --> */}
            {/* // <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            {!isCreator && session._id && <article className="create-comment">
                <label>Add new comment:</label>
                <form onSubmit={onComment} className="form">
                    <textarea value={comment} onChange={onChange} name="comment" placeholder="Comment......"></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>}
        </section>
    )
    function onChange(e) {
        const value = e.target.value;
        setComment(value);
    }
    function onClose() {
        setError(null);
    }
}