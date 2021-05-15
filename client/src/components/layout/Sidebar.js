import "./Sidebar.css"
const Sidebar = (props) => {
    
    const datasrc=props.type?props.data.SidebarData:props.data.EditorSideBarData
    console.log(datasrc)
    console.log(props.type)
    return (
        <div className="Sidebar">
            <ul className="SidebarList">
                {datasrc.map((val,key)=> {
                    return(
                    <li 
                        key={key}
                        className="row"
                        onclick={() => {
                            window.location.pathname = val.link;
                        }}
                        id={window.location.pathname === val.link ? "active" : ""} 
                    > 
                    {/* Sets sidebar navigation to active (blue) if the current page is the same in sidebar*/}

                        <div id="icon">
                            {val.icon}
                        </div>
                        <div id="title">
                            {val.title}
                        </div>
                        </li>
                    )
                })
                }
            </ul>
        </div>
    )
}

export default Sidebar