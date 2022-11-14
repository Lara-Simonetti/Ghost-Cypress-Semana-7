# MISW4103-Semana5-Equipo6 | Pruebas en Cypress
Entrega de la Semana 5: Pruebas E2E

## Integrantes
David Borrero Varona d.borrerov@uniandes.edu.co
Jeimmy Camacho Medina jx.camacho@uniandes.edu.co
Lara Simonetti l.simonetti@uniandes.edu.co
Pedro Higuera p.higuera@uniandes.edu.co

## Funcionalidades

- Editar Cuenta Administrador: En esta funcionalidad se integraron los escenarios positivos y negativos correspondientes a la edición del perfil de una cuenta de administrador. 

- Creación de Post: En esta funcionalidad se probaron escenarios relacionados con la creación de post y su presencia en la listas de drafts, scheduled y published. 

- Creación de Tags: En esta funcionalidad se probaron escenarios de la creación de tags para post.

- Crear member: En esa funcionalidad se crean cuentas para que los usuarios puedan obtener servicios de la página.

- Eliminar member: Se elimina una cuenta creada para un usuario


## Pasos para ejecutar las pruebas
### Instrucciones para ejecutar los Cypress files: editAccount.cy, createPost.cy y createTag.cy
1. Clonar el repositorio 
2. Pararse en la carpeta local donde se clonó el proyecto
3. Correr el comando npm install en la terminal
5. Desplegar ghost localmente y crear manualmente una cuenta de administrador. Las credenciales creadas deben ser colocadas en
los respectivos campos del archivo cypress.config.js 
Por ejemplo: 
- usuario: jeimmy@gmail.com
- password: Colombia1234!
6. Cambiar el valor de la variable baseURL con el link de Ghost desplegado localmente. Porfavor siga exactamente el formato usado y reemplace con sus respectivos puertos sin añadir nada más Ejemplo: http://localhost:2372 . Esta variable se encuentra dentro del file cypress.config.js
7. Regresar a la terminal y correr el comando: npm run open
8. Ejecutar los archivos de pruebas en el siguiente orden: 
- createTag.cy
- createPost.cy
- memberSpec.cy
- editAccount.cy (Este se debe correr de últimas ya que una de las pruebas incluye la validación de cambio de contraseña satisfactoriamente y esto podría afectar las pruebas anteriores que utilizan las mismas credenciales. Es decir ejecutar test escenarios CY01, CY02, CY03 y CY04 de últimas)



## Escenarios de Prueba


