<?php

namespace App\Http\Requests;

use Faker\Provider\Base;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyRequest extends BaseRequest
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
    public function rules(): array
    {
         return [
             'name'=>'required|max:191',
             'website'=>'nullable|max:191|url',
             'email'=>'nullable|email|max:191',
             'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048|dimensions:min_width=100,min_height=100'
         ];
    }
}
