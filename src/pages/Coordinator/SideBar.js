import '../AdminPage.css';import { useNavigate, Link  } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, ListGroup } from 'react-bootstrap'; 



const SideBar = () => {
    return(
        <div className="sidebar">
            
            <ListGroup variant="flush">
                <ListGroup.Item as={Link} to="*/create-user" className="bg-success">
                    <span>Users</span>
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="*/list-projects" className="bg-success">
                    <span>Projects</span>
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="*/list-projects" className="bg-success">
                    <span>Events</span>
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="*/list-projects" className="bg-success">
                    <span>Events</span>
                </ListGroup.Item>           
            
            </ListGroup>
            


            
            
            
        </div>
    )
}

export default SideBar;