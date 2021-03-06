import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ConfirmationModel from '../../components/confirmation/ConfirmationModel';
import { withRouter } from 'react-router-dom';
import XLSX from 'xlsx';
import './NewAdjustments.css';
import MessagePopup from '../../components/messagePopup/MessagePopup';
import { apiDELETERequest, apiGETRequest, apiPOSTRequest } from '../../serviceApi/api';

const NewAdjustments = (props) => {
    const [isShowModel, setIsShowModel] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [formLayout, setFormLayout] = useState([]);
    const [selectedIndexData, setSelectedIndexData] = useState([]);
    const [headerData, setHeaderData] = useState([]);
    const [fileUploaded, setFileUploaded] = useState({});
    const [actionId, setActionId] = useState();
    const [errorIs, setErrorIs] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [errorIsPopup, setErrorIsPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [adjustmentId, setAdjustmentId] = useState();
    const [payload, setPayload] = useState([])
    const [dates, setDates] = useState({
        start: "2022-06-01",
        end: "2022-06-01",
        report: ""
    });
    const [adjustmentCreate, setAdjustmentCreate] = useState(true)
    const [reportDate, setReportDate] = useState()
    let isNew = true;

    const selectedRow = (row) => {
        setSelectedIndex(row)
        setPayload([])
    }
    const location = useLocation();
    const loadData = (id) => {
        apiGETRequest({
            'endpoint': `/adjustment_fields?adjustment_id=${id}`
        }).then((resp) => {
            if (resp) {
                console.log(resp, "resprespresprespresp")
                if (!isNew) {
                    setSelectedIndexData(dataFormet(resp))
                }
                setHeaderData(resp)
            }
        })
    }

    const dataFormet = (data) => {
        const rowList = data[0]?.adjustment_field_values?.map((row, index) => {
            let rowData = { id: index };
            data.map((field) => {

                const fieldName = field.field_name.replace(" ", "_")
                rowData[fieldName] = field.adjustment_field_values[index]
            })
            return rowData;
        })

        console.log("rowListrowList", rowList)
        return rowList;
    }

    // const loadFormLayout = () => {
    //     axios.get(`/data/newAdjustmentsForm.json`)
    //         .then(res => {
    //             const persons = res.data;
    //             setFormLayout(persons)
    //         })
    // }

    const getParametar = (key) => {
        return new URLSearchParams(props.location.search).get(key)
    }

    useEffect(() => {

        let id = getParametar("id")

        if (!id) {
            const newAdjustmentid = getRandromNumber()
            setAdjustmentId(newAdjustmentid)
            setAdjustmentCreate(false);
            creatNew();

        } else {
            setAdjustmentId(id)
            setReportDate("2022-06-01");
            isNew = false;
        }
        id = id ? id : 0;
        loadData(id);
    }, [])

    const handleHideModel = () => {
        setIsShowModel(false)
    }

    const handleShowModel = (rowDetails) => {
        setActionId(rowDetails)
        setIsShowModel(true)
    }

    const creatNew = () => {

        const newlist = {
            "id": selectedIndexData ? selectedIndexData.length + 1 : 100,
        }

        if (selectedIndexData?.length > 0) {
            setSelectedIndexData([...selectedIndexData, newlist])
        } else {
            setSelectedIndexData([newlist])
        }
        setSelectedIndex(newlist)
    }

    const updateNew = () => {

        if (selectedIndex) {
            const { Affiliation, Busines, CARM, Country, Desc, Financially, dev_105, Primary, Risk, Sell, Underwriting, dev_101, dev_103, endDate, dev_102, id, dev_104, startDate } = selectedIndex;
            setIsLoading(true)

            if (!(Affiliation && Busines && CARM && Country && Desc && Financially && dev_105 && Primary && Risk && Sell && Underwriting && dev_101 && dev_103 && endDate && dev_102 && id && dev_104 && startDate)) {
                updateErrorMessate("All fields are required");
                return false;
            } else if (isSpace(dev_101) || isSpace(dev_105) || isSpace(dev_103) || isSpace(endDate) || isSpace(dev_102)) {
                updateErrorMessate("You can not put space for Adjustments Type, Enty Id, Area Id, Reporting Facility Id, Total Relationship Id");
                return false;
            } else if (dev_101.length > 1) {
                updateErrorMessate("Adjustments Type Only accepts 'A' for Add and 'C' for Change");
            } else {
                setErrorIs(false);
                setErrorIsPopup(false)
                setTimeout(() => { setIsLoading(false); props.history.push("/adjustment") }, 2000)
                return true;
            }
        } else {
            props.history.push("/adjustment")
        }
    }

    const updateErrorMessate = (message) => {
        setErrorIs(true);
        setErrorIsPopup(true)
        setIsLoading(false)
        setErrorMessage(message);
    }

    const isSpace = (checkWord) => {
        let word = checkWord;
        if (word && !isNaN(word)) {
            word = checkWord.toString();
        }
        if (word && word.indexOf(" ") > -1) {
            return true;
        } else {
            return false;
        }
    }

    const deleteRow = (index) => {
        console.log(actionId)

        const recordIds = Object.keys(actionId).map((item) => {
            if (actionId[item]?.recordId) {

                const itemId = actionId[item].recordId;
                console.log("actionId[item]", itemId)
                return itemId;
            } else {
                return false
            }
        })

        const activeRecordIds = recordIds.filter((record) => record);
        // const filterdata = selectedIndexData.filter((row) => row.id !== actionId.id);

        console.log("activeRecordIds", ...activeRecordIds)
        apiDELETERequest({
            'endpoint': `/adjustment_field_values?record_id=${activeRecordIds}`
        }).then((resp) => {
            if (resp) {
                console.log(resp, "resprespresprespresp")

                setSelectedIndex(null);
                setIsShowModel(false);
                setPayload([]);
                loadData(adjustmentId);
            }
        }).catch((e) => {
            console.log(e)
        })
        // console.log(filterdata)
        // setSelectedIndexData(filterdata)

    }

    const getRandromNumber = () => {
        return Math.floor((Math.random() * 10000) + 1);
    }

    const changeHandler = (event, rowData, index, header) => {
        const { name, value } = event.target;
        const rowupdate = JSON.parse(JSON.stringify(selectedIndexData));

        if (!rowData[name]) {
            rowData[name] = {}
        } //recordId
        if (!rowData[name].record_id) {
            rowData[name].record_id = getRandromNumber();
        }
        rowData[name].adjustment_field = {
            field_id: header.field_id
        }
        rowData[name].adjustment = {
            adjustment_id: adjustmentId
        }
        rowData[name].field_value = value;
        if (index === "") {
            rowData.record_id = selectedIndexData.length
            rowupdate[selectedIndexData.length] = rowData;
        } else {
            rowupdate[index] = rowData;
        }
        addInPayload(rowData[name])
        setSelectedIndexData(rowupdate);
    }

    const addInPayload = (data) => {
        const listRm = payload.filter((row) => row.record_id !== data.record_id);
        listRm.push(data)
        console.log("listRmlistRmlistRm", listRm)
        setPayload(listRm);
    }

    const changeDateHandler = (event) => {
        const { name, value } = event.target;
        const rowupdate = JSON.parse(JSON.stringify(dates));
        rowupdate[name] = value;
        setDates(rowupdate);
    }

    const changeDateReportHandler = (event) => {
        const { name, value } = event.target;
        console.log(value)
        setReportDate(value);
        console.log(adjustmentCreate)

    }

    useEffect(() => {
        if (!adjustmentCreate) {
            setAdjustmentCreate(true)
            saveAdjustment("DRAFT", adjustmentId);
        }
    }, [reportDate]);

    const fileUploadHandler = (e) => {
        e.preventDefault();
        if (e.target.value.length !== 0) {
            var files = e.target.files, f = files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                let readedData = XLSX.read(data, { type: 'binary' });
                const wsname = readedData.SheetNames[0];
                const ws = readedData.Sheets[wsname];
                const dataParse = XLSX.utils.sheet_to_csv(ws, { header: 1 });
                const dataJson = prepareJson(dataParse);
                setFileUploaded(dataJson);

                console.log("dataJson", dataJson)
                const datainFormet = formetExcelData(dataJson)
                console.log("datainFormet", datainFormet)

                let finalData;
                if (selectedIndexData) {
                    finalData = [...selectedIndexData, ...datainFormet]
                } else {
                    finalData = datainFormet
                }

                setSelectedIndexData(finalData)
            };
            reader.readAsBinaryString(f)
        }
    }

    const getFieldId = (fieldName) => {

        const colum = headerData.filter(field => {

            if (field.field_name === fieldName) {
                return field
            }
        })
        if (colum.length > 0) {
            return colum[0].field_id;
        }

    }
    const formetExcelData = (data) => {
        const excelPayload = []
        let rowList = data.map((row, index) => {
            let rowData = { id: index };
            const rowid = getRandromNumber()
            Object.keys(row).map((field) => {
                const fieldName = field.replace(" ", "_")
                rowData[fieldName] = {
                    field_value: row[field],
                    record_id: getRandromNumber(),
                    row: rowid,
                    adjustment_field: {
                        field_id: getFieldId(field)
                    },
                    adjustment: { adjustment_id: adjustmentId }
                }
                if (row[field]) {
                    excelPayload.push(rowData[fieldName])
                }

            })

            return rowData;
        })
        console.log("excelPayload", excelPayload)
        saveRecord(excelPayload)
        rowList.length = rowList.length - 1;
        return rowList;
    }

    const prepareJson = (csv) => {
        var lines = csv.split("\n");
        var result = [];
        var headers = lines[0].split(",");
        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        //return result; //JavaScript object
        return result; //JSON
    }

    const removeError = () => {
        setErrorIsPopup(false)
    }

    const getNextDate = (date) => {
        const nexdate = new Date(date);
        var year = nexdate.getFullYear();
        var mes = nexdate.getMonth() + 1;
        var dia = nexdate.getDate() + 1;
        mes = mes < 10 ? `0${mes}` : mes;
        dia = dia < 10 ? `0${dia}` : dia;
        var fecha = year + "-" + mes + "-" + dia;

        return fecha
    }

    const getTodayDate = () => {
        const nexdate = new Date();
        var year = nexdate.getFullYear();
        var mes = nexdate.getMonth() + 1;
        var dia = nexdate.getDate() + 1;
        mes = mes < 10 ? `0${mes}` : mes;
        dia = dia < 10 ? `0${dia}` : dia;
        var fecha = year + "-" + mes + "-" + dia;

        return fecha
    }

    const saveRecord = (dataPayload) => {

        apiPOSTRequest({
            'endpoint': `/adjustment_field_values`,
            "payload": dataPayload
        }).then((resp) => {
            if (resp) {
                console.log(resp, "resprespresprespresp")
                saveRecordCancle();
            }
        }).catch((e) => {
            console.log(e)
        })

    }

    const saveRecordCancle = () => {
        if (Object.keys(selectedIndex).length < 2) {
            const dataAll = selectedIndexData.filter((row) => {
                return row.id != selectedIndex.id;
            })

            setSelectedIndexData(dataAll)
        }
        setSelectedIndex(null)
        setPayload([])
    }

    const saveAdjustment = (status, id = 0) => {
        if (status === "SUBMITTED" && selectedIndexData.length < 1) {
            setErrorIsPopup(true);
            setErrorMessage("You should have to at least one record in adjustment")
        } else {
            const adjustment_id = id ? id : adjustmentId
            const saverow = [
                {
                    adjustment_id: adjustment_id,
                    adjustment_start_date: reportDate,
                    adjustment_end_date: getNextDate(reportDate),
                    adjustment_status: status,
                    available_for_reviewer: "true",
                    adjusted_data_extract: {
                        data_extract_id: 1
                    }
                }
            ]
            const method = id ? "POST" : "PUT";
            const api = id ? `/adjustments` : `/adjustments/${adjustment_id}`
            const dataPayload = method === "PUT" ? saverow[0] : saverow;
            apiPOSTRequest({
                'endpoint': api,
                "payload": dataPayload,
                "method": method
            }).then((resp) => {
                if (resp) {
                    console.log(resp, "resprespresprespresp")
                    if (!id) {
                        props.history.push("/adjustment")
                    }
                }
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    return (
        <div className="new">
            <div className="container  m-1">
                <div className="row">
                    <div className="col-sm-6">
                        <h3 className="headding">Requested Adjustments </h3>
                    </div>

                </div>
            </div>
            <div className="container  m-11">
            </div>
            <div className="container  m-1">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label for="email"> Report Date:</label>
                                    <span className="date">
                                        <input type="date" className="form-control" name="report" id="date1" onChange={(e) => changeDateReportHandler(e)} value={reportDate ? reportDate : ''} />
                                    </span>
                                </div>

                            </div>

                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label for="email"> Refinery:</label>
                                    <select className="form-control" id="refinery">
                                        <option>Select refinery</option>
                                        <option>RDP</option>
                                        <option>MCI</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label for="email"> Select Location:</label>
                                    <select className="form-control" id="refinery">
                                        <option>Select refinery</option>
                                        <option>US</option>
                                        <option>UK</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {reportDate &&
                            <div className="scroll-table-sm">
                                <table className="table table-condensed clickable-table">
                                    <thead>
                                        <tr>
                                            <th className='icon'></th>
                                            <th className='icon'></th>
                                            <th className='icon'></th>
                                            {headerData?.map((header) => (
                                                <th className='data lg' key={header.field_id}>{header.field_name}</th>
                                            ))}

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {selectedIndexData.map((rowData, index) => (
                                            <>
                                                {selectedIndex && selectedIndex.id === rowData.id ?

                                                    <tr key={index} className={`clickable-row ${selectedIndex.id === rowData.id && errorIs && "active"}`} >
                                                        <td><button className="glyphicon1 glyphicon-trash1 btn-link text-danger1" onClick={() => handleShowModel(rowData)} title="Delete Row">X</button></td>
                                                        <td><i className='glyphicon glyphicon-edit' title="Edit Row" onClick={() => selectedRow(rowData)}></i></td>
                                                        <td>  {rowData.Comment && <i className='glyphicon glyphicon-info-sign' title={rowData.Comment}></i>}</td>

                                                        {headerData.map((header) => (
                                                            header.field_id !== "dev_138" && header.field_id !== "dev_139" &&
                                                            <td kye={`coll${index}`}> <input type='text' value={rowData[header.field_name.replace(" ", "_")]?.field_value} name={header.field_name.replace(" ", "_")} onChange={(e) => changeHandler(e, rowData, index, header)} /></td>

                                                        ))}
                                                        {/* <td> <input type='date' value={dates.report} name="startDate" onChange={(e) => changeHandler(e, rowData, index)} /></td>
                                                        <td> <input type='date' value={getNextDate()} name="endDate" onChange={(e) => changeHandler(e, rowData, index)} /></td> */}
                                                    </tr>
                                                    :
                                                    <tr className={`clickable-row ${selectedIndex?.id === rowData.id && "active"}`} >
                                                        <td><button className="glyphicon1 glyphicon-trash1 btn-link text-danger1" onClick={() => handleShowModel(rowData)} title="Delete Row">X</button></td>
                                                        <td><i className='glyphicon glyphicon-edit' title="Edit Row" onClick={() => selectedRow(rowData)}></i></td>
                                                        <td>  {rowData.Comment && <i className='glyphicon glyphicon-info-sign' title={rowData.Comment}></i>}</td>

                                                        {headerData.map((header) => (
                                                            <td>{rowData[header.field_name.replace(" ", "_")]?.field_value} </td>

                                                        ))}
                                                        {/* <td>{getNextDate()}</td> */}
                                                    </tr>
                                                }

                                            </>
                                        ))
                                        }

                                        {selectedIndex && selectedIndex.id === "" &&
                                            <tr className={`clickable-row ${selectedIndex.id === selectedIndex.id && "active1"}`} >
                                                <td>new<button className="glyphicon1 glyphicon-trash1 btn-link text-danger1" onClick={() => handleShowModel(selectedIndex)} title="Delete Row">X</button></td>
                                                <td><i className='glyphicon glyphicon-edit' title="Edit Row" onClick={() => selectedRow(selectedIndex)}></i></td>
                                                {formLayout.map((header) => (
                                                    header.field_id !== "dev_138" && header.field_id !== "dev_139" &&
                                                    <td> <input type='text' value={selectedIndex[header.field_id]?.field_value} name={header.field_id} onChange={(e) => changeHandler(e, selectedIndex, selectedIndex.id, header)} /></td>

                                                ))}
                                                {/* <td> <input type='date' value={selectedIndex.startDate} name="startDate" onChange={(e) => changeHandler(e, selectedIndex, selectedIndex.id)} /></td>
                                                <td> <input type='date' value={selectedIndex.endDate} name="endDate" onChange={(e) => changeHandler(e, selectedIndex, selectedIndex.id)} /></td> */}

                                            </tr>
                                        }
                                        {selectedIndexData.length < 1 &&
                                            (<tr>
                                                <td colSpan="4">No Adjustments to show.</td>
                                            </tr>)
                                        }
                                    </tbody>


                                </table>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {
                reportDate &&
                <div>
                    <div className="m-1 row">
                        <div className='container'>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="upload"> Upload Ajustment </label>
                                    <span className="date">
                                        <input type="file" className="form-control" name="adjustment_file_excel" id="adjustment_file" onChange={(e) => fileUploadHandler(e)} />
                                    </span>
                                </div>
                            </div>
                            <div className="col-sm-4 text-center">
                                {selectedIndex ?
                                    <>
                                        <button onClick={() => saveRecord(payload)} className="btn btn-default">Save Record</button>
                                        <button onClick={saveRecordCancle} className="btn btn-default">Cancel</button>
                                    </>
                                    :
                                    <button onClick={creatNew} className="btn btn-default">Add Record</button>
                                }
                            </div>
                            <div className="col-sm-4 text-right">
                                {!selectedIndex &&
                                    <button onClick={() => saveAdjustment("DRAFT")} className="btn btn-primary"> Save as Draft</button>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="footer navbar-fixed-bottom1 m-1">
                        <div className="container footer-btn" >
                            <div className="row">
                                <div className="col-sm-6">
                                    <Link to="/adjustment" className="btn btn-default"> Cancel</Link>
                                </div>
                                <div className="col-sm-6 text-right">
                                    {!selectedIndex &&
                                        <button className="btn btn-primary" onClick={() => saveAdjustment("SUBMITTED")}> Submit</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                isShowModel &&
                <ConfirmationModel handleHide={handleHideModel} onDelete={deleteRow} show={isShowModel} />
            }

            {
                errorIsPopup &&
                <MessagePopup title="Validation Errors" styleclassName="text-danger" message={errorMessage} handleHide={removeError} />
            }
        </div >
    )
}

export default withRouter(NewAdjustments);
