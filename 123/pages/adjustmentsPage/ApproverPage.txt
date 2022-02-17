
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import {withRouter} from 'react-router-dom';

export const ApproverPage=withRouter((props) =>{

const [adjustmentsData, setAdjustmentsData] = useState([])
const [selectedIndex, setSelectedIndex] = useState();
const selectedRow=(index)=>{
    setSelectedIndex(index)
}
    const loadData= ()=>{
        axios.get(`/data/home.json`)
      .then(res => {
        const persons = res.data;
        setAdjustmentsData(res.data)
       
      })
    }

    useEffect(() => {
       loadData()
    }, [])


    return (
        <div className="body-layout">
           

    <div className="container  m-1">
        <div className="row">
            <div className="col-sm-6"> 
                <h3 className="headding"> Adjustments for Review</h3>
            </div>
             
        </div>

        <div className="row1 m-1">
            <table className="table table-condensed ">
                <thead>
                    <tr>
                        <th>Report Date </th>
                        <th>Refinery</th>
                        <th>Submitter</th>
                        <th>Submitted Date</th>
                    </tr>
                </thead>
                <tbody>
                    {adjustmentsData.map((rowData, index)=>(
                     <tr className={`clickable-row ${selectedIndex===rowData.id && "active"}`} onClick={()=>selectedRow(rowData.id)}>
                        <td>{rowData.date} </td>
                        <td>{rowData.refinery} </td>
                        <td className={`${rowData.status=="Action Required" && "text-danger"}`}>{rowData.status} </td>
                        <td>{rowData.date} </td>

                    </tr>
                    ))
                    }

                   {adjustmentsData.length<1 &&
                    <tr>
                        <td colSpan="4">No Adjustments to show.</td>

                    </tr>
                    }
                </tbody>
            </table>
        </div>
    </div> 
        </div>
    )
})
 
