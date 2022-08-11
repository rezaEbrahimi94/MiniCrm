import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addData, getValues } from "../../Services/Functions";
import swal from 'sweetalert';
import Select from 'react-select'


function AddEmployee() {

	const navigate = useNavigate();
	const [employee, setEmployee] = useState({
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		company_id: '',
		error_list: [],
	});
	const [selectedOption, setSelectedOption] = useState("");
	const [options, setOptions] = useState()
	const handleInput = (e) => {
		const { name, value } = e.target;
		setEmployee({
			...employee, [name]: value
		});
	}
	const handleData = (res) => {
		if (res.data.status === 200) {
			swal({
				title: "Success!",
				text: "Employee record is added Successfully",
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
		}
		else if (res.data.status === 422) {
			// swal("All fields are mandetory","","error");
			setEmployee({ ...employee, error_list: res.data.validate_err });
		}
	}

	const saveEmployee = async (e) => {
		e.preventDefault();
		const data = new FormData()
		data.append('first_name', employee.first_name)
		data.append('last_name', employee.last_name)
		data.append('email', employee.email)
		data.append('phone', employee.phone)
		data.append('company_id', selectedOption || '')

		addData('employees', data).then(res => {
			handleData(res)
		})
	}

	const handleTypeSelect = e => {
		setSelectedOption(e.value);
	};

	useEffect(() => {
		getValues().then(res => {

			if (res.status === 200) {
				setOptions(res.data.values)
			}
		})

	}, [])


	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-5 mx-auto">
						<div className="card">
							<div className="card-header">
								<h4>
									Add Employee
									<Link className="btn btn-primary float-end" to={"/dashboard"}>Go Back</Link>
								</h4>
							</div>
							<div className="card-body">
								<form onSubmit={saveEmployee}>
									<div className="form-group mb-3">
										<label className="pr-3">First Name</label> <br />
										<input type="text" className="form-item form-control" onChange={handleInput} name="first_name" value={employee.first_name} />
										<span className="text-danger">{employee.error_list.first_name}</span>
									</div>
									<div className="form-group mb-3">
										<label className="pr-3">Last Name</label> <br />
										<input type="text" className="form-item form-control" onChange={handleInput} name="last_name" value={employee.last_name} />
										<span className="text-danger">{employee.error_list.last_name}</span>
									</div>

									<div className="form-group mb-3">
										<label>Email </label>
										<input type="email" className="form-control" onChange={handleInput} name="email" value={employee.email} />
										<span className="text-danger">{employee.error_list.email}</span>
									</div>

									<div className="form-group mb-3">
										<label>Phone </label>
										<input type="text" className="form-control" onChange={handleInput} name="phone" value={employee.phone} />
										<span className="text-danger">{employee.error_list.phone}</span>
									</div>

									<div className="form-group mb-3">
										<label>Companies </label>
										<div >
											<Select
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
		</>
	);
}

export default AddEmployee;