| Escenario ID | Funcionalidad | Condiciones Iniciales | Descripción| Steps to Repro |Resultados Esperados|Tipo de Prueba| 
|--------------|---------------|-----------------------|------------|----------------|--------------------|--------------|
| CY01 | Editar Cuenta Administrador | Tener credenciales válidas de una cuenta de administrador |Edición de cuenta con datos válidos| - Visitar la página de SigIn - Ingresar credenciales válidas de login - Dar click al avatar de user - Dar click a Myprofile - Editar los campos con datos válidos - Dar click en el botón save - Validar que los cambios se pudieron guardar| los datos pueden salvarse satisfactoriamente y el botón de save se muestra en color verde cómo muestra de notificación|Positiva|
| CY02 | Editar Cuenta Administrador | Tener credenciales válidas de una cuenta de administrador |Edición de cuenta con nombre en blanco| - Visitar la página de SigIn - Ingresar credenciales válidas de login - Dar click al avatar de user - Dar click a Myprofile - Borrar los datos del campo Nombre - Dar click en el botón save - Validar que los cambios no se pudieron guardar| los datos no pueden salvarse satisfactoriamente y el botón de save se muestra en color rojo cómo muestra de notificación|Negativa|
| CY03 | Editar Cuenta Administrador | Tener credenciales válidas de una cuenta de administrador |Edición de contraseña, nueva contraseña y verificación de contraseña no son iguales| - Visitar la página de SigIn - Ingresar credenciales válidas de login - Dar click al avatar de user - Dar click a Myprofile - Scroll hasta la sección de cambio de contraseña - Ingresar contraseña actual - Ingresar contraseña nueva - Ingresar verificación contraseña nueva diferente al campo anterior| La contraseña no puede guardarse y se obtiene un mensaje de notificación Your new passwords do not match|Negativa|
| CY04 | Editar Cuenta Administrador | Tener credenciales válidas de una cuenta de administrador |Edición de contraseña con datos válidos| - Visitar la página de SigIn - Ingresar credenciales válidas de login - Dar click al avatar de user - Dar click a Myprofile - Scroll hasta la sección de cambio de contraseña - Ingresar contraseña actual - Ingresar contraseña nueva - Ingresar verificación contraseña nueva| La contraseña puede guardarse satisfactoriamente y se obtiene un mensaje de notificación Password updated|Positiva|
| CY05 | Creación de Post | Tener credenciales válidas de una cuenta de administrador | Creación de post sin publicar| - Visitar la página de SigIn - Ingresar credenciales válidas de login - Dar click en el botón + del botón Post - Ingresar el título del nuevo post en el Post title - Dar click en el subnav Posts - Dar click en el botón Drafts  - Validar que se encuentra en la lista de drafts - Validar que el nombre del post aparece en la lista de drafts| El post no debe publicarse y debe aparecer en la lista de drafts|Positiva|
| CY06 | Creación de Post | Tener credenciales válidas de una cuenta de administrador | Creación de post inmediatamente| - Visitar la página de SigIn - Ingresar credenciales válidas de login - Dar click en el botón + del botón Post - Ingresar el título del nuevo post en el Post title - Diligenciar el campo de Begin writing your post -Dar click en publish - validar que sale el mensaje: Ready, set, publish - Dar click en el botón Continue, Final review - Dar click en el botón Publish post right now - visitar la página del post creado con la url del nombre del post creado|El post debe ser publicado satisfactoriamente en la página web y se debe mostrar un mensaje de confirmación Boom. It’s out there.|Positiva|
| CY07 | Creación de Post | Tener credenciales válidas de una cuenta de administrador | Creación de post inmediatamente y validación en lista published| - Visitar la página de SigIn - Ingresar credenciales válidas de login - Dar click en el botón + del botón Post - Ingresar el título del nuevo post en el Post title - Diligenciar el campo de Begin writing your post -Dar click en publish - validar que sale el mensaje: Ready, set, publish - Dar click en el botón Continue, Final review - Dar click en el botón Publish post right now - Dar click al subnav Editor - Dar click al subnav Posts - Dar click al botón Published - Validar que esta en la lista published - Validar que el titulo del post creado aparece en la lista|El post debe ser publicado satisfactoriamente se debe mostrar el mensaje de confirmación Boom. It’s out there. y el post debe aparecer en la lista de Published |Positiva|
| CY08 | Creación de Post | Tener credenciales válidas de una cuenta de administrador | Creación de post Scheduled y validación en lista secheduled| - Visitar la página de SigIn - Ingresar credenciales válidas de login - Dar click en el botón + del botón Post - Ingresar el título del nuevo post en el Post title - Diligenciar el campo de Begin writing your post -Dar click en publish - Dar click en el dropdown Rightnow - Dar click en el botón Scheduled for later - Dar click en el botón continue final review - Dar click en Publish Post -Dar click en Editor subnav - Dar click en Posts subnav -Dar click en el botón Scheduled - Validar que esta en la lista Scheduled - Validar que el post creado aparece en la lista |El post debe ser creado satisfactoriamente y debe ser listado en Shceduled |Positiva|
| CY09 | Creación de tag | Tener credenciales válidas de una cuenta de administrador | Creación de un tag y validación en lista| - Visitar la página de SigIn - Ingresar credenciales válidas de login - Dar click en el botón Tags - Dar click en el botón new tag - Ingresar un nombre válido - Ingresar slug - Ingresar Descripción - Dar click en el botón save - Dar click en el subnav Tags - Validar que el tag aparece en la lista de Tags|El tag debe crearse satisfactoriamente y debe aparecer en la lista de Tags|Positiva|
| CY10 | Creación de tag | Tener credenciales válidas de una cuenta de administrador | Creación de un tag con nombre en blanco| - Visitar la página de SigIn - Ingresar credenciales válidas de login - Dar click en el botón Tags - Dar click en el botón new tag - Borrar el nombre del tag - Dar click en el botón save - Validar mensaje You must specify a name for the tag|El tag no debe crearse satisfactoriamente y debe aparecer el mensaje de error You must specify a name for the tag| Negativa|
| CY11 | Crear member | Ninguna | Comprobar que no se pueda ingresar como suscriptor sin cuenta creada| - Visitar la página de Ghost - Dar click en el botón Subscribe - Dar click en el botón Sign in - Ingresar correo electrónico - Validar que no se obtenga el mensaje Now check your email! |El usuario no puede ingresar sin una cuenta de member creada| Negativa|
| CY12 | Crear member | Tener credenciales válidas de una cuenta de administrador | Comprobar que se pueda ingresar como suscriptor con una cuenta creada| - Visitar la página de admin - Iniciar sesión - Dar click en el menú Members - Dar click en el botón New member - Ingresar correo electrónico - Ingresar nombre - Dar click en el botón Save - Visitar la página de Ghost - Dar click en el botón Subscribe - Dar click en el botón Sign in - Ingresar correo electrónico - Validar que no se obtenga el mensaje No member exists with this e-mail address. Please sign up first. |El usuario puede ingresar con una cuenta de member creada por el admin| Positiva|
| CY13 | Crear member | Tener credenciales válidas de una cuenta de administrador | Comprobar que no se pueda crear un member con un email con el cual ya se ha creado otra cuenta| - Visitar la página de admin - Iniciar sesión - Dar click en el menú Members - Dar click en el botón New member - Ingresar correo electrónico - Ingresar nombre - Dar click en el botón Save - Validar que se obtenga el mensaje Member already exists. Attempting to add member with existing email address |El admin no puede crear una cuenta de member con un correo ya usado| Negativa|
| CY14 | Crear member | Tener credenciales válidas de una cuenta de administrador | Comprobar que no se pueda crear un member con un email con formanto inadecuado| - Visitar la página de admin - Iniciar sesión - Dar click en el menú Members - Dar click en el botón New member - Ingresar un texto sin formato de correo en el campo de correo electrónico - Ingresar nombre - Dar click en el botón Save - Validar que se obtenga el mensaje Invalid Email. |El admin no puede crear una cuenta de member con un correo sin el formato adecuado| Negativa|
| CY15 | Crear member | Tener credenciales válidas de una cuenta de administrador | Comprobar que se pueda ingresar como suscriptor con una cuenta creada por el admin, comprobando el funcionamiento de la opción Retry al crear el member| - Visitar la página de admin - Iniciar sesión - Dar click en el menú Members - Dar click en el botón New member - Ingresar un texto sin formato de correo en el campo de correo electrónico - Ingresar nombre - Dar click en el botón Save - Comprobar que se habilite el botón Retry - Corregir el correo - Dar click en el botón Retry - Visitar la página de Ghost - Dar click en el botón Subscribe - Dar click en el botón Sign in - Ingresar correo electrónico - Validar que no se obtenga el mensaje No member exists with this e-mail address. Please sign up first. |El usuario puede ingresar con una cuenta de member creada por el admin| Positiva|
| CY16 | Eliminar member | Tener credenciales válidas de una cuenta de administrador | Eliminar une cuenta de member| - Visitar la página de admin - Iniciar sesión - Dar click en el menú Members - Elegir un member ya creado - Dar click al botón con icono de configuración - Dar click en Delete member - Dar click en el botón Delete member - Comprobar que se vea un modal preguntando si se quiere abandonar la página |Se debe haber eliminado la cuenta de member| Positiva|
| CY17 | Eliminar member | Tener credenciales válidas de una cuenta de administrador | Cancelar la eliminación de une cuenta de member| - Visitar la página de admin - Iniciar sesión - Dar click en el menú Members - Elegir un member ya creado - Dar click al botón con icono de configuración - Dar click en Delete member - Dar click en el botón Cancelar - Comprobar que se vea la página de la información del member| Negativa|
| CY18 | Eliminar member | Tener credenciales válidas de una cuenta de administrador | Eliminar una cuenta de member abandonando la página| - Visitar la página de admin - Iniciar sesión - Dar click en el menú Members - Elegir un member ya creado - Dar click al botón con icono de configuración - Dar click en Delete member - Dar click en el botón Delete member - Comprobar que se vea un modal preguntando si se quiere abandonar la página - Dar click en Leave |Se debe haber eliminado la cuenta de member e ir al listado de Member| Positiva|
| CY19 | Eliminar member | Tener credenciales válidas de una cuenta de administrador | Eliminar una cuenta de member sin abandonar la página| - Visitar la página de admin - Iniciar sesión - Dar click en el menú Members - Elegir un member ya creado - Dar click al botón con icono de configuración - Dar click en Delete member - Dar click en el botón Delete member - Comprobar que se vea un modal preguntando si se quiere abandonar la página - Dar click en Stay |Se debe haber eliminado la cuenta de member y permanecer viendo la información del member eliminado| Positiva|
| CY20 | Crear member | Tener credenciales válidas de una cuenta de administrador | Crear un member y que aparezca en la lista de members| - Visitar la página de admin - Iniciar sesión - Dar click en el menú Members - Dar click en el botón New member - Ingresar correo electrónico - Ingresar nombre - Dar click en el botón Save - Volver al listado de members - Comprobar que el nuevo member esté listado|El member debe verse reflejado en el listado de members| Positiva|


