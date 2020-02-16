<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReservationStoreRequest extends FormRequest
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
            'reservation.from_date' => 'required|date|date_format:Y-m-d',
            'reservation.to_date' => 'date|date_format:Y-m-d',
            'reservation.customer.id' => 'required|numeric',
            'reservation.room.id' => 'required|numeric',
        ];
    }
}
