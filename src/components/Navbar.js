import { Component } from 'react';
import './Navbar.css';

class Navbar extends Component{
    state = { clicked: false};
    handleClick = () =>{
        this.setState({clicked:
        !this.state.clicked})
    }
    render(){
    return(
        <nav >
            <a href='#'><img src="/logo.png" className="App-logo" alt="logo" /></a>
            <div >
                <ul id='navbar1'>
                    <li><a className="active" href='index.html'>Home</a></li>
                    <li><a href='#'>About Us</a></li>
                    <li><a href='#'>Home</a></li>
                    <li><a href='#'>Contact</a></li>
                    {/* <li><a href='#'>Profile</a></li> */}
                </ul>
            </div>
                
            <div>
                <h4 >Profile</h4>
            </div>

            <div id='mobile' onClick={this.handleClick}>
                <i id='bar' className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>

        </nav>
    )
}
}

export default Navbar;