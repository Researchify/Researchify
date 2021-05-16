import Publication from '../publication/Publication'

const LayoutAllPublications = ({teamPublications}) => {    
    return(
        <>
            <div className="publicationList">
            {
                teamPublications.map(pub => 
                    <Publication pub={pub} key={pub._id}/>)
            }
            </div>
        </>
    )
}

export default LayoutAllPublications