import React from 'react';
import {Modal} from 'react-bootstrap';

function CustomModal({headerTitle,showProps, onHide,children}) {
    return (
            <Modal show={showProps} onHide={onHide}>
                <Modal.Header 
                    style={{
                            display:'flex', 
                            justifyContent:'center'
                        }}
                    >
                    <h1>{headerTitle}</h1>
                </Modal.Header>
                <Modal.Body 
                    style={{
                        display:'flex',
                        flexDirection:'column', 
                        justifyContent:'center', 
                        padding:15
                    }}
                >
                    {children}
                </Modal.Body>
            </Modal>
    )
}

export default CustomModal
