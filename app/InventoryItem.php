<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InventoryItem extends Model
{
    public $timestamps = false;
    public $table = 'inventory';

    public $fillable = [
        "name", "description", "quantity", "min_stock"
    ];
}
