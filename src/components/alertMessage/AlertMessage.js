import React from 'react'

export default function AlertMessage(props) {

    const {closeAlert} = props;
    return (
        <div className="container ">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="alert alert-info alert-dismissible fade in">
                            <button className="close" onClick={()=>closeAlert()}  data-dismiss="alert" aria-label="close">&times;</button>
                            <strong>{props.message}</strong> .
                        </div>
                    </div>
                </div>
            </div>
    )
}
