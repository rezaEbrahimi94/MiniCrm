<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EmployeesTest extends TestCase
{
    public function testUnauthenticatedRequest()
    {


        $this->json('GET', 'api/employees')
            ->assertStatus(200)
            ->assertJson([
                'status' => 401,
                'message' => 'Unauthenticated.',
            ]);

    }

    public function testGetEmployeesRequest()
    {


        $this->actingAs($this->user, 'sanctum')
            ->json('GET', 'api/employees')
            ->assertStatus(200)
            ->assertJsonStructure([
                    'status',
                    'employees' =>
                        [
                            'current_page',
                            'data' =>[
                                '*'=>[
                                    "id",
                                    "first_name",
                                    "last_name",
                                    "email",
                                    "phone",
                                    "company_id",
                                    "deleted_at",
                                    "created_at",
                                    "updated_at",
                                    "company" => [
                                        "id",
                                        "name"
                                    ]
                                ]
                            ],
                            'first_page_url' ,
                            'from',
                            'last_page',
                            'last_page_url',
                            'links',
                            'next_page_url',
                            'path',
                            'per_page',
                            'prev_page_url',
                            'to',
                            'total',
                        ],
                ]
            );

    }

    public function testPostEmployeesValidationRequest()
    {

        $this->actingAs($this->user, 'sanctum')
            ->json('post', 'api/employees')
            ->assertStatus(200)
            ->assertJson(
                [
                    "status" => 422,
                    "validate_err" => [
                        "last_name" => [
                            'The last name field is required.'
                        ]
                    ]
                ]
            );
    }

    public function testPostEmployeesRequest()
    {
        $employeeData = [
            'first_name' => 'Employee',
            'last_name'=>'Employeean',
        ];

        $this->actingAs($this->user, 'sanctum')
            ->json('post', 'api/employees',$employeeData)
            ->assertStatus(200)
            ->assertJson(
                [
                    "status" => 200,
                    "message" => "Employee Added Successfully"
                ]
            );
    }

    public function testPutEmployeeRequest()
    {
        $employeeData = [
            'first_name' => 'Test Employee',
            'last_name'=>'testi',
        ];

        $this->actingAs($this->user, 'sanctum')
            ->json('put', 'api/employees/1',$employeeData)
            ->assertStatus(200)
            ->assertJson(
                [
                    "status" => 200,
                    "message" => "Employee Updated Successfully"
                ]
            );
    }

    public function testPutFailRequest()
    {
        $employeeData = [
            'name' => 'Test Employee',
            'email'=>'test@Employee.com',
            'website'=>'http://Employee.com'
        ];

        $this->actingAs($this->user, 'sanctum')
            ->json('put', 'api/employees/10000',$employeeData)
            ->assertStatus(200)
            ->assertJson(
                [
                    'status' => 404,
                    'message' => 'Not found!',
                ]
            );
    }

    public function testDeleteEmployeeRequest()
    {

        $this->actingAs($this->user, 'sanctum')
            ->json('delete', 'api/employees/1')
            ->assertStatus(200)
            ->assertJson(
                [
                    "status" => 200,
                    "message" => "Employee Deleted Successfully"
                ]
            );
    }

    public function testDeleteFailEmployeeRequest()
    {
        $this->actingAs($this->user, 'sanctum')
            ->json('delete', 'api/employees/10000')
            ->assertStatus(200)
            ->assertJson(
                [
                    'status' => 404,
                    'message' => 'Not found!',
                ]
            );
    }
}
