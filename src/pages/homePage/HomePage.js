import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AlertMessage from '../../components/alertMessage/AlertMessage';
import AdjusterRequestAudit from '../requestAudit/AdjusterRequestAudit';

export default function HomePage(props) {

    const [messageStatus, setMessageStatus] = useState(true)
    const { loginUser } = props
    useEffect(() => {
    }, [])

    const closeAlert = () => {
        setMessageStatus(false)
    }


    return (
        <div className="body-layout">
            {messageStatus &&
                <AlertMessage closeAlert={closeAlert} message={`Welcome ${loginUser.name}`} />
            }
            {loginUser &&
                loginUser.role === "Adjuster" ?
                <div className="container  m-1">
                    <div className="row slideanim m-1">
                        <div className="col-sm-offset-2 col-sm-4 col-xs-12">

                            <div className="panel panel-default text-center">

                                <div className="panel-btn">

                                    <Link to="adjustment" className="btn btn-lg btn-block btn-primary">Make Adjustments</Link>

                                </div>
                            </div>

                        </div>

                        <div className="col-sm-4 col-xs-12">

                            <div className="panel panel-default text-center">

                                <div className="panel-btn">
                                    <Link to="adjuster-request-audit" className="btn btn-lg btn-block btn-primary">Request Audit Report</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div> : loginUser.role === "Approver" ?
                    <div className="container  m-1">
                        <div className="row slideanim">
                            <div className="col-sm-offset-2 col-sm-4 col-xs-12">

                                <div className="panel panel-default text-center">

                                    <div className="panel-btn">

                                        <Link to="approver" className="btn btn-lg btn-block btn-primary">Review Adjustments</Link>

                                    </div>
                                </div>

                            </div>

                            <div className="col-sm-4 col-xs-12">

                                <div className="panel panel-default text-center">

                                    <div className="panel-btn">
                                        <Link to="request-audit" className="btn btn-lg btn-block btn-primary">Request Audit Report</Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    :
                    <AdjusterRequestAudit />
            } 
        </div>
    )
}
