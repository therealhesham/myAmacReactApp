import { Button} from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";





function ButtonsComponent() {
    return (<>
        <Button style={{color:"white" ,textDecorationStyle:"none" }}><Link to="/login" variant="error"  style={{color:"white" ,textDecorationStyle:"none" }}>Login</Link></Button>
        <Button><Link to="/register" variant="error" style={{color:"white"}}>Register</Link></Button></>  );
}
 
export default ButtonsComponent;