import React from 'react'

export default function messagePopup(props) {
    const { handleHide , message, title, styleClass} = props;
    return (
        <div className={`static-modal ${styleClass}`}>
            <div id="myModal" className="modal fade in" role="dialog" style={{display: "block"}}>
                <div className="modal-dialog modal-sm">

                    <div className="modal-content">
                        <div className="modal-header">
                            
                            <h3 className="modal-title">{title}</h3>
                        </div>
                        <div className="modal-body">
                            <p> {message}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={handleHide}>Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
