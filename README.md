# MISW4103-Semana5-Equipo6 | Pruebas en Cypress
Entrega de la Semana 5: Pruebas E2E

## Funcionalidades

- Editar Cuenta Administrador: En esta funcionalidad se integraron los escenarios positivos y negativos correspondientes a la edición del perfil de una cuenta de administrador. 

- Creación de Post: En esta funcionalidad se probaron escenarios relacionados con la creación de post y su presencia en la listas de drafts, scheduled y published. 

- Creación de Tags: En esta funcionalidad se probaron escenarios de la creación de tags para post.

## Pasos para ejecutar las pruebas
### Cypress files: editAccount.cy, createPost.cy y createTag.cy
1. Desplegar ghost localmente y crear manualmente una cuenta de administrador con las siguientes crendenciales: 
- Usuario: jeimmy@gmail.com
- password: Colombia1234!
2. 


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



