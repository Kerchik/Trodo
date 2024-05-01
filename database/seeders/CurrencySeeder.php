<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CurrencySeeder extends Seeder
{
    private const START_DATE = '07.04.2024';
    private const END_DATE = '26.04.2024';
    private const TOTAL_STEPS = 19;
    private const RAND_DENOMINATOR = 1000;

    private function randomInRange($min, $max): float
    {
        return $min + ((rand(0, self::RAND_DENOMINATOR) / self::RAND_DENOMINATOR) * ($max - $min));
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $startDate = Carbon::createFromFormat('d.m.Y', self::START_DATE)->timestamp;
        $endDate = Carbon::createFromFormat('d.m.Y', self::END_DATE)->timestamp;

        $step = ($endDate - $startDate) / self::TOTAL_STEPS;

        for ($i = 0; $i <= self::TOTAL_STEPS; $i++) {
            $timestamp = $startDate + ($i * $step);

            DB::table('currencies')->insert([
                'usd_value' => $this->randomInRange(1.000, 1.1000),
                'gbp_value' => $this->randomInRange(0.8000, 0.9000),
                'aud_value' => $this->randomInRange(1.6000, 1.7000),
                'date' => $timestamp,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
