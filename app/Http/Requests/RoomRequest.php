<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoomRequest extends FormRequest
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
            'room.name' => 'required|string|max:30',
            'room.type' => 'required|string|max:30',
            'room.size' => 'required|string|max:30',
            'room.floor' => 'required|string|max:30',
        ];
    }
}
