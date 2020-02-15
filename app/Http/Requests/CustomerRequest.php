<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
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
            'customer.first_name' => 'required|string|max:30',
            'customer.last_name' => 'required|string|max:30',
            'customer.document_id_type' => 'required|string|max:30',
            'customer.document_id' => 'required|string|max:30',
            'customer.address' => 'required|string|max:30',
            'customer.phone' => 'required|string|max:30',
            'customer.sex' => 'required|string|max:30',
            'customer.nationality' => 'required|string|max:30',
        ];
    }
}
