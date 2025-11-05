import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context"



export default function Details() {

    const { id } = useParams()
    const { recipeDetailsData, setrecipeDetailsData, handleAddToFavorite, favoriteList } = useContext(GlobalContext)

    useEffect(() => {
        async function getRecipeDetails() {
            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
            const data = await response.json();

            console.log(data);
            if (data?.data) {
                setrecipeDetailsData(data?.data)
            }

        }
        getRecipeDetails();
    }, [])

    return <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="row-start-2 lg:row-start-auto">
            <div className="h-96 overflow-hidden rounded-x1 group">
                <img src={recipeDetailsData?.recipe?.image_url} alt="" className="w-full h-full object-cover block group-hover:scale-105 duration-300" />
            </div>

        </div>
        <div className="flex flex-col gap-3 ">
            <span className="text-sm text-cyan-700 font-medium hover:text-cyan-800 hover:underline cursor-pointer transition-all duration-200">{recipeDetailsData?.recipe?.publisher}</span>
            <h3 className="font-bold text-2xl truncate text-black hover:text-orange-600 transition-colors duration-300 cursor-default">{recipeDetailsData?.recipe?.title}</h3>
            <div>
                <button className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 shadow-md bg-black inline-block text-white hover:bg-orange-600 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out" onClick={() => handleAddToFavorite(recipeDetailsData?.recipe)}>
                    {
                        favoriteList.findIndex(item => item.id === recipeDetailsData?.recipe?.id) !== -1 ? 'Remove from Favorite' :
                            'Add to Favorites'
                    }
                </button>
            </div>
            <div>
                <span className="text-2xl font-semibold text-black">Ingredients:</span>
                <ul className="flex flex-col gap-3">
                    {
                        recipeDetailsData?.recipe?.ingredients.map((ingredient, index) =>
                            <li key={index} className="hover:bg-orange-50 hover:pl-2 rounded-lg p-2 transition-all duration-200 cursor-default">
                                <span className="text-2xl font-semibold text-black">{ingredient.quantity} {ingredient.unit}</span>
                                <span className="text-2xl font-semibold text-black ml-2">{ingredient.description}</span>
                            </li>)
                    }

                </ul>
            </div>
        </div>


    </div>
}