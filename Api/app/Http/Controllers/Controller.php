<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Http;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function apiUser($codigo)
    {
        $response = Http::get("http://localhost/api_uni/api.php?action=get_user&codigo=$codigo");

        return $response;
    }

    public function apiUsers(){
        $response = Http::get("http://localhost/api_uni/api.php?action=list_users");
    }

    

}
