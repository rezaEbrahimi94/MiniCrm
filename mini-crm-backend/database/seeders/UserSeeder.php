<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::where('email', '=', 'admin@admin.com')->first();

        if ($admin === null) {
            DB::table('users')->insert([
                'name' => 'admin',
                'email' => 'admin@admin.com',
                'password' => bcrypt('password'),
            ]);
        }

    }
}
