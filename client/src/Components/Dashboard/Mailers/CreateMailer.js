import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import MailerServices from "../../../services/Mailer";


function CreateMailer(props){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [info, setInfo] = useState({loading: false, data: null, error: null})
    const [name, setName] = useState(null)
    const [subject, setSubject] = useState(null)
    const [replyEmail, setReplyEmail] = useState(props.user.email)
    const [frequency, setFrequency] = useState(null)
    const [listId, setListId] = useState(null)
    const [templateId, setTemplateId] = useState(null)
    const [status, setStatus] = useState("running")

    const create = (e) => {
        e.preventDefault()
        setRes({loading: true, data: null, error: null})
        let data = {name: name, subject: subject, reply_email: replyEmail, 
                    frequency: frequency, list_id: listId, template_id: templateId, status: status}
        MailerServices.create(data)
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }

    useEffect(() => {
        setInfo({loading: true, data: null, error: null})
        MailerServices.getInfo()
        .then(response => {
            setInfo({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setInfo({loading: false, data: null, error: error.response.data})
        })
    }, [])

    

    let loader = null
    if(res.loading || info.loading){
        loader = loader = <div className="loader_mid"><Loader/></div>
    }
    if(res.data){
        if(res.data.status === 'success'){
            toast.success(res.data.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        setRes({loading: false, data: null, error: null})
        window.location.reload()
    }

    if(res.error){
        if(res.error.status === "fail"){
            toast.error(res.error.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        if(res.error.status === "fail-arr"){
            for (const [key, value] of Object.entries(res.error.message)) {
                toast.error(value[0], {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
            }
        }
        setRes({loading: false, data: null, error: null})
    }
    let content = null
    if(info.data){
        if(info.data.status === 'success'){
            content = 
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Mailer <span style={{fontSize: "x-small"}}>All fields are required</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={create}>
                        <ToastContainer/>
                        {loader}
                        <div className="row mb-3 align-items-center">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Mailer name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" className="form-control" onChange={(e) => {setName(e.target.value)}}/>
                            </div>
                        </div> 
                        <div className="row mb-3 align-items-center">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Email subject</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input className="form-control" rows={5} onChange={(e) => {setSubject(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Reply email</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input className="form-control" value={replyEmail} rows={5} onChange={(e) => {setReplyEmail(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Frequency</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <select className="form-select" onChange={(e) => {setFrequency(e.target.value)}}>
                                    <option selected disabled>Select one</option>
                                    <option value="daily">Daily</option>
                                    <option value="twice_daily">Twice daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="twice_monthly">Twice monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Select email list</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <select className="form-select" onChange={(e) => {setListId(e.target.value)}}>
                                    <option selected disabled>
                                        {(info.data.message.lists.length === 0) ? ("No email list created yet!") : ("Select one")}
                                    </option>
                                    {
                                        info.data.message.lists.map((list, i) => 
                                            <option key={i} value={list.id}>{list.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Select Template</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <select className="form-select" onChange={(e) => {setTemplateId(e.target.value)}}>
                                    <option selected disabled>
                                        {(info.data.message.templates.length === 0) ? ("No template created yet!") : ("Select one")}
                                    </option>
                                    {
                                        info.data.message.templates.map((template, i) => 
                                            <option key={i} value={template.id}>{template.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Run after creation ?</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <select className="form-select" onChange={(e) => {setStatus(e.target.value)}}>
                                    <option value="running" selected>Yes</option>
                                    <option value="stopped">No</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                    <button className="btn btn-outline-secondary" onClick={props.onHide}>Close</button>
                    <button className="btn btn-outline-primary" onClick={create}>Create</button>
                </Modal.Footer>
            </Modal>
        }
    }
    return content
}

export default CreateMailer
