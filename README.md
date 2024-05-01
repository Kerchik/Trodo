To use this project you will need installed PHP, Apache and MySql.

Create .env file from .env.example file. Add API_KEY from [any](https://anyapi.io/)

Backend:
Run Apache, MySql, and create DB named 'trodo'.

-   php artisan migrate
-   php artisan serve

Frontend:

-   npm i
-   npm run build

By default you will have empty 'currencies' table. If you want to fill it with dummy data, you can run

-   php artisan db:seed --class=CurrencySeeder

'currencies' table is being updated daily(with scheduler), but if you want to test it, you can run

-   php artisan currency:update
