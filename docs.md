## Constants

<dl>
<dt><a href="#AuthContext">AuthContext</a> ⇒ <code>React.Context</code></dt>
<dd><p>Contexto de autenticación, provee información del usuario autenticado y funciones para cerrar sesión en todos los componentes de la aplicación.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#AddPetForm">AddPetForm(isAdmin)</a> ⇒ <code>React.Component</code></dt>
<dd><p>Componente de formulario para rellenar la información de una mascota y agregarla a la base de datos mediante una petición POST a la API.</p>
</dd>
<dt><a href="#AddShelterForm">AddShelterForm()</a> ⇒ <code>React.Component</code></dt>
<dd><p>Componente de formulario para agregar un refugio a la base de datos mediante una petición POST a la API. Exclusivo para administradores.</p>
</dd>
<dt><a href="#DrawerMenu">DrawerMenu(open, setOpen)</a> ⇒ <code>React.Component</code></dt>
<dd><p>Componente de menú lateral para el usuario autenticado.</p>
</dd>
<dt><a href="#DrawerOption">DrawerOption(icon, content, path, action)</a> ⇒ <code>React.Component</code></dt>
<dd><p>Componente de opción de menú para el componente de DrawerMenu</p>
</dd>
<dt><a href="#LoginForm">LoginForm()</a> ⇒ <code>React.Component</code></dt>
<dd><p>Componente de formulario para iniciar sesión en la aplicación con un correo electrónico y una contraseña, mediante una petición a Firebase Authentication.</p>
</dd>
<dt><a href="#MainPage">MainPage()</a> ⇒ <code>React.Component</code></dt>
<dd><p>Página principal de la aplicación que muestra las mascotas disponibles para adopción.</p>
</dd>
<dt><a href="#PetCard">PetCard(id, name, sex, breed, age, image, shelterId)</a> ⇒ <code>React.Component</code></dt>
<dd><p>Componente de tarjeta de mascota que muestra la información básica de una mascota.</p>
</dd>
<dt><a href="#ProfileInfo">ProfileInfo(title, content)</a> ⇒ <code>React.Component</code></dt>
<dd><p>Componente que muestra una sección de información de perfil, con un título y un contenido.</p>
</dd>
<dt><a href="#ProfileInput">ProfileInput(title, content, setContent, type, setError, placeholder, isSelect)</a> ⇒ <code>React.Component</code></dt>
<dd><p>Componente que muestra un input de perfil, con un título y un contenido editable.</p>
</dd>
<dt><a href="#RegisterLink">RegisterLink()</a> ⇒ <code>React.Component</code></dt>
<dd><p>Componente que muestra un enlace para redirigir a la página de registro desde la página de inicio de sesión.</p>
</dd>
<dt><a href="#ShelterCard">ShelterCard(id, name, location, phone, image)</a> ⇒ <code>React.Component</code></dt>
<dd><p>Componente de tarjeta de refugio que muestra la información básica de un refugio.</p>
</dd>
<dt><a href="#SignUpForm">SignUpForm()</a> ⇒ <code>React.Component</code></dt>
<dd><p>Componente de formulario para registrarse en la aplicación mediante una petición POST a la API.</p>
</dd>
<dt><a href="#PrivateRoute">PrivateRoute()</a> ⇒ <code>React.Component</code></dt>
<dd><p>Componente de ruta privada para componentes exclusivos de administradores. Todas las rutas que requieran roles de administrador deben estar protegidas por este componente.</p>
</dd>
<dt><a href="#AddPetPage">AddPetPage()</a> ⇒ <code>React.Component</code></dt>
<dd><p>Página para añadir una mascota a la base de datos.</p>
</dd>
<dt><a href="#AddPetPage">AddPetPage()</a> ⇒ <code>React.Component</code></dt>
<dd><p>Página para añadir un refugio a la base de datos.</p>
</dd>
<dt><a href="#LoginPage">LoginPage()</a> ⇒ <code>React.Component</code></dt>
<dd><p>Página de inicio de sesión de la aplicación.</p>
</dd>
<dt><a href="#PetInfoPage">PetInfoPage()</a> ⇒ <code>React.Component</code></dt>
<dd><p>Página de información de una mascota en específico.</p>
</dd>
<dt><a href="#Profile">Profile()</a> ⇒ <code>React.Component</code></dt>
<dd><p>Página de perfil de usuario que muestra la información del usuario autenticado y permite editarla.</p>
</dd>
<dt><a href="#ShelterInfoPage">ShelterInfoPage()</a> ⇒ <code>React.Component</code></dt>
<dd><p>Página de información de un refugio que muestra la información del refugio y las mascotas que alberga.</p>
</dd>
<dt><a href="#SheltersPage">SheltersPage()</a> ⇒ <code>React.Component</code></dt>
<dd><p>Página de refugios que muestra los refugios disponibles en la base de datos.</p>
</dd>
<dt><a href="#SignUpPage">SignUpPage()</a> ⇒ <code>React.Component</code></dt>
<dd><p>Página de registro de usuario.</p>
</dd>
<dt><a href="#WelcomePage">WelcomePage()</a> ⇒ <code>React.Component</code></dt>
<dd><p>Página de bienvenida de la aplicación.</p>
</dd>
</dl>

