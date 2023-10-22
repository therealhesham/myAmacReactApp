import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemPage = (props) => {

const {name,store} = useParams()
const [ array,setArray]=useState([]);
useEffect(()=>{
(async function getData(){
    
const finder = await axios.get("https://amaccompany.onrender.com/find/"+name+"/store/"+store)
setArray(finder)

})()


},[])

return ( <>
    
    
    </> );
}
 
export default ItemPage ;