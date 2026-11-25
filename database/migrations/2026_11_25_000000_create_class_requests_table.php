<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /** {@inheritDoc} */
    public function up(): void
    {
        Schema::create('class_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('status')->default('new');
            $table->dateTime('proposed_time')->nullable();
            $table->timestamps();
        });
    }

    /** {@inheritDoc} */
    public function down(): void
    {
        Schema::dropIfExists('class_requests');
    }
};
