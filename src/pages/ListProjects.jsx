import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

const ListProjects = () => {
  
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const storedTokenString = localStorage.getItem('token');
          const token = JSON.parse(storedTokenString);
          console.log('Stored Tokennnnnn:', token);

          const response = await axios.get('http://0.0.0.0:8888/project/', {
            headers: {
              Authorization: `Token ${token.key}` 
            }
          });
          setProjects(response.data);



         
        } catch (error) {
          console.error('Error fetching projects:', error);
          setError('Error fetching projects');
        }
      };
  
      fetchProjects();
  }, []);

  
  
  
  
  

  

  return (
    <div className='main'>
      <div className="recentOrders">

      
      
        <div className="search-area">
          
          
       
          <h1>Project List</h1>
          {error && <p>{error}</p>}
          <ul>
            {projects.map(project => (
              <li key={project.id}>{project.name}</li>
            ))}
          </ul>
        </div>
      

      
    </div>
    </div>
    
  );
};

export default ListProjects;
