import React, {useState, useEffect} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import swal from 'sweetalert';
import {deleteData, getData,postLogout} from "../../Services/Functions";


function Companies() {

    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [offset, setOffset] = useState(0);
    const [paginationDetails, setPaginationDetails] = useState({
        current_page: 1,
        per_page: 10,
        total: null,
        last_page: null,
    });

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    const handleData = (res) => {
        if(res.status === 200)
        {
            setCompanies(res.data.companies['data'])

            setPaginationDetails({
                current_page : res.data.companies['current_page'],
                per_page : res.data.companies['per_page'],
                total : res.data.companies['total'],
                last_page : res.data.companies['last_page']
            })
        }
    };

    useEffect(() => {
        getData('companies',offset).then(res => {
            handleData(res)
        })

    }, [offset])



    const deleteCompany = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        swal({
            title: "Are you sure?",
            text: "You want to delete this Record?",
            icon: "warning",
            dangerMode: true,
        })
        .then(willDelete => {
            if (willDelete) {
                deleteData('companies',id).then(res=>{
                if(res.data.status === 200)
                {
                    thisClicked.closest("tr").remove();
                        swal({
                                title: "Done!",
                                text: "Record Deleted",
                                icon: "success",
                                timer: 2000,
                                button: false
                            })
                    navigate('/dashboard');
                    window.location.reload()
                }

                else if(res.data.status === 404)
                {
                    swal("Error",res.data.message,"error");
                }
              });

            }
        });

    }

    const logout = () => {
        localStorage.removeItem('token');
        postLogout()
        navigate('/');
    }


        var company_HTMLTABLE = "";

        company_HTMLTABLE = companies.map( (item, index) => {
            return (

                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                        <img src={ "http://localhost:8000/uploads/" + item.logo } className="img-fluid img-bordered" width="200px"
                        />

                    </td>
                    <td>{item.website}</td>
                    <td>
                        <Link to={`/edit-company/${item.id}`} className="btn btn-primary btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteCompany(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-2">
                            <div className="card-header">
                            <button onClick={logout} className="btn btn-danger btn-sm">Logout</button>
                        </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h4>Companies Data
                                    <Link to={'/add-company'} className="btn btn-success btn-sm float-end"> Add Company</Link>
                                </h4>
                            </div>
                            <div className="card-body">

                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email </th>
                                            <th>Logo</th>
                                            <th>Website</th>
                                            <th>edit</th>
                                            <th>delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {company_HTMLTABLE}
                                    </tbody>

                                </table>

                                <ReactPaginate
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={paginationDetails.last_page}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"}/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Companies;