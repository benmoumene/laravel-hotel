<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuestRequest extends FormRequest
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
            'guest.reservation_id' => 'required|numeric',
            //'guest.check_in' => 'date|date_format:Y-m-d H:i:s',
            //'guest.check_out' => 'date|date_format:Y-m-d H:i:s',
        ];
    }
}
