import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const GlobalContext = createContext();

export default function GlobalState({ children }) {

    const [searchParam, setSearchParam] = useState('');
    const [loading, setLoading] = useState(false)
    const [recipeList, setRecipeList] = useState([])
    const [recipeDetailsData, setrecipeDetailsData] = useState()
    const [favoriteList, setFavoriteList] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        async function getDefaultRecipes() {
            setLoading(true);
            try {
                const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=chicken`)
                const data = await res.json();

                if (data?.data?.recipes) {
                    setRecipeList(data.data.recipes)
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        }
        getDefaultRecipes();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`)
            const data = await res.json();

            if (data?.data?.recipes) {
                setRecipeList(data.data.recipes)
                setLoading(false);
                setSearchParam('')
                navigate('/'); // back to home page
            }

        } catch (e) {
            console.log(e);
        }

    }

    function handleAddToFavorite(getCurrentItem) {
        let cpyFavoriteList = [...favoriteList];
        const index = cpyFavoriteList.findIndex(item => item.id === getCurrentItem.id)
        if (index === -1) {
            cpyFavoriteList.push(getCurrentItem)
        } else {
            cpyFavoriteList.splice(index) // handle the delete in the favorite page
        }

        setFavoriteList(cpyFavoriteList);
    }

    function handleRemoveFromFavorite(getCurrentItemId) {
        let cpyFavoriteList = favoriteList.filter(item => item.id !== getCurrentItemId);
        setFavoriteList(cpyFavoriteList);
    }


    return <GlobalContext.Provider value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setrecipeDetailsData,
        handleAddToFavorite,
        handleRemoveFromFavorite,
        favoriteList,
        setFavoriteList
    }}>{children}</GlobalContext.Provider>
}