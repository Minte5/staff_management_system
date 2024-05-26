import './AdminPage.css';
import { useNavigate, Link  } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, ListGroup } from 'react-bootstrap'; 



const SideBar = () => {
    return(
        <div className="sidebar">
            
            <ListGroup variant="flush">
                <ListGroup.Item as={Link} to="*/create-user" className="bg-success">
                    <span>Create User</span>
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="*/create-project" className="bg-success">
                    <span>Create Project</span>
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="*/list-projects" className="bg-success">
                    <span>List Projects</span>
                </ListGroup.Item>
                
                    <Dropdown as={Link} to="*/users" className="bg-success">
                        <Dropdown.Toggle   className="bg-success">
                            <span className="title" >List Users</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Action 3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                
            
            </ListGroup>
            


            
            
            
        </div>
    )
}

export default SideBar;