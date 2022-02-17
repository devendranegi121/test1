import React from 'react'
export default function ConfirmationModel(props) {
    const {handleHide , onDelete} = props;
    return (
        <div className="static-modal">

            <div id="myModal" className="modal fade in" role="dialog" style={{display: "block"}}>
                <div className="modal-dialog modal-sm">

                    <div className="modal-content">
                        <div className="modal-header">
                            
                            <h3 className="modal-title">Confirm</h3>
                        </div>
                        <div className="modal-body">
                            <p> Are you sure you want to delete?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={handleHide}>Cancel</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={onDelete} >Delete</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