<a name="AuthContext"></a>

## AuthContext ⇒ <code>React.Context</code>
Contexto de autenticación, provee información del usuario autenticado y funciones para cerrar sesión en todos los componentes de la aplicación.

**Kind**: global constant  
**Returns**: <code>React.Context</code> - Contexto de autenticación.  
**Context**:   
**State**:   

| Param | Type | Description |
| --- | --- | --- |
| children | <code>Object</code> | Componentes hijos de la aplicación. |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentUser | <code>Object</code> | Información completa del usuario autenticado. |
| isAuthenticated | <code>Boolean</code> | Indica si el usuario está autenticado. |
| accessToken | <code>String</code> | Token de acceso del usuario autenticado. |
| logout | <code>function</code> | Función para cerrar sesión del usuario autenticado. |

**Example**  
```js
// Ejemplo de uso:const { currentUser, isAuthenticated, logout, accessToken } = useAuth();
```
<a name="AddPetForm"></a>

## AddPetForm(isAdmin) ⇒ <code>React.Component</code>
Componente de formulario para rellenar la información de una mascota y agregarla a la base de datos mediante una petición POST a la API.

**Kind**: global function  
**Returns**: <code>React.Component</code> - - Componente de formulario para agregar una mascota.  
**Component**:   
**State**:   
**Form**:   

| Param | Type | Description |
| --- | --- | --- |
| isAdmin | <code>Boolean</code> | Indica si el usuario es administrador o no, para enviar la petición a la ruta de guardado de mascotas en refugios si es administrador, o a la ruta de mascotas general si no lo es. |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isLoading | <code>Boolean</code> | Indica si la petición POST está en curso. |
| selectedGender | <code>String</code> | Sexo seleccionado de la mascota. |
| genderError | <code>Boolean</code> | Indica si no se ha seleccionado el sexo de la mascota. |
| imageUrls | <code>Array</code> | Arreglo con las URL de las imágenes de la mascota a subir. |
| imageError | <code>Boolean</code> | Indica si no se han subido imágenes de la mascota. |
| name | <code>String</code> | Nombre de la mascota. |
| age | <code>Number</code> | Edad de la mascota. |
| sex | <code>String</code> | Sexo  de la mascota. |
| breed | <code>String</code> | Raza de la mascota. |
| description | <code>String</code> | Descripción de la mascota. |
| type | <code>String</code> | Tipo de mascota. |
| photos | <code>Array</code> | Arreglo con las imágenes de la mascota en formato base64. |

**Example**  
```js
// Ejemplo de uso:<AddPetForm isAdmin={true} />
```
<a name="AddShelterForm"></a>

