<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class BaseRequest extends FormRequest
{
    public function failedValidation(Validator $validator)

    {

        throw new HttpResponseException(response()->json([

            'status'=> 422,
            'validate_err'=> $validator->messages()

        ]));

    }

}
