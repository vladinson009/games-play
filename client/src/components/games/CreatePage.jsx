
import useCreateGame from '../../hooks/game/useCreateGame'
import ErrorModal from "../ErrorModal";

export default function CreatePage() {
    const { setError,
        error,
        setUserInput,
        userInput,
        onSubmit } = useCreateGame()
    return (

        <section id="create-page" className="auth">
            {error && <ErrorModal error={{ error, onClose }} />}
            <form onSubmit={onSubmit} id="create">
                <div className="container">
                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input value={userInput.title} onChange={onChange} type="text" id="title" name="title" placeholder="Enter game title..." />

                    <label htmlFor="category">Category:</label>
                    <input
                        value={userInput.category} onChange={onChange}
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter game category..."
                    />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input value={userInput.maxLevel} onChange={onChange} type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1" />

                    <label htmlFor="game-img">Image:</label>
                    <input value={userInput.imageUrl} onChange={onChange} type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />

                    <label htmlFor="summary">Summary:</label>
                    <textarea value={userInput.summary} onChange={onChange} name="summary" id="summary"></textarea>
                    <input className="btn submit" type="submit" value="Create Game" />
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