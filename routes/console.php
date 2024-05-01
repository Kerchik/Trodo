<?php

use Illuminate\Support\Facades\Schedule;
use App\Services\CurrencyService;

Schedule::command('currency:update')->daily();