### Formato Gherkin: 
CY01: 
GIVEN Un usuario ha iniciado sesión en la cuenta de Administrador<br>
WHEN el usuario edita el perfil <br>
and los datos editados son válidos <br>
THEN los datos del usuario son guardados satisfactoriamente <br>
and el botón de save se muestra en color verde <br>

CY02: 
GIVEN Un usuario ha iniciado sesión en la cuenta de Administrador
WHEN el usuario edita el perfil 
and deja el nombre en blanco
THEN los datos del usuario no son guardados satisfactoriamente
and el botón de save se muestra en color rojo

CY03: 
GIVEN Un usuario ha iniciado sesión en la cuenta de Administrador
WHEN el usuario edita la contraseña
and el usuario ingresa la contraseña vieja
and el usuario ingresa la contraseña nueva
and el usuario ingresa la confirmación de la contraseña nueva diferente a contraseña nueva
THEN la contraseña no se puede guardar satisfactoriamentee
and se obtiene un mensaje de error Your new passwords do not match

CY04: 
GIVEN Un usuario ha iniciado sesión en la cuenta de Administrador
WHEN el usuario edita la contraseña
and el usuario ingresa la contraseña vieja
and el usuario ingresa la contraseña nueva
and el usuario ingresa la confirmación de la contraseña nueva igual a contraseña nueva
THEN la contraseña se puede guardar satisfactoriamentee
and se obtiene un mensaje de validación Password updated

