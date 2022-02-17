
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'
import ConfirmationModel from '../../components/confirmation/ConfirmationModel';
import { withRouter } from 'react-router-dom';

const AuditList = (props) => {

    const [AuditListData, setAuditListData] = useState([])
    const [isShowModel, setIsShowModel] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [formLayout, setFormLayout] = useState([]);

    const location = useLocation();
    const loadData = () => {
        axios.get(`/data/home.json`)
            .then(res => {
                const persons = res.data;
                const id = getParametar("id")
                if (id) {
                    res.data.map(row => {
                        if (row.id == id) {
                            console.log("row", row)
                            setSelectedIndex(row)

                        }
                    })
                }

                setAuditListData(res.data)

            })

        console.log()
    }


    const loadFormLayout = () => {
        axios.get(`/data/newAdjustmentsForm.json`)
            .then(res => {
                const persons = res.data;
                setFormLayout(persons)
                loadData()
            })
    }

    const getParametar = (key) => {
        return new URLSearchParams(props.location.search).get(key)
    }

    useEffect(() => {
        loadFormLayout();
        
    }, [])


    const selectRow = (index) => {

        const indexelement = selectedRow && selectedRow.indexOf(index)
        console.log("indexelement", indexelement)
        if (indexelement > -1) {
            const temp = [...selectedRow]
            const elmen = temp.splice(indexelement, 1)
            console.log("====>", temp)
            setSelectedRow(temp)
        } else {
            const checklist = selectedRow ? [...selectedRow, index] : [index];
            setSelectedRow(checklist)
        }

    }
    const deSelectRow = () => {
        setSelectedRow([]);
    }


    return (
        <div className="new">
            <div className="container  m-1">
                <div className="row">
                    <div className="col-sm-6">
                        <h3 className="headding"> Audit History</h3>
                    </div>
                    <div className="col-sm-6 text-right">

                    </div>
                </div>
            </div>
            <div className="container  m-1">

            </div>
            <div className="container  m-1">

                <div className="row fixtable">


                    <div className="col-sm-12">
                        <div className="scroll-table">

                            <table className="table table-condensed key-value ">




                                {selectedIndex?.data && <tr></tr>}
                                {
                                    selectedIndex?.data &&
                                    <React.Fragment>
                                        <thead>
                                        <tr>
                                         
                                        <th className='icon'></th>
                                        {formLayout.map((header) => (
                                                <th className='data lg' key={header.field_id}>{header.field_name}</th>
                                            ))}
                                    </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                selectedIndex.data.map((rowData) => (
                                                    <tr onClick={() => selectRow(rowData.id)} className={`clickable-row ${selectedRow && selectedRow.indexOf(rowData.id) > -1 && "danger text-danger"}`}>
                                                        <td><i className="glyphicon glyphicon-flag" title={rowData.Comment}></i> </td>
                                                        {formLayout.map((header) => (
                                                            <td>{rowData[header.field_id]} </td>

                                                        ))}
                                                    </tr>
                                                )
                                                )
                                            }

                                        </tbody>
                                    </React.Fragment>
                                }
                            </table>


                        </div>


                    </div>
                </div>
            </div>
            {selectedRow.length>0 &&
                <div className="container  m-1">
                    <div className="row">
                        <div className="col-sm-12">
                            <textarea className="form-control"  rows="3" placeholder="Commentary box shown "></textarea>
                        </div>
                    </div>

                    <div className="row m-1">
                        <div className="col-sm-6">
                            <button className="btn btn-default" onClick={deSelectRow}> Cancel</button>
                        </div>
                        <div className="col-sm-6 text-right">

                            <Link to="/request-audit" className="btn btn-default" role="button"> Submit</Link>
                        </div>

                    </div>
                </div>
            }

        </div >
    )
}

export default withRouter(AuditList);
