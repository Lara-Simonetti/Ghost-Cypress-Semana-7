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
Esta técnica se implementa en el archivo memberSpec.cy.js. En este archivo se hacen pruebas para las funcionalidades de Crear member, eliminar member y listar member. Se basó principalmente en la reutilización de los casos realizados para la entrega #5. Se crearon funciones que representan eventos y se hicieron de tal forma que permitiera la secuencialidad entre ellos. 
Se crea una estructura que indica cuales son las posibilidades de secuencialidad entre eventos. A partir de un número random con distribución uniforme, cuando ocurre un evento se procede a elegir cuál es el siguiente dentro de las opciones posibles y así hasta llegar al caso base, que es que ya no tenga eventos siguientes.
Se agregó otra variable para probar casos intermedios. Esta variable indica cuántos eventos quiero evaluar y también es un número aleatorio de acuerdo al máximo nivel de profundidad posible.
Por último, el algoritmo evalúa bajo dos condiciones: teniendo correo y nombre válidos generados con faker para ejecutar los flujos de member (15 casos) y teniendo correo inválido (15 casos).
Dentro de las ejecuciones, a pesar de que se partió de tests que pasaban, al randomizar la secuencialidad de los eventos, no es tan sencillo asegurar que todos los flujos se mantengan, por lo cual... para poder usar la estrategia, se requiere pensar cuidadosamente de qué manera asegurar la secuencialidad adecuada, lo cual puede llevar bastante tiempo para obtener un resultado de valor.

## Registro de incidencias
[Link al registro de incidencias.](https://github.com/Lara-Simonetti/Ghost-Cypress-Semana-7/issues)

## Lista de escenarios
[Link a la lista de escenarios.](https://uniandes-my.sharepoint.com/:x:/g/personal/d_borrerov_uniandes_edu_co/Eeocc3EtOiBMlEJGcnAO0rkBDI-uuol3ulFY9mQKJh9G6A?e=Csenby)

