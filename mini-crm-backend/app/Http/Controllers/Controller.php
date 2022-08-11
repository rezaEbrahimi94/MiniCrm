<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Sends json response along with status
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendResponse($status,$key,$value): \Illuminate\Http\JsonResponse
    {
        $response = [
            'status'    => $status,
            $key => $value,
        ];
        return response()->json($response);
    }
}
