import Publication from '../publication/Publication'
import { CATEGORY_TYPE } from '../form/PublicationForm'

const LayoutByCategory = ({teamPublications}) => {

    const renderPublicationsByCategory = (categoryType) => {
        const publicationsByCategory = 
            teamPublications.filter(pub => pub.category.type === categoryType.toUpperCase())
        return(
            publicationsByCategory.length > 0 &&
            <>
                <h2 className="publicationListHeader"> {categoryType} </h2>
                <div className="publicationList">
                {
                    publicationsByCategory.map(pub => <Publication pub={pub} key={pub._id}/>)
                }
                </div>
            </>
        )
    }
    return(
        Object.keys(CATEGORY_TYPE).map(category => (
            renderPublicationsByCategory(category)
        ))
    )
}

export default LayoutByCategory