Laravel CRUD for companies and employees
with react client and sanctum api auth

Backend:
1. set up a database and update the .env file
2. cd to the root of the app
3. run composer install
4. run php artisan migrate 
5. run php artisan queue:work 
6. run php artisan db:seed 
    this command will make a user (email: "admin@admin.com" password: "password") to login into the admin panel and also some company and employee records to test.
7. php artisan serve


Frontend: 
1. cd to the application root (client-app)
2. run npm install  
3. run npm start 
