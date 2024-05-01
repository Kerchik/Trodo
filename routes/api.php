<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CurrencyController;

Route::get('/currencies', [CurrencyController::class, 'getCurrencies']);