## AddShelterForm() ⇒ <code>React.Component</code>
Componente de formulario para agregar un refugio a la base de datos mediante una petición POST a la API. Exclusivo para administradores.

**Kind**: global function  
**Returns**: <code>React.Component</code> - - Componente de formulario para agregar un refugio.  
**Component**:   
**State**:   
**Form**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isLoading | <code>Boolean</code> | Indica si la petición POST está en curso. |
| imageUrl | <code>String</code> | URL en formato base64 de la imagen del refugio a subir. |
| phoneNumber | <code>String</code> | Número de teléfono del refugio. |
| countryCode | <code>String</code> | Código de país del número de teléfono del refugio. |
| completePhoneNumber | <code>String</code> | Número de teléfono completo del refugio. |
| imageError | <code>Boolean</code> | Indica si no se ha subido la imagen del refugio. |
| phoneError | <code>Boolean</code> | Indica si no se ha ingresado un número de teléfono válido. |
| urlError | <code>Boolean</code> | Indica si no se ha ingresado una URL válida para la página web del refugio. |
| name | <code>String</code> | Nombre del refugio. |
| location | <code>String</code> | Ubicación del refugio. |
| urlPage | <code>String</code> | URL de la página web del refugio. |
| phone | <code>String</code> | Número de teléfono del refugio. |
| countryCode | <code>Number</code> | Código de país del número de teléfono del refugio. |
| photo | <code>String</code> | Imagen del refugio en formato base64. |

**Example**  
```js
// Ejemplo de uso:<AddShelterForm />
```
<a name="DrawerMenu"></a>

## DrawerMenu(open, setOpen) ⇒ <code>React.Component</code>
Componente de menú lateral para el usuario autenticado.

**Kind**: global function  
**Returns**: <code>React.Component</code> - Componente de menú lateral.  
**Requires**: <code>module:DrawerOption</code>  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| open | <code>Boolean</code> | Indica si el menú está abierto o cerrado. |
| setOpen | <code>function</code> | Función para abrir o cerrar el menú. |

**Example**  
```js
// Ejemplo de uso:<DrawerMenu open={true} setOpen={setOpen}/>
```
<a name="DrawerOption"></a>

## DrawerOption(icon, content, path, action) ⇒ <code>React.Component</code>
Componente de opción de menú para el componente de DrawerMenu

**Kind**: global function  
**Returns**: <code>React.Component</code> - Componente de opción de menú  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| icon | <code>IconDefinition</code> | Icono de FontAwesome a mostrar |
| content | <code>String</code> | Contenido de la opción |
| path | <code>String</code> | Ruta a la que redirigir al hacer click |
| action | <code>function</code> | Función a ejecutar al hacer click, solo se ejecuta si el usuario desea cerrar sesión |

**Example**  
```js
// Ejemplo de uso:<DrawerOption icon={faPaw} content="AÑADIR MASCOTA" path="/addpet"/>
```
<a name="LoginForm"></a>

## LoginForm() ⇒ <code>React.Component</code>
Componente de formulario para iniciar sesión en la aplicación con un correo electrónico y una contraseña, mediante una petición a Firebase Authentication.

**Kind**: global function  
**Returns**: <code>React.Component</code> - - Componente de formulario para iniciar sesión.  
**Component**:   
**State**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| email | <code>String</code> | Correo electrónico del usuario. |
| password | <code>String</code> | Contraseña del usuario. |
| error | <code>String</code> | Mensaje de error al iniciar sesión. |
| isLoading | <code>Boolean</code> | Indica si la petición de inicio de sesión está en curso. |

**Example**  
```js
// Ejemplo de uso:<LoginForm />
```
<a name="MainPage"></a>

## MainPage() ⇒ <code>React.Component</code>
Página principal de la aplicación que muestra las mascotas disponibles para adopción.

