import React, { useEffect, useState } from "react";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import MailerServices from "../../../services/Mailer";
import { Link } from "react-router-dom";


function MyMailers(){
    const [res, setRes] = useState({loading: false, data: null, error: null})

    useEffect(() => {
        setRes({loading: true, data: null, error: null})
        MailerServices.index()
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }, [])

    let loader = null
    if(res.loading){
        loader = <div className="loader_mid"><Loader/></div>
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
    }
    let content = null
    if(res.data){
        if(res.data.status === 'success'){
            content = res.data.message.map((mailer, index) => 
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{mailer.name}</td>
                    <td className="text-capitalize">{mailer.frequency.replace("_", " ")}</td>
                    <td>{(mailer.status === "running") ? (
                        <span className="text-success text-capitalize">{mailer.status}</span>
                    ): (
                        <span className="text-danger text-capitalize">{mailer.status}</span> 
                    )}
                    </td>
                    <td>{new Date(mailer.created_at).toUTCString()}</td>
                    
                    <td><Link to={`/mailers/${mailer.id}`} className="btn btn-outline-primary">Details</Link></td>
                </tr>
            )
        }
    }
    
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Frequency</th>
                    <th>Status</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                <ToastContainer/>
                {loader}
                {content}
            </tbody>
        </table>
    )
}

export default MyMailers
