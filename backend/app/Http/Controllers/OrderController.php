<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    public function index()
    {
        return Order::query()
            ->with('client')
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->rules());

        $data['items'] = json_decode($data['items'], true);

        return response()->json(Order::create($data), 201);
    }

    public function show(Order $order)
    {
        return $order->load('client');
    }

    public function update(Request $request, Order $order)
    {
        $data = $request->validate($this->rules());

        if (isset($data['items'])) {
            $data['items'] = json_decode($data['items'], true);
        }

        $order->update($data);

        return $order;
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return response()->noContent();
    }

    private function rules(): array
    {
        return [
            'client_id' => ['required', 'integer', 'exists:clients,id'],
            'total' => ['required', 'numeric', 'min:0'],
            'status' => ['required', Rule::in(['Pendente', 'Pago', 'Enviado', 'Entregue', 'Cancelado'])],
            'items' => ['required', 'json'],
        ];
    }
}
