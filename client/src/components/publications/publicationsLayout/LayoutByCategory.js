import Publication from '../publication/Publication'

const LayoutByCategory = ({teamPublications}) => {
    const teamJournalPublications = teamPublications.filter(pub => pub.category.type === "JOURNAL")
    const teamConferencePublications = teamPublications.filter(pub => pub.category.type === "CONFERENCE")

    return(
        <>
            <h2 className="publicationListHeader"> Journal </h2>
            <div className="publicationList">
            {
                teamJournalPublications.map(pub => 
                    <Publication pub={pub} key={pub._id}/>)
            }
            </div>

            <h2 className="publicationListHeader"> Conference </h2>
            <div className="publicationList">
            {
                teamConferencePublications.map(pub => 
                    <Publication pub={pub} key={pub._id}/>)
            }
            </div>
        </>
    )
}

export default LayoutByCategory