<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('email', 150)->unique();
            $table->string('phone', 30)->nullable();
            $table->string('document', 30)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('address', 255)->nullable();
            $table->enum('status', ['Ativo', 'Inativo'])->default('Ativo');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
