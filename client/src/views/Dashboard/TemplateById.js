import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Dashboard/Navbar";
import Sidebar from "../../Components/Dashboard/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "../../css/dashboard.css"
import Loader from "../../Components/Loader";
import TemplateServices from "../../services/Template";
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import DeleteTemplate from "../../Components/Dashboard/Templates/DeleteTemplate";


function TemplateById(){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [updateRes, setUpdateRes] = useState({loading: false, data: null, error: null})
    const [showSide, setShowSide] = useState(true)
    const [showDelete, setShowDelete] = useState(false)
    const [selectedId, setSelectedId] = useState(false)
    const [html, setHtml] = useState(null)
    const [name, setName] = useState(null)
    const [assetsView, setAssetsView] = useState([])
    const [assets, setAssets] = useState({})
    const { id } = useParams()

    useEffect(() => {
        setRes({loading: true, data: null, error: null})
        TemplateServices.show(id)
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
            setHtml(response.data.html)
            setName(response.data.message.name)
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }, [])

    const update = () => {
        setUpdateRes({loading: true, data: null, error: null})
        var form = new FormData();
        for (const [key, value] of Object.entries(assets)) {
            form.append("assets[]", value)
        }
        form.append("view", html)
        form.append("name", name)
        TemplateServices.update(id, form)
        .then(response => {
            setUpdateRes({loading: false, data: response.data, error: null})
            setHtml(response.data.html)
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }

    let loader = null
    if(res.loading){
        loader = loader = <div className="loader_mid"><Loader/></div>
    }

    if(updateRes.data){
        if(updateRes.data.status === 'success'){
            toast.success(updateRes.data.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        setUpdateRes({loading: false, data: null, error: null})
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
    }

    const AssetsChangeHandler = (e) => {
        let temp = assets
        temp[e.target.id] = e.target.files[0]
        setAssets(temp)        
    }

    const CheckAssets = () => {
        //Check asssets
        var matches = (html.match(/<img/g) || []);
        var assets_view = matches.map((a, i) => 
            <div className="d-flex justify-content-around my-1" key={i + 1}>
                <label className="label">Choose asset number {i + 1} </label>
                <input type="file" className="input_assets" onChange={AssetsChangeHandler} name="assets[]" id={i + 1}/>
            </div>
        )
        setAssetsView(assets_view)
    }

    const HandelOnChange = (e) => {
        setHtml(e.target.value)
        CheckAssets()
    }

    const HandelShowDelete = (id) => {
        setSelectedId(id)
        setShowDelete(true)
    }
    
    let content = null
    if(res.data){
        if(res.data.status === 'success'){
            content =
            <div id="wrapper" className={(showSide) ? ("wrapper-content") : ("wrapper-content toggled")} onLoad={() => {CheckAssets()}}>
                <Sidebar active="Templates"/>
                <Navbar showSide={showSide} setShowSide={setShowSide}/>
                <div id="page-content-wrapper">    
                    <ToastContainer/>
                    {loader}           
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h1>My templates - {res.data.message.name}</h1>
                                    <button className="btn btn-outline-danger" onClick={() => {HandelShowDelete(res.data.message.id)}}><i className="fas fa-trash mx-1"></i>Delete template</button>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <Tabs defaultActiveKey="preview" className="mb-3">
                                            <Tab eventKey="preview" title="Preview" className="preview-container">
                                                <div dangerouslySetInnerHTML={{ __html: html }} id="preview"/>
                                            </Tab>
                                            <Tab eventKey="assets" title="Assets / images">
                                                <h5>{assetsView.length} assets founded in view</h5>
                                                <div className="mt-3">
                                                    {assetsView}
                                                </div>
                                            </Tab>
                                            <Tab eventKey="code" title="Code">
                                                <input type="text" className="form-control mb-3" value={name} id="temp_name" onChange={(e) => {setName(e.target.value)}}/>
                                                <textarea className="form-control" rows={20} defaultValue={html} onChange={HandelOnChange}></textarea>
                                            </Tab>
                                        </Tabs>                                       
                                    </div>
                                    <div className="card-footer d-flex justify-content-end py-3">
                                        <button className="btn btn-outline-primary" onClick={update}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DeleteTemplate show={showDelete} onHide={() => {setShowDelete(false)}} id={selectedId}/>
            </div>
        }
    }
    return content
}

export default TemplateById
