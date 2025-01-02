import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import gameApi from "../../api/game";

export default function DeletePage() {
    const { gameId } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        (async function () {
            await gameApi.deleteGameById(gameId)
            return navigate('/games/catalogue')
        })()
    }, []);


}