import {Link} from "react-router-dom";

export default function NavBar(){

    return(
        <>
        <center>
            <div className="nav">
            <Link to="/">UserLogin</Link>
            <Link to="/a">AdminLogin</Link>     
            </div>
        </center>
        </>
    );
}