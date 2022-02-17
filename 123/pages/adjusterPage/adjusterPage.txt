import React from 'react'
import { Link } from 'react-router-dom'

export default function adjusterPage() {
    return (
        <div className="container  m-1">
                <div className="row slideanim">
                    <div className="col-sm-offset-2 col-sm-4 col-xs-12">
                         
                        <div className="panel panel-default text-center">
                            <div className="panel-heading">
                                <h3>Adjustment </h3>
                            </div>
                            <div className="panel-body">
                                <p><strong>Make</strong> </p>
                                <p><strong>Review</strong> </p>
                            </div>
                            <div className="panel-footer">
                               
                            <Link to="adjustment" className="btn btn-lg">View More</Link>
                            </div>
                        </div>
                        
                    </div>

                    <div className="col-sm-4 col-xs-12">
                         
                        <div className="panel panel-default text-center">
                            <div className="panel-heading">
                                <h3>Request audit  </h3>
                            </div>
                            <div className="panel-body">
                                <p><strong>Report/RAR</strong> </p>
                                 
                                <p><strong>Others</strong> </p>
                            </div>
                            <div className="panel-footer">
                               
                            <Link to="request-audit" className="btn btn-lg">View More</Link>
                            </div>
                        </div>
                         
                    </div>
                </div>
            </div>
    )
}
