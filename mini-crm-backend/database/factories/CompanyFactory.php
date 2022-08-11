<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $name=$this->faker->company();
        $addressName=rawurlencode( strtolower(preg_replace("#[[:punct:]]#", "", str_replace(' ', '', $name))));
        return [
            'name'=>$name,
           'email'=>$addressName.'@gmail.com',
            'website'=>'http://www.'.$addressName.'.com'
        ];
    }
}
