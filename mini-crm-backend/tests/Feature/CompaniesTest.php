<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CompaniesTest extends TestCase
{

    public function testUnauthenticatedRequest()
    {


        $this->json('GET', 'api/companies')
            ->assertStatus(200)
            ->assertJson([
                'status' => 401,
                'message' => 'Unauthenticated.',
            ]);

    }

    public function testGetCompaniesRequest()
    {


        $this->actingAs($this->user, 'sanctum')
            ->json('GET', 'api/companies')
            ->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'companies' =>
                        [
                        'current_page',
                        'data' =>[
                            '*'=>[
                                'id',
                                'name',
                                'email',
                                'logo',
                                'website',
                                'deleted_at',
                                'created_at' ,
                                'updated_at',
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

    public function testPostCompaniesValidationRequest()
    {

        $this->actingAs($this->user, 'sanctum')
            ->json('post', 'api/companies')
            ->assertStatus(200)
            ->assertJson(
                [
                    "status" => 422,
                    "validate_err" => [
                        "name" => [
                            "The name field is required."
                        ]
                    ]
                ]
            );
    }

    public function testPostCompaniesRequest()
    {
        $companyData = [
            'name' => 'Test Company',
            'email'=>'test@company.com',
            'website'=>'http://testcompany.com'
        ];

        $this->actingAs($this->user, 'sanctum')
            ->json('post', 'api/companies',$companyData)
            ->assertStatus(200)
            ->assertJson(
                [
                    "status" => 200,
                    "message" => "Company Added Successfully"
                ]
            );
    }

    public function testPutCompanyRequest()
    {
        $companyData = [
            'name' => 'Test Company',
            'email'=>'test@company.com',
            'website'=>'http://testcompany.com'
        ];

        $this->actingAs($this->user, 'sanctum')
            ->json('put', 'api/companies/1',$companyData)
            ->assertStatus(200)
            ->assertJson(
                [
                    "status" => 200,
                    "message" => "Company Updated Successfully"
                ]
            );
    }

    public function testPutFailRequest()
    {
        $companyData = [
            'name' => 'Test Company',
            'email'=>'test@company.com',
            'website'=>'http://testcompany.com'
        ];

        $this->actingAs($this->user, 'sanctum')
            ->json('put', 'api/companies/10000',$companyData)
            ->assertStatus(200)
            ->assertJson(
                [
                    'status' => 404,
                    'message' => 'Not found!',
                ]
            );
    }

    public function testDeleteCompanyRequest()
    {

        $this->actingAs($this->user, 'sanctum')
            ->json('delete', 'api/companies/1')
            ->assertStatus(200)
            ->assertJson(
                [
                    "status" => 200,
                    "message" => "Company Deleted Successfully"
                ]
            );
    }

    public function testDeleteFailCompanyRequest()
    {
        $this->actingAs($this->user, 'sanctum')
            ->json('delete', 'api/companies/10000')
            ->assertStatus(200)
            ->assertJson(
                [
                    'status' => 404,
                    'message' => 'Not found!',
                ]
            );
    }

}
