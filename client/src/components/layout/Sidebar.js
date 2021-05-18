import "./Sidebar.css"
const Sidebar = ({ data}) => {
    
    return (
        <div className="Sidebar">
            <ul className="SidebarList">
                {data.map((val,key)=> {
                    return(
                    <Link to={val.link} >
                        <li 
                            key={key}
                            className="row"
                            id={location.pathname === val.link ? "active" : ""}
                        >
                        {/* Sets sidebar navigation to active (blue) if the current page is the same in sidebar*/}

                            <div id="icon">
                                {val.icon}
                            </div>
                            <div id="title">
                                {val.title}
                            </div>
                            </li>
                    </Link>
                    )
                })
                }
            </ul>
        </div>
    )
}

export default Sidebar