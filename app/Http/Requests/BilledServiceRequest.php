<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BilledServiceRequest extends FormRequest
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
            'billed_service.reservation_id' => 'required|numeric',
            'billed_service.service_id' => 'required|numeric',
        ];
    }
}
