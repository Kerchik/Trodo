<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\Currency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Pagination\LengthAwarePaginator;

class CurrencyService
{
    private const URL = 'https://anyapi.io/api/v1/exchange/rates';
    private const BASE_CURRENCY = 'EUR';
    private const TARGETS = ['usd', 'aud', 'gbp'];
    private const CURRENCY_POSTFIX = '_value';
    private const PER_PAGE = 10;

    private function getLatestsCurrencyExchangeData()
    {
        $queryParams = [
            'apiKey' => env('API_KEY'),
            'base' => self::BASE_CURRENCY
        ];

        $response = Http::get(self::URL, $queryParams);

        if ($response->successful()) {
            return $response->json();
        } else {
            return response()->json(['error' => 'Request failed'], 500);
        }
    }

    public function updateCurrencyExchangeData()
    {
        $response = $this->getLatestsCurrencyExchangeData();

        Currency::create([
            'date' => $response['lastUpdate'],
            'aud_value' => $response['rates']['AUD'],
            'gbp_value' => $response['rates']['GBP'],
            'usd_value' => $response['rates']['USD'],
        ]);
    }

    public function getSavedCurrencies(Request $request)
    {
        $validator = $this->validaterequest($request);
        if ($validator->fails()) {
            return response()->json([
                'error' => 'The target currency is required.'
            ], 400);
        }

        $order = $request->input('order');
        $targetCurrency = $request->input('target');
        $columnName = $targetCurrency . self::CURRENCY_POSTFIX;

        $pagination = $this->getCurrecyDataFromDb($columnName, $order);
        
        $this->transformCurrencyData($pagination, $columnName);

        [$lastUpdate, $maxValue, $minValue, $avgValue] = $this->calculateCurrencyStats($columnName);

        return response()->json([
            'lastUpdate' => $lastUpdate,
            'currencies' => $pagination,
            'maxValue' => $maxValue,
            'minValue' => $minValue,
            'avgValue' => $avgValue,
        ]);
    }

    private function transformCurrencyData(LengthAwarePaginator $pagination, string $columnName)
    {
        $pagination->getCollection()->transform(function ($item) use ($columnName) {
            $item->value = $item->$columnName;
            unset($item->$columnName);

            $item->timestamp = $item->date;
            unset($item->date);

            return $item;
        });
    }

    private function calculateCurrencyStats(string $columnName)
    {
        $lastUpdate = Currency::max('date');
        $maxValue = Currency::max($columnName);
        $minValue = Currency::min($columnName);
        $avgValue = Currency::avg($columnName);

        return [$lastUpdate, $maxValue, $minValue, $avgValue];
    }

    private function getCurrecyDataFromDb(string $columnName, string $order)
    {
        return Currency::orderBy('date', $order ?? 'DESC')
            ->paginate(
                $perPage = self::PER_PAGE, 
                $columns = ['id', 'date', $columnName]
            );
    }

    private function validateRequest(Request $request)
        {
            return Validator::make($request->all(), [
                'target' => ['required', 'string', 'in:' . implode(',', self::TARGETS)],
            ]);
        }
}