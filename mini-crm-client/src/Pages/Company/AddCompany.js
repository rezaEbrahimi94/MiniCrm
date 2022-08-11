import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import {addData} from "../../Services/Functions";

function AddCompany() {

    const navigate = useNavigate();
    const [company, setCompany] = useState({
        name: "",
        email: "",
        website: "",
        logo: null,
        error_list: [],
    });
    const [pick, setPick] = useState(0);

    const handleInput = (e) => {
        const {name, value} = e.target;
        setCompany({
            ...company, [name]: value
        });
    }

    const handleLogo = (e) => {
        setCompany({
            ...company, logo: e.target.files[0]
        })
        setPick(1)
    }

    const handleData = (res) => {

        if (res.data.status === 200) {
            // swal("Success!", res.data.message, "success");
            swal({
                title: "Success!",
                text: "Company record is added Successfully",
                icon: "success",
                timer: 2000,
                button: false
            })
            setCompany({
                name: "",
                email: "",
                website: "",
                error_list: [],
            });
            navigate('/dashboard');
        } else if (res.data.status === 422) {
            // swal("All fields are mandetory","","error");
            setCompany({...company, error_list: res.data.validate_err});
        }
    }

    const saveCompany = async (e) => {
        e.preventDefault();
        const data = new FormData()
        if (pick) {
            data.append('logo', company.logo)
        }
        data.append('name', company.name)
        data.append('email', company.email)
        data.append('website', company.website)

        addData('companies', data).then(res => {
            handleData(res)
        })

    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-5 mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <h4>
                                    Add Company
                                    <Link className="btn btn-primary float-end" to={"/dashboard"}>Go Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={saveCompany}>
                                    <div className="form-group mb-3">
                                        <label className="pr-3">Name</label> <br/>
                                        <input type="text" className="form-item form-control" onChange={handleInput}
                                               name="name" value={company.name}/>
                                        <span className="text-danger">{company.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email </label>
                                        <input type="email" className="form-control" onChange={handleInput} name="email"
                                               value={company.email}/>
                                        <span className="text-danger">{company.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Website </label>
                                        <input type="text" className="form-control" onChange={handleInput}
                                               name="website" value={company.website}/>
                                        <span className="text-danger">{company.error_list.website}</span>
                                    </div>


                                    <div className="card-body">
                                        <div className="form-group py-2">
                                            <label htmlFor="images">Logo</label>
                                            <input
                                                type="file"
                                                name='logo'
                                                onChange={handleLogo}
                                                className="form-control"
                                            />
                                            <span className="text-danger">{company.error_list.logo}</span>

                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-success float-end">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCompany;