**Kind**: global function  
**Returns**: <code>React.Component</code> - Página principal de la aplicación.  
**Component**:   
**State**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| searchQuery | <code>String</code> | Búsqueda de mascotas. |
| searchResults | <code>Array</code> | Resultados de la búsqueda de mascotas. |
| selectedType | <code>String</code> | Tipo de mascota seleccionado. |
| selectedSex | <code>String</code> | Sexo de mascota seleccionado. |
| open | <code>Boolean</code> | Indica si el menú lateral está abierto. |

**Example**  
```js
// Ejemplo de uso:<MainPage />
```
<a name="PetCard"></a>

## PetCard(id, name, sex, breed, age, image, shelterId) ⇒ <code>React.Component</code>
Componente de tarjeta de mascota que muestra la información básica de una mascota.

**Kind**: global function  
**Returns**: <code>React.Component</code> - - Componente de tarjeta de mascota  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | ID de la mascota |
| name | <code>String</code> | Nombre de la mascota |
| sex | <code>String</code> | Sexo de la mascota, el valor puede ser "Male" o "Female" |
| breed | <code>String</code> | Raza de la mascota |
| age | <code>Number</code> | Edad de la mascota |
| image | <code>String</code> | Imagen de la mascota |
| shelterId | <code>Number</code> | ID del refugio al que pertenece la mascota |

**Example**  
```js
// Ejemplo de uso de PetCard<PetCard name="Firulais" sex="Male" breed="Pitbull" age={2} image="https://www.example.com/firulais.jpg" />
```
<a name="ProfileInfo"></a>

## ProfileInfo(title, content) ⇒ <code>React.Component</code>
Componente que muestra una sección de información de perfil, con un título y un contenido.

**Kind**: global function  
**Returns**: <code>React.Component</code> - - Componente de información de perfil.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | Título de la sección de información. |
| content | <code>String</code> | Contenido de la sección de información. |

**Example**  
```js
// Ejemplo de uso:<ProfileInfo title="Nombre" content="Juan Pérez" />
```
<a name="ProfileInput"></a>

## ProfileInput(title, content, setContent, type, setError, placeholder, isSelect) ⇒ <code>React.Component</code>
Componente que muestra un input de perfil, con un título y un contenido editable.

**Kind**: global function  
**Returns**: <code>React.Component</code> - - Componente de input de perfil.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | Título del input de perfil. |
| content | <code>String</code> | Contenido del input de perfil. |
| setContent | <code>function</code> | Función para modificar el contenido del input de perfil. |
| type | <code>String</code> | Tipo de input de perfil, puede ser "text" o "phone". |
| setError | <code>function</code> | Función para modificar el estado de error del input de perfil. |
| placeholder | <code>String</code> | Placeholder del input de perfil. |
| isSelect | <code>Boolean</code> | Indica si el input de perfil es un select. |

**Example**  
```js
// Ejemplo de uso:<ProfileInput title="Nombre" content="Juan Pérez" setContent={setContent} type="text" setError={setError} placeholder="Escribe tu nombre..." isSelect={false} />
```
<a name="RegisterLink"></a>

## RegisterLink() ⇒ <code>React.Component</code>
Componente que muestra un enlace para redirigir a la página de registro desde la página de inicio de sesión.

**Kind**: global function  
**Returns**: <code>React.Component</code> - - Componente de enlace de registro.  
**Component**:   
**Example**  
```js
// Ejemplo de uso:<RegisterLink />
```
<a name="ShelterCard"></a>

## ShelterCard(id, name, location, phone, image) ⇒ <code>React.Component</code>
Componente de tarjeta de refugio que muestra la información básica de un refugio.

**Kind**: global function  
**Returns**: <code>React.Component</code> - - Componente de tarjeta de refugio  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | Identificador del refugio |
| name | <code>String</code> | Nombre del refugio |
| location | <code>String</code> | Ubicación del refugio |
| phone | <code>String</code> | Teléfono del refugio |
| image | <code>String</code> | Imagen del refugio |

