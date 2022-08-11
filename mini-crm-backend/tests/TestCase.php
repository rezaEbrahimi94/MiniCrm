<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication,DatabaseMigrations;

    protected $user;
    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed');
        $this->user = User::where('email','admin@admin.com')->first();

    }
}
