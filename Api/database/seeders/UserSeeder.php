<?php

namespace Database\Seeders;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Creamos el usuario administrador
        User::create([
            'user_name' => 'Administrador',
            'email' => 'jimmisitho450@gmail.com',
            'code' => 0,
            'password' => bcrypt('admin'),
            'role_id' => 1,
            'remember_token' => Str::random(10),
        ]);

        //Generate 50 users
        User::factory(50)->create();
    }
}
