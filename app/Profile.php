<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    public $timestamps = false;
    public $table = "users";

    protected $hidden = [
        'laravel_through_key'
    ];

    protected $fillable = [
        "name", "first_name", "last_name", "avatar_filename"
    ];

    public function scopeProfile()
    {
        return $this->select([
            "id", "name", "first_name", "last_name", "role",
            "avatar_filename", "email"
            ]);
    }
}
