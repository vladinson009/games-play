import useEditPage from "../../hooks/game/useEditPage";
import ErrorModal from "../ErrorModal"

export default function EditPage() {

    const { error,
        setError,
        userInput,
        setUserInput,
        onSubmit, } = useEditPage()

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