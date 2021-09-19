<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Result;

class ResultController extends Controller
{
    public function getAllResults() {
        $results = Result::get()->toJson(JSON_PRETTY_PRINT);
        return response($results, 200);
      }

      public function createResult(Request $request) {
        $result = new Result;
        $result->result = $request->number1 +  $request->number2;
        $result->save();
  
        return response()->json([
          "message" => "Result record created",
          "data" => $result->result,
        ], 201);
      }
}
