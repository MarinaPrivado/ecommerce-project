<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ClientController extends Controller
{
    public function index()
    {
        return Client::query()
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->rules());

        return response()->json(Client::create($data), 201);
    }

    public function show(Client $client)
    {
        return $client;
    }

    public function update(Request $request, Client $client)
    {
        $data = $request->validate($this->rules($client->id));
        $client->update($data);

        return $client;
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return response()->noContent();
    }

    private function rules(?int $clientId = null): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'email' => [
                'required',
                'email',
                'max:150',
                Rule::unique('clients', 'email')->ignore($clientId),
            ],
            'phone' => ['nullable', 'string', 'max:30'],
            'document' => ['nullable', 'string', 'max:30'],
            'city' => ['nullable', 'string', 'max:100'],
            'address' => ['nullable', 'string', 'max:255'],
            'status' => ['required', Rule::in(['Ativo', 'Inativo'])],
        ];
    }
}