CY05: 
GIVEN Un usuario ha iniciado sesión en la cuenta de Administrador
WHEN da click en crear un nuevo post
and el usuario solo ingresa el título del post
and el usuario no completa el proceso dando click al botón de Drafts
THEN el post debe aparecer en la lista de drafts 

CY06: 
GIVEN Un usuario ha iniciado sesión en la cuenta de Administrador
WHEN da click en crear un nuevo post
and el usuario diligencia todos los campos mandatorios del post
and el usuario da click en publish
and el usuario da click Continue, Final review
and el usuario da click en Publish post right now
and el usuario da click sobre el recuadro del post creado
THEN el post debe ser publicado inmediatamente en el sitio web
and debe aparecer un mensaje de confirmación Boom. It’s out there

CY07: 
GIVEN Un usuario ha iniciado sesión en la cuenta de Administrador
WHEN da click en crear un nuevo post
and el usuario diligencia todos los campos mandatorios del post
and el usuario da click en publish
and el usuario da click Continue, Final review
and el usuario da click en Publish post right now
and el usuario da click Editor
and el usuario da click Posts
and el usuario da click Published 
THEN el post debe aparecer en la lista de Published



CY08: 
GIVEN Un usuario ha iniciado sesión en la cuenta de Administrador
WHEN da click en crear un nuevo post
and el usuario diligencia todos los campos mandatorios del post
and el usuario da click en publish
and el usuario da click en el dropdown Rightnow
and el usuario da click en el botón Scheduled for later
and el usuario da click Continue, Final review
and el usuario da click en Publish post 
and el usuario da click en Editor subnav 
and el usuario da click en Posts subnav 
and el usuario da click en el botón Scheduled
THEN El post debe ser creado satisfactoriamente
and debe ser listado en Shceduled 

CY09: 
GIVEN Un usuario ha iniciado sesión en la cuenta de Administrador
WHEN el usuario da click en el botón Tags
and el usuario da click en el botón new tag
and el usuario ingresa un nombre válido
and el usuario ingresa un slug 
and el usuario ingresa una descripción 
and el usuario da click en el botón save
and el usuario da click en el subnav Tags
THEN El tag debe crearse satisfactoriamente
and el tag aparece en la lista de tags


CY10: 
GIVEN Un usuario ha iniciado sesión en la cuenta de Administrador
WHEN el usuario da click en el botón Tags
and el usuario da click en el botón new tag
and el usuario ingresa un nombre en blanco 
and el usuario da click en el botón save
THEN El tag no debe crearse satisfactoriamente
and aparece el mensaje de error You must specify a name for the tag


