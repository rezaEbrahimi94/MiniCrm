<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    public function testMustEnterEmailAndPassword()
    {
        $this->json('POST', 'api/login')
            ->assertStatus(200)
            ->assertJson([
                "status" => 422,
                "validate_err" => [
                    'email' => ["The email field is required."],
                    'password' => ["The password field is required."],
                ]
            ]);
    }


    public function testSuccessfulLogin()
    {

        $loginData = ['email' => 'admin@admin.com', 'password' => 'password'];

        $this->json('POST', 'api/login', $loginData)
            ->assertStatus(200)
            ->assertJson([
                "status" =>200,
            ]);

        $this->assertAuthenticated();
    }

    public function testUnsuccessfulLogin()
    {

        $loginData = ['email' => 'admin@admin.com', 'password' => 'pass  word'];

        $this->json('POST', 'api/login', $loginData)
            ->assertStatus(200)
            ->assertJson([
                'status' => 401,
                'message' => 'Invalid credentials',
            ]);

    }
}
