import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { apiGETRequest } from '../../serviceApi/api';

const AdjustmentsPage = (props) => {

    const [adjustmentsData, setAdjustmentsData] = useState([])
    const [selectedIndex, setSelectedIndex] = useState();
    const selectedRow = (adjustment) => {
        setSelectedIndex(adjustment.adjustment_id)
        const url = `./new-adjustments?id=${adjustment.adjustment_id}`;
        props.history.push(url)
    }


    const loadData = () => {
        apiGETRequest({
            'endpoint': `/adjustments`
        }).then((resp) => {
            if (resp) {
                console.log(resp, "resprespresprespresp")
                setAdjustmentsData(resp)
            }
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
                        <h3 className="headding">  Adjustments</h3>
                    </div>
                    <div className="col-sm-6 text-right">
                        <Link to="/new-adjustments" className="btn btn-primary">
                            + New Adjustments
                        </Link>

                    </div>
                </div>

                <div className="row1 m-1">
                    <table className="table table-condensed ">
                        <thead>
                            <tr>
                                <th>Report Date </th>
                                <th>Refinery</th>
                                <th>Status</th>
                                <th>Reviewer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adjustmentsData.map((rowData, index) => (
                                <tr key={`row${index}`} className={`clickable-row ${selectedIndex === rowData.adjustment_id && "active"} `} onClick={() => selectedRow(rowData)}>

                                    <td>{rowData.adjustment_start_date} </td>
                                    <td>{rowData.adjustment_refinery ? rowData.adjustment_refinery : "RDP"} </td>
                                    <td className={`${rowData.adjustment_status === "REJECTED" && "text-danger"}`}>{rowData.adjustment_status === "REJECTED" ? "Action Required" : rowData.adjustment_status} </td>
                                    <td>{rowData.adjustment_status === "REJECTED" && rowData.available_reviewer} </td>

                                </tr>
                            ))
                            }

                            {adjustmentsData.length < 1 &&
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
}

export default withRouter(AdjustmentsPage);