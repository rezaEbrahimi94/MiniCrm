import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import swal from 'sweetalert';
import {updateData, getEdit, getValues} from "../../Services/Functions";
import Select from 'react-select'


function EditEmployee() {

    const navigate = useNavigate();
    const [employeeInput, setEmployee] = useState([]);
    const [errorInput, setError] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
    const [options, setOptions] = useState()
    const {id} = useParams();

    const handleData = (res) => {

        if (res.data.status === 200) {
            setEmployee(res.data.employee);
            setSelectedOption({
                    label: res.data.employee?.company?.name,
                    value: res.data.employee?.company?.id
                }
            )
        } else if (res.data.status === 404) {
            navigate('/dashboard');
        }
    }

    useEffect(() => {
        getValues().then(res => {
            if (res.status === 200) {
                setOptions(res.data.values)
            }
        })

        getEdit('employees', id).then(res => {
            handleData(res)
        })


    }, [navigate]);

    const handleInput = (e) => {
        const {name, value} = e.target;
        setEmployee({...employeeInput, [name]: value});
    }

    const handleTypeSelect = e => {
        setSelectedOption({
            label: e?.label || '',
            value: e?.value || ''
        })
    };

    const handleRes = (res) => {
        if (res.data.status === 200) {
            swal({
                title: "Success!",
                text: "Employee record is updated Successfully",
                icon: "success",
                timer: 2000,
                button: false
            })
            setEmployee({
                name: "",
                email: "",
                website: "",
                error_list: [],
            });
            navigate('/dashboard');
        } else if (res.data.status === 422) {
            setError(res.data.validate_err);
        }
    }

    const updateEmployee = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('first_name', employeeInput.first_name)
        data.append('last_name', employeeInput.last_name)
        data.append('email', employeeInput.email || '')
        data.append('phone', employeeInput.phone || '')
        data.append('company_id', selectedOption?.value || '')

        updateData('employees', id, data).then(res => {
            handleRes(res)
        })
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Employee
                                    <Link to={'/dashboard'} className="btn btn-primary btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">

                                <form onSubmit={
                                    updateEmployee
                                }>

                                    <div className="form-group mb-3">
                                        <label className="pr-3">First Name</label> <br/>
                                        <input type="text" className="form-item form-control" onChange={handleInput}
                                               name="first_name" value={employeeInput.first_name}/>
                                        <span className="text-danger">{errorInput.first_name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="pr-3">Last Name</label> <br/>
                                        <input type="text" className="form-item form-control" onChange={handleInput}
                                               name="last_name" value={employeeInput.last_name}/>
                                        <span className="text-danger">{errorInput.last_name}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Email </label>
                                        <input type="email" className="form-control" onChange={handleInput} name="email"
                                               value={employeeInput.email}/>
                                        <span className="text-danger">{errorInput.email}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Phone </label>
                                        <input type="text" className="form-control" onChange={handleInput} name="phone"
                                               value={employeeInput.phone}/>
                                        <span className="text-danger">{errorInput.phone}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Companies </label>
                                        <div>
                                            <Select
                                                value={selectedOption}
                                                isClearable={true}
                                                onChange={handleTypeSelect}
                                                options={options}
                                                name="company_id"

                                            />
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
        </div>
    );
}

export default EditEmployee;