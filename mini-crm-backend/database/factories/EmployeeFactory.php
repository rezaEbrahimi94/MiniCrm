<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $first_name=$this->faker->firstName();
        $last_name=$this->faker->lastName();
        $addressName=rawurlencode( strtolower(preg_replace("#[[:punct:]]#", "", str_replace(' ', '', $first_name.$last_name))));
        $companies = Company::pluck('id')->toArray();

        return [
            'first_name'=>$first_name,
            'last_name'=>$last_name,
            'email'=>$this->faker->email(),
            'phone'=>$this->faker->phoneNumber(),
            'company_id'=>$this->faker->randomElement($companies)
        ];
    }
}
