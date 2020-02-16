<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BilledService extends Model
{
    public $timestamps = false;
    protected $hidden = [
        'laravel_through_key'
    ];

    protected $fillable = [
        "reservation_id", "service_id"
    ];

    public function service()
    {
        return $this->hasOne(
            'App\Service',
            'id',
            'service_id'
        );
    }
}