**Example**  
```js
// Ejemplo de uso de ShelterCard<ShelterCard id={1} name="Refugio de animales" location="Calle 123" phone="+123456789" image="https://www.example.com/refugio.jpg" />
```
<a name="SignUpForm"></a>

## SignUpForm() ⇒ <code>React.Component</code>
Componente de formulario para registrarse en la aplicación mediante una petición POST a la API.

**Kind**: global function  
**Returns**: <code>React.Component</code> - - Componente de formulario de registro.  
**Component**:   
**State**:   
**Form**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| formData | <code>Object</code> | Objeto con los datos del formulario de registro. |
| isLoading | <code>Boolean</code> | Indica si la petición POST está en curso. |
| matchPasswordError | <code>Boolean</code> | Indica si las contraseñas no coinciden. |
| completePhoneNumber | <code>String</code> | Número de teléfono completo del usuario. |
| phoneError | <code>Boolean</code> | Indica si no se ha ingresado un número de teléfono válido. |
| generalError | <code>Boolean</code> | Indica si ha ocurrido un error al enviar el formulario. |
| names | <code>String</code> | Nombres del usuario. |
| paternalSurname | <code>String</code> | Apellido paterno del usuario. |
| maternalSurname | <code>String</code> | Apellido materno del usuario. |
| email | <code>String</code> | Correo electrónico del usuario. |
| city | <code>String</code> | Ciudad de residencia del usuario. |
| password | <code>String</code> | Contraseña del usuario. |
| confirmPassword | <code>String</code> | Confirmación de la contraseña del usuario. |
| countryCode | <code>Number</code> | Código de país del número de teléfono del usuario. |
| phone | <code>String</code> | Número de teléfono del usuario. |
| age | <code>Number</code> | Edad del usuario. |

**Example**  
```js
// Ejemplo de uso:<SignUpForm />
```
<a name="PrivateRoute"></a>

## PrivateRoute() ⇒ <code>React.Component</code>
Componente de ruta privada para componentes exclusivos de administradores. Todas las rutas que requieran roles de administrador deben estar protegidas por este componente.

**Kind**: global function  
**Returns**: <code>React.Component</code> - Componente de ruta privada.  
**Component**:   
**State**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isStarting | <code>Boolean</code> | Indica si la petición GET a la API para obtener los roles de usuario está en curso. |
| roles | <code>Array</code> | Roles de usuario obtenidos de la API. |

**Example**  
```js
// Ejemplo de uso:<PrivateRoute>  <Component /></PrivateRoute>
```
<a name="AddPetPage"></a>

## AddPetPage() ⇒ <code>React.Component</code>
Página para añadir una mascota a la base de datos.

**Kind**: global function  
**Returns**: <code>React.Component</code> - Página de añadir mascota.  
**Requires**: <code>module:AddPetForm</code>  
**Example**  
```js
// Ejemplo de uso:<AddPetPage />
```
<a name="AddPetPage"></a>

## AddPetPage() ⇒ <code>React.Component</code>
Página para añadir un refugio a la base de datos.

**Kind**: global function  
**Returns**: <code>React.Component</code> - Página de añadir refugio.  
**Requires**: <code>module:AddShelterForm</code>  
**Example**  
```js
// Ejemplo de uso:<AddShelterPage />
```
<a name="LoginPage"></a>

## LoginPage() ⇒ <code>React.Component</code>
Página de inicio de sesión de la aplicación.

**Kind**: global function  
**Returns**: <code>React.Component</code> - Página de inicio de sesión.  
**Requires**: <code>module:LoginForm</code>, <code>module:RegisterLink</code>  
**Example**  
```js
// Ejemplo de uso:<LoginPage />
```
<a name="PetInfoPage"></a>

## PetInfoPage() ⇒ <code>React.Component</code>
Página de información de una mascota en específico.

**Kind**: global function  
**Returns**: <code>React.Component</code> - Página de información de una mascota.  
**Component**:   
**State**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| petData | <code>Object</code> | Información de la mascota. |
| canAdopt | <code>Boolean</code> | Indica si el usuario puede adoptar la mascota. |

