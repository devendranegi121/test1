import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const RequestAudit = withRouter((props) => {

    const [adjustmentsData, setAdjustmentsData] = useState([])
    const [selectedIndex, setSelectedIndex] = useState();
    const [searchByText, setSearchByText] = useState("refinery");
    const [searchText, setSearchText] = useState();

    const [filterData, setFilterData] = useState([]);
    const selectedRow = (index) => {
        props.history.push(`./audit-list?id=${index.id}`)
        setSelectedIndex(index)
    }
    const loadData = () => {
        axios.get(`/data/home.json`)
            .then(res => {
                const persons = res.data;
                setAdjustmentsData(res.data)
                setFilterData(res.data)
            })
    }

    useEffect(() => {
        loadData()
    }, [])

    const searchBy = (event) => {
        const selected = event.target.value;
        setSearchByText(selected);
    }

    const searchData = () => {
        console.log(searchByText, searchText, adjustmentsData)
        if (searchByText && searchText) {
            const filtered = adjustmentsData.filter((data) => {
                console.log(data[searchByText], data, searchText, data[searchByText])
                if (data[searchByText].toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                    return true;
                }
            return false;
            })
            setFilterData(filtered)
        } else {
            resetFilter();
        }
    }

    const searchTextHandaler = (event) => {
        const selected = event.target.value;
        setSearchText(selected);
    }

    const resetFilter = () => {
        setFilterData(adjustmentsData);
        setSearchText("")
    }

    return (
        <div className="body-layout">


            <div className="container  m-1">
                <div className="row">
                    <div className="col-sm-6">
                        <h3 className="headding"> Adjustments for Review</h3>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-group">

                            <select className="form-control" id="refinery" onClick={(e) => searchBy(e)}>
                                <option value='refinery'>Refinery</option>
                                <option value="submitterName">Submitter</option>
                                <option value="date">Report Date</option>
                                <option value="date">Submitted Date</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="input-group">
                            <input type="text" onChange={(e) => searchTextHandaler(e)} value={searchText} className="form-control" placeholder="Search for..." />
                            <span className="input-group-btn">
                                <button className="btn btn-default" onClick={searchData} type="button">Search</button>
                                <button className="btn btn-default" onClick={resetFilter} type="button">Clear</button>
                            </span>
                        </div>
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

                            {
                                filterData.map((rowData, index) => (
                                    <tr className={`clickable-row`} onClick={() => selectedRow(rowData)}>
                                        <td>{rowData.date} </td>
                                        <td>{rowData.refinery} </td>
                                        <td>{rowData.submitterName} </td>
                                        <td>{rowData.date} </td>

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
})


export default RequestAudit;