## Funcionalidades

- Editar Cuenta Administrador: En esta funcionalidad se integraron los escenarios positivos y negativos correspondientes a la edición del perfil de una cuenta de administrador. 

- Creación de Post: En esta funcionalidad se probaron escenarios relacionados con la creación de post y su presencia en la listas de drafts, scheduled y published. 

- Creación de Tags: En esta funcionalidad se probaron escenarios de la creación de tags para post.



## Escenarios de Prueba


| Escenario ID | Funcionalidad | Condiciones Iniciales | Descripción| Steps to Repro |Resultados Esperados|Tipo de Prueba| 
|--------------|---------------|-----------------------|------------|----------------|--------------------|--------------|
| CY01 | Editar Cuenta Administrador | Tener credenciales válidas de una cuenta de administrador |Edición de cuenta con datos válidos| - Visitar la página de SigIn - Ingresar credenciales válidas de login - Dar click al avatar de user - Dar click a Myprofile - Editar los campos con datos válidos - Dar click en el botón save - Validar que los cambios se pudieron guardar| los datos pueden salvarse satisfactoriamente y el botón de save se muestra en color verde cómo muestra de notificación|Positiva|
| CY02 | Editar Cuenta Administrador | Tener credenciales válidas de una cuenta de administrador |Edición de cuenta con nombre en blanco| - Visitar la página de SigIn - Ingresar credenciales válidas de login - Dar click al avatar de user - Dar click a Myprofile - Borrar los datos del campo Nombre - Dar click en el botón save - Validar que los cambios no se pudieron guardar| los datos no pueden salvarse satisfactoriamente y el botón de save se muestra en color rojo cómo muestra de notificación|Negativa|
| CY03 | Editar Cuenta Administrador | Tener credenciales válidas de una cuenta de administrador |Edición de contraseña, nueva contraseña y verificación de contraseña no son iguales| - Visitar la página de SigIn - Ingresar credenciales válidas de login - Dar click al avatar de user - Dar click a Myprofile - Scroll hasta la sección de cambio de contraseña - Ingresar contraseña actual - Ingresar contraseña nueva - Ingresar verificación contraseña nueva diferente al campo anterior| La contraseña no puede guardarse y se obtiene un mensaje de notificación Your new passwords do not match|Negativa|
| CY04 | Editar Cuenta Administrador | Tener credenciales válidas de una cuenta de administrador |Edición de contraseña con datos válidos| - Visitar la página de SigIn - Ingresar credenciales válidas de login - Dar click al avatar de user - Dar click a Myprofile - Scroll hasta la sección de cambio de contraseña - Ingresar contraseña actual - Ingresar contraseña nueva - Ingresar verificación contraseña nueva| La contraseña puede guardarse satisfactoriamente y se obtiene un mensaje de notificación Password updated|Positiva|



