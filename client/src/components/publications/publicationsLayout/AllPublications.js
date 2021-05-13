import Publication from '../publication/Publication'

const AllPublications = ({teamPublications}) => {    
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

export default AllPublications