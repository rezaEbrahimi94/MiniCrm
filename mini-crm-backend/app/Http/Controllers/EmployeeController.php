<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {

        $employees = Employee::with('company:id,name')
            ->orderBy('id','desc')
            ->paginate(10);
        return $this->sendResponse(200,'employees',$employees);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreEmployeeRequest $request
     * @return JsonResponse
     */
    public function store(StoreEmployeeRequest $request): JsonResponse
    {
        $employee = new Employee();
        $this->setEmployeeFields($employee,$request);
        $employee->save();
        return $this->sendResponse(200,'message','Employee Added Successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param Employee $employee
     * @return JsonResponse
     */
    public function show(Employee $employee): JsonResponse
    {
        return $this->sendResponse(200, 'employee',$employee);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Employee $employee
     * @return JsonResponse
     */
    public function edit(Employee $employee): JsonResponse
    {
        return $this->sendResponse(200, 'employee',$employee->load('company'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateEmployeeRequest $request
     * @param Employee $employee
     * @return JsonResponse
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee): JsonResponse
    {
        $this->setEmployeeFields($employee,$request);
        $employee->update();
        return $this->sendResponse(200,'message','Employee Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Employee $employee
     * @return JsonResponse
     */
    public function destroy(Employee $employee): JsonResponse
    {
        $employee->delete();
        return $this->sendResponse(200, 'message', 'Employee Deleted Successfully');
    }

    /**
     * Sets employee fields.
     *
     * @param Employee $employee
     * @param Request $request
     */
    private function setEmployeeFields(Employee $employee,Request $request){

        $employee->first_name = $request->input('first_name');
        $employee->last_name = $request->input('last_name');
        $employee->email = $request->input('email');
        $employee->phone = $request->input('phone');
        $employee->company_id = $request->input('company_id');

    }
}
