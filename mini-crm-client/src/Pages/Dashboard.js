import React, {useState, useEffect, Fragment} from 'react';
import Companies from "./Company/Companies";
import Employees from "./Employee/Employees";


function Dashboard() {
    return(
        <Fragment>
            <Companies/>
            <br/>
            <Employees/>
        </Fragment>
    );

}

export default Dashboard;