**Example**  
```js
// Ejemplo de uso:<PetInfoPage />
```
<a name="Profile"></a>

## Profile() ⇒ <code>React.Component</code>
Página de perfil de usuario que muestra la información del usuario autenticado y permite editarla.

**Kind**: global function  
**Returns**: <code>React.Component</code> - Página de perfil de usuario.  
**Requires**: <code>module:ProfileInfo</code>, <code>module:ProfileInput</code>  
**State**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| names | <code>String</code> | Nombres del usuario. |
| isLoading | <code>Boolean</code> | Indica si la petición PATCH a la API está en curso. |
| paternalSurname | <code>String</code> | Apellido paterno del usuario. |
| maternalSurname | <code>String</code> | Apellido materno del usuario. |
| age | <code>String</code> | Edad del usuario. |
| city | <code>String</code> | Ciudad de residencia del usuario. |
| phone | <code>String</code> | Número de teléfono del usuario. |
| editable | <code>Boolean</code> | Indica si el formulario de edición está activo. |
| phoneError | <code>Boolean</code> | Indica si el número de teléfono ingresado es inválido. |
| phoneErrorMessage | <code>String</code> | Mensaje de error para el número de teléfono. |
| nameError | <code>Boolean</code> | Indica si el nombre ingresado es inválido. |
| nameErrorMessage | <code>String</code> | Mensaje de error para el nombre. |
| paternalSurnameError | <code>Boolean</code> | Indica si el apellido paterno ingresado es inválido. |
| paternalSurnameErrorMessage | <code>String</code> | Mensaje de error para el apellido paterno. |
| ageError | <code>Boolean</code> | Indica si la edad ingresada es inválida. |
| ageErrorMessage | <code>String</code> | Mensaje de error para la edad. |
| cityError | <code>Boolean</code> | Indica si la ciudad ingresada es inválida. |
| isStarting | <code>Boolean</code> | Indica si la petición GET a la API está en curso. |

**Example**  
```js
// Ejemplo de uso:<Profile />
```
<a name="ShelterInfoPage"></a>

## ShelterInfoPage() ⇒ <code>React.Component</code>
Página de información de un refugio que muestra la información del refugio y las mascotas que alberga.

**Kind**: global function  
**Returns**: <code>React.Component</code> - Página de información de un refugio.  
**Requires**: <code>module:PetCard</code>  
**State**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| roles | <code>Array</code> | Roles del usuario autenticado. |
| shelter | <code>Object</code> | Información del refugio. |
| pets | <code>Array</code> | Mascotas del refugio. |

**Example**  
```js
// Ejemplo de uso:<ShelterInfoPage />
```
<a name="SheltersPage"></a>

## SheltersPage() ⇒ <code>React.Component</code>
Página de refugios que muestra los refugios disponibles en la base de datos.

**Kind**: global function  
**Returns**: <code>React.Component</code> - Página de refugios.  
**Requires**: <code>module:ShelterCard</code>  
**State**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| shelters | <code>Array</code> | Lista de refugios. |
| roles | <code>Array</code> | Roles del usuario autenticado. |

**Example**  
```js
// Ejemplo de uso:<SheltersPage />
```
<a name="SignUpPage"></a>

## SignUpPage() ⇒ <code>React.Component</code>
Página de registro de usuario.

**Kind**: global function  
**Returns**: <code>React.Component</code> - Página de registro de usuario.  
**Requires**: <code>module:SignUpForm</code>  
**Example**  
```js
// Ejemplo de uso:<SignUpPage />
```
<a name="WelcomePage"></a>

## WelcomePage() ⇒ <code>React.Component</code>
Página de bienvenida de la aplicación.

**Kind**: global function  
**Returns**: <code>React.Component</code> - Página de bienvenida.  
**Example**  
```js
// Ejemplo de uso:<WelcomePage />
```
