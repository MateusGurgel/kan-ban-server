/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/users/', 'UsersController.store')
Route.post('/login/', 'UsersController.login')

Route.post('/users/:user/kanban/', 'KanbansController.store').middleware('auth')
Route.get('/users/:user/kanbans/', 'KanbansController.show').middleware('auth')

Route.get('/users/:user/kanbans/:kanban/tasks/', 'TasksController.show').middleware('auth')
Route.post('/users/:user/kanbans/:kanban/task/', 'TasksController.store').middleware('auth')
