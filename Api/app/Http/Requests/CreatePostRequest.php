<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "data.attributes.title" => "required|max:20",
            "data.attributes.description" => "required",
            'data.attributes.file' => 'required|file|max:10240', // Max 10MB
            'data.attributes.cover_image' => 'required|file|max:10240', // Max 10MB
        ];
    }
}
