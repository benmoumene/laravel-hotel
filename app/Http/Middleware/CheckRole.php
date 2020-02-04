<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class CheckRole
{
    protected $role_level = array(
        'admin' => 0,
        'supervisor' => 1,
        'billing' => 2,
        'recepcionist' => 2,
    );

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $requiredRole)
    {
        $currentRoleLevel = $this->role_level[Auth::user()->role];
        $requiredRoleLevel = $this->role_level[$requiredRole];

        // Comparacion de role del usuario con el requerido por la
        // el middleware
        if ($currentRoleLevel <= $requiredRoleLevel) {
            return $next($request);
        }
        
        return response()->json("Invalid access.", 401);
    }
}
