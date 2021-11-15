import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function HomePage() {

const [adjustmentsData, setAdjustmentsData] = useState([])

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
           <div className="container ">
        <div className="row">
            <div className="col-sm-12">
                <div className="alert alert-info alert-dismissible fade in">
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Welcome!</strong> to blah, blah,blah. To get submit an adjustment blah blah blah.
                </div>
            </div>
        </div>
    </div>

    <div className="container  m-1">
        <div className="row">
            <div className="col-sm-6">
                <h3 className="headding">Submitted Adjustments</h3>
            </div>
            <div className="col-sm-6 text-right">
            <Link to="/new-adjustments" className="btn btn-default">
            + New Adjustments
            </Link>

            </div>
        </div>

        <div className="row1 m-1">
            <table className="table table-condensed ">
                <thead>
                    <tr>
                        <th>Date </th>
                        <th>Refinery</th>
                        <th>Status</th>
                        <th>Application</th>
                    </tr>
                </thead>
                <tbody>
                    {adjustmentsData.map((rowData)=>(
                    <tr className="clickable-row">
                        <td>{rowData.date} </td>
                        <td>{rowData.refinery} </td>
                        <td>{rowData.status} </td>
                        <td>{rowData.application} </td>

                    </tr>
                    ))
                    }

                   {adjustmentsData.length<1 &&
                    <tr>
                        <td colspan="4">No Adjustments to show.</td>

                    </tr>
                    }
                </tbody>
            </table>
        </div>
    </div> 
        </div>
    )
}
