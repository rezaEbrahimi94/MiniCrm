<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request): \Illuminate\Http\JsonResponse
    {

        $credentials = $request->only('email', 'password');

        if(Auth::attempt($credentials) )
        {
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            return $this->sendResponse(200,'message',$token);
        }
        else
        {
            return $this->sendResponse(401,'message','Invalid credentials');
        }

    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = auth('sanctum')->user();

        if ($user){
            $user->tokens()->delete();
            return $this->sendResponse(200,'message','loggedout successfully');

        }
        return $this->sendResponse(401,'message','no user ');

    }
}
