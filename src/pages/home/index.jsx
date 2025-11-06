import { useContext } from "react"
import { GlobalContext } from "../../context"
import RecipeItem from "../../components/recipe-list"



export default function Home() {

    const { recipeList, loading } = useContext(GlobalContext)

    if (loading) return <div className="fade-in">Loading ... please wait</div>

    return <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10 fade-in">
        {
            recipeList && recipeList.length > 0 ?
                recipeList.map((item, index) => (
                    <div key={item.id} className="stagger-item">
                        <RecipeItem item={item} />
                    </div>
                ))
                : <div className="fade-in">
                    <p className="lg:text-4xl text-x1 text-center text-black font-extrabold">Nothing to show, please search something</p>
                </div>
        }
    </div>
}