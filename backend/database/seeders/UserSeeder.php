<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('ThangLong@2024@'),
            'role' => 'admin',
        ]);

        // Tạo tài khoản Cộng Tác Viên
        User::create([
            'name' => 'Collaborator User',
            'email' => 'collab@example.com',
            'password' => Hash::make('ThangLong@2024@'),
            'role' => 'collaborator',
        ]);

        // Tạo 10 tài khoản User thường
        User::factory()->count(10)->create([
            'role' => 'user',
        ]);
    }
}
