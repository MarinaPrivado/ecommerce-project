<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::query()
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->rules());

        return response()->json(Product::create($data), 201);
    }

    public function show(Product $product)
    {
        return $product;
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate($this->rules());
        $product->update($data);

        return $product;
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->noContent();
    }

    private function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'brand' => ['required', 'string', 'max:80'],
            'category' => ['required', 'string', 'max:80'],
            'price' => ['required', 'numeric', 'min:0'],
            'old_price' => ['nullable', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'badge' => ['nullable', 'string', 'max:40'],
            'icon' => ['nullable', 'string', 'max:80'],
            'description' => ['nullable', 'string'],
        ];
    }
}
