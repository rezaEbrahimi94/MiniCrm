<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name'=>'required|max:191',
            'last_name'=>'required|max:191',
            'phone'=>'nullable|numeric|digits:10',
            'email'=>'nullable|email|max:191',
            'company_id'=>'nullable|exists:companies,id',
        ];
    }
}
