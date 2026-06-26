<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@nexvolt.com',
            'password' => bcrypt('123456'),
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Cliente',
            'email' => 'cliente@nexvolt.com',
            'password' => bcrypt('123456'),
            'role' => 'client',
        ]);

        Product::create([
            'name' => 'Notebook Aurora X14 Ryzen 7',
            'brand' => 'NexVolt',
            'category' => 'Notebooks',
            'price' => 4599.90,
            'old_price' => 5299.90,
            'stock' => 12,
            'badge' => 'Oferta',
            'icon' => 'pi-desktop',
            'description' => 'Notebook leve para estudos, trabalho e projetos de desenvolvimento, com tela Full HD e SSD NVMe.',
        ]);

        Product::create([
            'name' => 'Smartphone Pulse 5G 256 GB',
            'brand' => 'VoltOne',
            'category' => 'Smartphones',
            'price' => 2199.90,
            'old_price' => 2499.90,
            'stock' => 20,
            'badge' => 'Novo',
            'icon' => 'pi-mobile',
            'description' => 'Smartphone 5G com bateria de longa duração, câmera tripla e armazenamento amplo.',
        ]);

        Product::create([
            'name' => 'Teclado Mecânico Spark RGB',
            'brand' => 'KeyLab',
            'category' => 'Periféricos',
            'price' => 349.90,
            'old_price' => null,
            'stock' => 34,
            'badge' => null,
            'icon' => 'pi-sliders-h',
            'description' => 'Teclado mecânico compacto com iluminação RGB, switches táteis e estrutura reforçada.',
        ]);

        Product::create([
            'name' => 'Headset NovaSound Pro',
            'brand' => 'SoundPeak',
            'category' => 'Áudio',
            'price' => 289.90,
            'old_price' => 329.90,
            'stock' => 18,
            'badge' => 'Top',
            'icon' => 'pi-headphones',
            'description' => 'Headset confortável com microfone removível, isolamento acústico e som imersivo.',
        ]);

        Client::create([
            'name' => 'Ana Souza',
            'email' => 'ana.souza@email.com',
            'phone' => '(11) 98888-1200',
            'document' => '123.456.789-00',
            'city' => 'São Paulo',
            'address' => 'Rua das Flores, 123',
            'status' => 'Ativo',
        ]);

        Client::create([
            'name' => 'Carlos Lima',
            'email' => 'carlos.lima@email.com',
            'phone' => '(21) 97777-3344',
            'document' => '987.654.321-00',
            'city' => 'Rio de Janeiro',
            'address' => 'Av. Atlântica, 500',
            'status' => 'Ativo',
        ]);

        Client::create([
            'name' => 'Bianca Rocha',
            'email' => 'bianca.rocha@email.com',
            'phone' => '(31) 96666-7788',
            'document' => '456.789.123-00',
            'city' => 'Belo Horizonte',
            'address' => 'Rua dos Ipês, 200',
            'status' => 'Inativo',
        ]);
    }
}
