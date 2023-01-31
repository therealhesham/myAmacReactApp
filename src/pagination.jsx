import _ from "lodash";
// import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination  from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from "react";



const Paginat =(props)=>{
    const [startpager,setPage] = useState(1)
const [sizer,setSize] = useState("")
const setter = props.Setter
const startpage = props.startPage;
const size = props.size
const pages = size  /  10;
const ceil = Math.ceil(pages);
const arrayForPagination = _.range(1,ceil)

return(<div>
    {console.log(size)}
    {/* <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    <li className="page-item disabled">
      <a className="page-link">Previous</a>
    </li>
    {arrayForPagination.map((e)=><li className="page-item"><a className="page-link" onClick={()=>setter(e)}>{e}</a></li>)}
    
    <li className="page-item">
      <a className="page-link" >Next</a>
    </li>
  </ul>
</nav> */}
<Pagination count={ceil} page={startpage} onChange={setter} color="error" />
</div>
)
}

export default Paginat;