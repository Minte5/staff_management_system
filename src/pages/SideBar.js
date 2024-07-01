import './AdminPage.css';
import { useNavigate, Link  } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, ListGroup } from 'react-bootstrap'; 



const SideBar = () => {
    return (
        <div className="sidebar bg-dark text-white vh-100 p-3 sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="*/users" className="nav-link text-white">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="*/list-projects" className="nav-link text-white">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to="*/list-events" className="nav-link text-white">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to="*/list-projects" className="nav-link text-white">
                UG Sections
              </Link>
            </li>
            <li className="nav-item">
              <Link to="*/list-messages" className="nav-link text-white">
                Message
              </Link>
            </li>
            
          </ul>
        </div>
      );
};

export default SideBar;