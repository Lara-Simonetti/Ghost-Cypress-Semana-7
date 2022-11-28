# Ghost-Cypress-Semana-7 | Generación de datos aleatorios
Entrega de la Semana 7 de MISW4103.

## Integrantes
David Borrero Varona d.borrerov@uniandes.edu.co
<br>
Jeimmy Camacho Medina jx.camacho@uniandes.edu.co
<br>
Lara Simonetti l.simonetti@uniandes.edu.co
<br>
Pedro Higuera p.higuera@uniandes.edu.co

## Funcionalidades

- Editar Cuenta Administrador: En esta funcionalidad se integraron los escenarios positivos y negativos correspondientes a la edición del perfil de una cuenta de administrador. 

- Creación de Post: En esta funcionalidad se probaron escenarios relacionados con la creación de post y su presencia en la listas de drafts, scheduled y published. 

- Creación de Tags: En esta funcionalidad se probaron escenarios de la creación de tags para post.

- Crear member: En esa funcionalidad se crean cuentas para que los usuarios puedan obtener servicios de la página.

- Eliminar member: Se elimina una cuenta creada para un usuario

## Pasos para ejecutar las pruebas
1. Verificar que la versión de Ghost a probar sea 5.19.0.
2. Clonar el repositorio.
3. Pararse en la carpeta local donde se clonó el proyecto
4. Correr el comando `npm install` en la terminal
5. Desplegar ghost localmente y crear manualmente una cuenta de administrador. Las credenciales creadas deben ser colocadas en
los respectivos campos del archivo `cypress.config.js` 
Por ejemplo: 
- usuario: jeimmy@gmail.com
- password: Colombia1234!
6. Cambiar el valor de la variable baseURL con el link de Ghost desplegado localmente. Porfavor siga exactamente el formato usado y reemplace con sus respectivos puertos sin añadir nada más (ejemplo: `http://localhost:2372`). Esta variable se encuentra dentro del file `cypress.config.js`.
7. Regresar a la terminal y correr el comando: `npm run open`
8. Ejecutar los archivos de pruebas, corriento `editAccount.cy` por último. (Este se debe correr de últimas ya que una de las pruebas incluye la validación de cambio de contraseña satisfactoriamente y esto podría afectar las pruebas anteriores que utilizan las mismas credenciales.)
9. Ejecutar el comando node index.js para generación de reporte

## Estrategias de pruebas utilizadas
### Pool de datos a priori
Esta técnica se utiliza en las pruebas de las funcionalidades de creación de posts y tags mediante la librería Faker.js. Antes de iniciar las pruebas, se crean dos data pool: una para los títulos de posts y otra para su contenido. Se utiliza un `Faker.seed` para asegurarse de que el contenido de los data pool sean siempre los mismos. Luego, se utilizan funciones con un for loop para poblar cada data pool.

Las pruebas acceden al contenido de los data pool mediante sus índices (ej.: `titlesDataPool[8]`).

### Pool de datos aleatorio dinámico
Esta técnica se usa en las pruebas de la funcionalidad de editar cuenta administrador mediante la librería Faker.js. Los datos se generan al momento de ejecución de las pruebas (no se crean listas de datos antes de las pruebas para acceder luego).

### Escenario aleatorio
descripción

## Registro de incidencias
[Link al registro de incidencias.](https://github.com/Lara-Simonetti/Ghost-Cypress-Semana-7/issues)

## Lista de escenarios
[Link a la lista de escenarios.](https://uniandes-my.sharepoint.com/:x:/g/personal/d_borrerov_uniandes_edu_co/Eeocc3EtOiBMlEJGcnAO0rkBDI-uuol3ulFY9mQKJh9G6A?e=Csenby)

