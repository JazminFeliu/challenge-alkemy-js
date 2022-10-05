## Challenge-alkemy-js
### ALKEMY - Challenge FullStack JS

## En este challenge he realizado una wallet con el stack PERN, teniendo en cuenta el siguiente objetivo:
![image](https://user-images.githubusercontent.com/71950944/193947414-7ed33cff-1714-47e2-a65e-de6775a9d231.png)

### Para ello, en primer lugar desarrollé una API en Node.JS con Express. (Port 4000)
### Para persistir los datos, utilicé POSTGRES, como base de datos relacional. (Sin db-client configurado)

#### En la DB Transactionsdb realicé dos tablas (users y transactions) Los campos, sus propiedades y las querys con las que generé la base estan en database/db.sql
#### El cliente que consume la API lo levanté con una React-App. (Port 3000)
#### Para darle estilo a los componentes utilicé Material-UI.

## Descripcion: 
El sitio ofrece una landing page donde el usuario puede logearse o registrarse y una vez realizado este paso, podrá ingresar a su dashboard donde podrá realizar abm de sus operaciones. Para ello contará con:
#### * Un form para sumar una operacion de deposito o extraccion (Alta de operacion)
#### * Una lista de sus operaciones 
#### * El balance total del cliente (ingresos - egresos) 
#### * Cada operacion puede borrarse o editarse. (Modificacion y Baja de operacion)
#### * La edicion de operaciones no permite editar el Type de operación.

#### El sitio cuenta con autenticacion de usuario por medio de un token que le permite por una hora tener activa su sesión para utilizar el servicio. 
#### Pasado este tiempo debe loguearse nuevamente.
#### El pass del usuario se persiste encriptado con BCript 
#### El token se genera con JWT.

## Routes:
### API 
### JwAuth: 
#### POST: auth/register : form de registro (name, email, pass)
#### POST: auth/login: form de login (email, pass)
#### GET: auth/is-verify: verifica que el usuario que se está logeando existe en la db.

### Transactions:
#### GET: dashboard/transactions: obtiene todas las transacciones del usuario autenticado.
#### GET:  dashboard/transaction/+id: obtiene una transaccion del usuario consultado.
#### POST: dashboard/transactions : crea una nueva transaccion.
#### PUT: dashboard/transaction/+id: modifica la tranasaccion consultada del usuario atenticado.
#### DELETE: dashboard/transaction/+id: borra la transaccion consultada del usuario autenticado.

## Info addicional:
#### Para los popups de alerta utilicé la libreria de tostify, la version 5.5.0 
#### Para routear los componentes utilicé react-router-dom, la version 5.2.0 
## En este proyecto utilice NPM (en vez de yarn) por lo que: 
### * Para correr la api en el entorno de desarrollo, debes correr 'npm start dev' en la terminal
### * Para correr la base localmente me configure un docker con postgres, por lo que debes asegurarte de tener postgres para correr el servicio.
### * Para correr el cliente de React, debes primero ingresar a la carpeta /client y correr 'npm start dev' desde alli. 

## Lo que dejé para mas adelante:
#### * Armar un docker-compose con los cuatro servicios (react, node, postgres y pgadmin como cliente de psql).
#### * Sumar el opcion de ingresar categorias al servicio.
#### * Paginar la lista de operaciones a 10 por vista.
#### * Mostrar las operaciones segmentadas por tipo (ingresos por un lado y egresos por otro). Hoy se muestran por orden de llegada y/o modificacion. 
#### * Persistir el balance y/ o los subtotales, en el caso de correr paginacion de operaciones.

Maria Jazmin Feliu - Octubre 2022

