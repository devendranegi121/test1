import React from 'react'

export default function NewAdjustments() {
    return (
        <div className="new">
            <div className="container  m-1">
                <div className="row">
                    <div className="col-sm-12">
                        <h3 className="headding">Submitted Adjustments</h3>
                    </div>
                </div>
            </div>
            <div className="container  m-1">
                <div className="row">
                    <div className="col-sm-6">
                        <form className="form-inline" action="/action_page.php">
                            <div className="form-group">
                                <label for="email"> Date:</label>
                                <span className="date"> 
                                    <input type="date" className="form-control" id="date" value="2022-06-01" />
                                </span>
                            </div>
                            <div className="form-group">
                                <select className="form-control" id="refinery">
                                    <option>Select refinery</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>

                        </form>

                        <table className="table table-condensed m-1 clickable-table">
                            <thead>
                                <tr>
                                    <th>Change/ID </th>
                                    <th>Refinery</th>
                                    <th>Lorem</th>
                                    <th>Application</th>
                                </tr>
                            </thead>
                            <tbody>


                                <tr className="clickable-row">
                                    <td>Change ID </td>
                                    <td>Refinery</td>
                                    <td>Lorem</td>
                                    <td>Application</td>
                                </tr>

                                <tr className="clickable-row">
                                    <td>Change ID </td>
                                    <td>Refinery</td>
                                    <td>Lorem</td>
                                    <td>Application</td>
                                </tr>

                                <tr className="clickable-row">
                                    <td>Change ID </td>
                                    <td>Refinery</td>
                                    <td>Lorem</td>
                                    <td>Application</td>
                                </tr>

                                <tr className="clickable-row">
                                    <td>Change ID </td>
                                    <td>Refinery</td>
                                    <td>Lorem</td>
                                    <td>Application</td>
                                </tr>
                                <tr>
                                    <td colspan="4">No Adjustments to show.</td>

                                </tr>
                            </tbody>
                        </table>

                        <div className="alert alert-info m1">
                            Make all adjustments in right column, then click "<strong>Add Record</strong>". Once all records
                            have been adjusted, click on Submit.
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="scroll-table">
                            <table className="table table-condensed key-value ">
                                <thead>
                                    <tr>
                                        <th>Key </th>
                                        <th>Value</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Key</td>
                                        <td> <input type="text" className="form-control" /> </td>
                                    </tr>
                                    <tr>
                                        <td>Key</td>
                                        <td> <input type="text" className="form-control" /> </td>
                                    </tr>
                                    <tr>
                                        <td>Key</td>
                                        <td> <input type="text" className="form-control" /> </td>
                                    </tr>
                                    <tr>
                                        <td>Key</td>
                                        <td> <input type="text" className="form-control" /> </td>
                                    </tr>
                                    <tr>
                                        <td>Key</td>
                                        <td> <input type="text" className="form-control" /> </td>
                                    </tr>
                                    <tr>
                                        <td>Key</td>
                                        <td> <input type="text" className="form-control" /> </td>
                                    </tr>
                                    <tr>
                                        <td>Key</td>
                                        <td> <input type="text" className="form-control" /> </td>
                                    </tr>
                                    <tr>
                                        <td>Key</td>
                                        <td> <input type="text" className="form-control" /> </td>
                                    </tr>
                                    <tr>
                                        <td>Key</td>
                                        <td> <input type="text" className="form-control" /> </td>
                                    </tr>
                                    <tr>
                                        <td>Key</td>
                                        <td> <input type="text" className="form-control" /> </td>
                                    </tr>
                                    <tr>
                                        <td>Key</td>
                                        <td> <input type="text" className="form-control" /> </td>
                                    </tr>

                                </tbody>
                            </table>


                        </div>

                        <div className="m-1 text-right">
                            <button type="button" className="btn btn-default">Add Row</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer navbar-fixed-bottom1 m-1">
                <div className="container footer-btn" >
                    <div className="row">
                        <div className="col-sm-6">
                            <button className="btn btn-default"> Cancel</button>
                        </div>
                        <div className="col-sm-6 text-right">
                            <button className="btn btn"> Submit</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
