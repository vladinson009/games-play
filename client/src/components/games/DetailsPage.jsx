import { Link } from 'react-router-dom';
import ErrorModal from "../ErrorModal"
import useDetailsPage from '../../hooks/game/useDetailsPage';

useDetailsPage

export default function DetailsPage() {
    const { error,
        setError,
        comment,
        setComment,
        onComment,
        isCreator,
        session,
        gameId,
        game } = useDetailsPage()

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