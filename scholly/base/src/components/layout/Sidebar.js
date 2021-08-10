/**
 * This file exports Sidebar component for layouts
 */
 import './sidebar.css';
 import { Link, useLocation } from 'react-router-dom';
 
 const Sidebar = ({data}) => {
   let location = useLocation();
 
   return (
     <div className="Sidebar">
       <ul className="SidebarList">
         {data.map((val, key) => {
           return (
             <Link to={val.link} key={key}>
               <li
                 className="row"
                 id={location.pathname === val.link ? 'active' : ''}
               >
                 {/* Sets sidebar navigation to active (blue) if the current page is the same in sidebar*/}
 
                 <div id="icon">{val.icon}</div>
                 <div id="title">{val.title}</div>
               </li>
             </Link>
           );
         })}
       </ul>
     </div>
   );
 };
 
 export default Sidebar;
 