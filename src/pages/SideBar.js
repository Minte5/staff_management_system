import './AdminPage.css';
import { useNavigate, Link  } from 'react-router-dom';
import axios from 'axios'; // Import Axios



const SideBar = () => {
    return(
        <div className="sidebar">
            <ul>
                
            <li  className="dropdown"><span className='title'><Link to="*/users">List Users</Link></span></li>
                {/*<ul className="dropdown-menu">*/}
                {/* Dropdown menu items */}
            <div className='sub-menu'>
                <li  className='sub-menu'><a href="#">Submenu Item 1</a></li>
                <li  className='sub-menu'><a href="#">Submenu Item 2</a></li>
                <li  className='sub-menu'><a href="#">Submenu Item 3</a></li>
            </div>
                
                {/*</ul>*/}
            
            <li ><span><Link to="*/create-user">Create User</Link></span></li>
            <li ><span><Link to="*/create-project">Create Project</Link></span></li>
            <li ><a><span className='title'>Menu Item 1</span></a></li>
            
            </ul>
        </div>
    )
}

export default SideBar;