<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'admin', 'description' => 'Quản trị viên']);
        Role::create(['name' => 'customer', 'description' => 'Khách hàng']);
        Role::create(['name' => 'staff', 'description' => 'Nhân viên']);
    }
}
