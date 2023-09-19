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
    
<Pagination count={ceil} page={startpage} onChange={setter} color="error" />
</div>
)
}

export default Paginat;