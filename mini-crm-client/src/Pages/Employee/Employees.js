import React, {useState, useEffect} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {deleteData, getData} from "../../Services/Functions";

import swal from 'sweetalert';


function Employees() {

    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [offset, setOffset] = useState(0);
    const [paginationDetails, setPaginationDetails] = useState({
        current_page: 1,
        per_page: 10,
        last_page: null,
    });


    const handleData = (res) => {
        if(res.status === 200)
        {
            setEmployees(res.data.employees['data'])

            setPaginationDetails({
                current_page : res.data.employees['current_page'],
                per_page : res.data.employees['per_page'],
                last_page : res.data.employees['last_page']
            })
        }
    };

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    useEffect(() => {
        getData('employees',offset).then(res => {
           handleData(res)
        })

    }, [offset])




    const deleteEmployee = (e, id) => {
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
                      deleteData('employees',id)
                        .then(res=>{
                        if(res.status === 200)
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
                        }

                        else if(res.status === 404)
                        {
                            swal("Error",res.data.message,"error");
                        }
                    });

                }
            });

    }


    var employee_HTMLTABLE = "";

    employee_HTMLTABLE = employees.map( (item, index) => {
        return (

            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.company?.name}</td>

                <td>
                    <Link to={`/edit-employee/${item.id}`} className="btn btn-primary btn-sm">Edit</Link>
                </td>

                <td>
                    <button type="button" onClick={(e) => deleteEmployee(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <h4>Employees Data
                                    <Link to={'/add-employee'} className="btn btn-success btn-sm float-end"> Add Employee</Link>
                                </h4>
                            </div>
                            <div className="card-body">

                                <table className="table table-bordered table-striped">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name </th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>company</th>
                                        <th>edit</th>
                                        <th>delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {employee_HTMLTABLE}
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

export default Employees;