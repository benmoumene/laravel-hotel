<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BilledService extends Model
{
    public $timestamps = false;
    protected $table = "billed_services";

    public function service()
    {
        return $this->belongsTo(
            'App\Service'
        );
    }
}
