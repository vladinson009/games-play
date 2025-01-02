import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";

import ErrorModal from "../ErrorModal"
import gameApi from "../../api/game"

export default function EditPage() {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const defaultState = {
        title: "",
        category: "",
        maxLevel: "",
        imageUrl: "",
        summary: "",
        _ownerId: ""
    }
    const [userInput, setUserInput] = useState(defaultState);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async function () {
            try {
                const response = await gameApi.getGameById(gameId)
                setUserInput(response);
            } catch (error) {
                setError(error.message);
            }
        })()
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
            _id
        }
        try {
            await gameApi.updateGame(game, gameId);
            navigate(`/games/details/${userInput._id}`);
        } catch (error) {
            setError(error.message);
        }
    }


    return (
        //    < !--Edit Page(Only for the creator )-->
        <section id="edit-page" className="auth">
            {error && <ErrorModal error={{ error, onClose }} />}
            <form onSubmit={onSubmit} id="edit">
                <div className="container">
                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input value={userInput?.title} onChange={onChange} type="text" id="title" name="title" />

                    <label htmlFor="category">Category:</label>
                    <input value={userInput?.category} onChange={onChange} type="text" id="category" name="category" />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input value={userInput?.maxLevel} onChange={onChange} type="number" id="maxLevel" name="maxLevel" min="1" />

                    <label htmlFor="game-img">Image:</label>
                    <input value={userInput?.imageUrl} onChange={onChange} type="text" id="imageUrl" name="imageUrl" />

                    <label htmlFor="summary">Summary:</label>
                    <textarea value={userInput?.summary} onChange={onChange} name="summary" id="summary"></textarea>
                    <input className="btn submit" type="submit" value="Edit Game" />
                </div>
            </form>
        </section>
    )
    function onClose() {
        setError(null);
    }
    function onChange(e) {
        const { name, value } = e.target;
        setUserInput({ ...userInput, [name]: value });
    }

}