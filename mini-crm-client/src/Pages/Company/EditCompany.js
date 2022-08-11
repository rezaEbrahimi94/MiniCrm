import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import companies from "./Companies";
import {getEdit, updateData} from "../../Services/Functions";


function EditCompany() {

	const navigate = useNavigate();
	const [companyInput, setCompany] = useState([]);
	const [errorInput, setError] = useState([]);
	const [pick, setPick] = useState(0);
	const { id } = useParams();

	const handleData = (res)=>{
		if (res.data.status === 200) {
			setCompany(res.data.company);

		}
		else if (res.data.status === 404) {
			navigate('/dashboard');
		}
	}

	useEffect(() => {

		getEdit('companies', id).then(res => {
			handleData(res)
		})

	}, [navigate]);

	const handleInput = (e) => {
		const { name, value } = e.target;
		setCompany({ ...companyInput, [name]: value });
	}

	const handleLogo = (e) => {
		setCompany({
			...companyInput, logo: e.target.files[0]
		})
		setPick(1)
	}

	const handleRes = (res) => {
		if (res.data.status === 200) {
			// swal("Success!", res.data.message, "success");
			swal({
				title: "Success!",
				text: "Company updated Successfully",
				icon: "success",
				timer: 2000,
				button: false
			})
			setError([]);
			navigate('/dashboard');
		}
		else if (res.data.status === 422) {

			setError(res.data.validate_err);
		} else if (res.data.status === 404) {
			swal("Error", res.data.message, "error");
			navigate('/dashboard');
		}
	}

	const updateCompany = async (e) => {
		e.preventDefault();

		const data = new FormData()
		if (pick) {
			data.append('logo', companyInput.logo)
		}
		data.append('name', companyInput.name)
		data.append('email', companyInput.email)
		data.append('website', companyInput.website)

		updateData('companies', id, data).then(res => {
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
								<h4>Edit Company
									<Link to={'/dashboard'} className="btn btn-primary btn-sm float-end"> BACK</Link>
								</h4>
							</div>
							<div className="card-body">

								<form onSubmit={updateCompany} >
									<div className="form-group mb-3">
										<label>Name</label>
										<input type="text" name="name" onChange={handleInput} value={companyInput.name} className="form-control" />
										<span className="text-danger">{errorInput.name}</span>
									</div>
									<div className="form-group mb-3">
										<label>Email</label>
										<input type="email" name="email" onChange={handleInput} value={companyInput.email} className="form-control" />
										<span className="text-danger">{errorInput.email}</span>
									</div>
									<div className="form-group mb-3">
										<label>Website</label>
										<input type="text" name="website" onChange={handleInput} value={companyInput.website} className="form-control" />
										<span className="text-danger">{errorInput.website}</span>
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
											<span className="text-danger">{errorInput.logo}</span>

										</div>
									</div>
									<div className="form-group mb-3">
										<button type="submit" id="updatebtn" className="btn btn-success float-end">Update</button>
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

export default EditCompany;