import { useContext } from "react"
import { GlobalContext } from "../../context"
import RecipeItem from "../../components/recipe-list"


export default function Favorites() {

    const { favoriteList, handleRemoveFromFavorite } = useContext(GlobalContext)


    return <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {
            favoriteList && favoriteList.length > 0 ?
                favoriteList.map(item => (
                    <RecipeItem
                        key={item.id}
                        item={item}
                        onRemove={handleRemoveFromFavorite}
                    />
                ))
                : <div>
                    <p className="lg:text-4xl text-x1 text-center text-black font-extrabold">Nothing to show, please add your favorite here</p>
                </div>
        }
    </div>
}