<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Cada factura generada contiene el total de los servicios contratados por el
// usuario durante su estancia asi como el estado del pago de la factura y
// el metodo de pago escogido.
class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('guest_id');
            $table->decimal('total');
            $table->enum('status', ['pending', 'paid'])->default('pending');
            $table->enum('payment_method', ['', 'cash', 'credit_card'])->default('');
            $table->timestamp('generated_on');
            $table->foreign('guest_id')->references('id')->on('guests')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoices');
    }
}
