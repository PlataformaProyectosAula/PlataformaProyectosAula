<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        //Creamos los 3 roles en la base de datos
        Role::factory(3)->create();
        //Creamos el usuario administrador
        User::create([
            'user_name' => 'Administrador_01',
            'email' => 'jimmisitho450@gmail.com',
            'code' => 0,
            'email_verified_at' => now(),
            'password' => bcrypt('admin'), //encriptar admin como contraseña
            'role_id' => 1

        ]);

        $controller =  new Controller();
        $response = $controller->apiUsers();

        $api = $response->json();

        foreach($api as $userData){
            $rolId = 0;

            if($userData['tipo'] == 'Estudiante'){
                $rolId = 2;
            }elseif($userData['tipo'] == 'Profesor'){
                $rolId = 3;
            }

            $nombre = $userData['nombre'] . "_" . $userData['id'];
            User::create([
                'user_name' => $nombre,
                'code' => $userData['codigo'],
                'email' => $userData['email'],
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
                'role_id' => $rolId,
            ]);
        }


    }
}
