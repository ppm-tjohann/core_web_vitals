# E-Learning – Automatisierte Analyze von Webseiten mithilfe der Google Page-Speed-Insights Api

## Inhaltsverzeichnis

1. Das Projekt / Einleitung
    1. Vorraussetzungen
    2. Tech- Stack

3. Einrichtung Backend
    1. Installation Laravel
    2. Grundlagen Laravel
    3. Basic CRUD-Operationen
    4. Events / Jobs / Listeners
4. Einrichtung Front-End

## Das Projekt

Die Zuverlässigkeit von Webseiten ist einer der wichtigstens Aspekte von
Agenturen oder selbständigen Web-Entwicklern. Ein regelmäßiger Check der
Webseite kann dabei helfen, frühzeitig Bugs oder Fehler zu erkennen und
anzupassen.

Je größer die Anzahl der erstellten Webseiten oder selbst die Anzahl der
Unterseiten einer Webseite, desto mehr Zeit ist für einen solchen Check
notwendig. Mit diesem Projekt soll dieser Prozess optimiert werden können. Im
Rahmen dieses E-Learnings wird eine Anwendung erstellt, die automatisiert
Webseiten in Bezug auf Leistung, Barriere-Freiheit und SEO bewertet.

Dazu kann ein späterer Nutzer über eine Oberfläche gewünschte Webseiten
hinzufügen. Basierend auf der Sitemap einer Webseite werden alle Seiten
analysiert und diese dem Nutzer in einem Dashboard angezeigt.

### Vorraussetzungen

Für das Frontend sollte das Framework React bereits beherrscht werden.
Erfahrungen mit NextJs oder Typescript sind nicht notwendig.

Im Backend sind lediglich Erfahrungen mit MySQL empfehlenswert. Die
Programmiersprache PHP sollte vor allem im Bezug auf Objektorientierung bekannt
sein. Die Architektur der MVC-Prinzips ist von Vorteil.

### Tech-Stack

Der Tech-Stack dieses Projektes ist eine eher untypische Kombination. Im Backend
wird Laravel (V9) ein PHP-Framework verwendet. Im Frontend wird NextJs in
Kombination mit Typescript verwendet.

## 1. Einrichtung Backend

### Installation Laravel

Nachdem ein passender Ordner mithilfe des Terminals ausgewählt wurde, kann
Laravel mit folgendem Befehl installiert werden:

```
composer create-project laravel/laravel [server_name]
```

### Grundaufbau / Ordner-Struktur

### Erste Schritte

Diese vier Begriffe bzw. Methoden können als Kern von Laravel angesehen werden.
Mithilfe dieser können so gut wie alle Vorstellungen umgesetzt werden.

#### Model

Das Model definiert die Grundstruktur eine Objekts. Ebenfalls werden hier
Relations definiert, sowie Grund-Funktionen eines Objektes hinterlegt.

#### Controller

Der Controller verknüpft das Model mit den Routes. Innerhalb der einzelnen
Controller-Funktionen können

#### Migration

Über Migration werden die einzelnen Tabellen in der Datenbank erstellt.
Innerhalb dieser werden die Tabellen nach folgendem Prinzip definiert:

````php
   <?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * diese Funktion wird zum Erstellen der Tabellen ausgeführt. 
     */
    public function up()
    {
        Schema::create('testing', function (Blueprint $table) {
            $table->string('name');
            $table->integer('number')->nullable();
            $table->boolean('error')->default('false');
        });
    }

    /**
     * Diese Funktion macht das Mirgrieren von Tabellen rückgängig
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('domains');
    }
};
````

Innerhalb der ````Schema::create```` function wird
durch ````Blueprint $table```` die Tabelle definiert. Dabei stehen string,
integer, boolean noch viele weitere Attributes zur Verfügung:

- ``id()``: Legt einen Unique-Identifier an
- ``foreingId()``: Definiert eine 'Relation'
- ``timestamps()``: Legt automatisch die Spalten ``updated_at`` und
  ``created_at`` an
- [weitere Methoden](https://laravel.com/docs/9.x/migrations#creating-columns)

#### Routing

Im Routing wird typischerweise eine Request-URL mit einer Controller-Methode
verbunden. Diese Verknüpfung wird innerhalb der ```routes/api.php``` für alle
Api-Endpunkte festgelegt.

Eine Verknüpfung ist nach folgendem Standard aufgebaut:

```php
Route::get('test-url',[ControllerName::class,'controller-method']);
```

Neben einem Get-Request können hier alle Request-Methoden angelegt werden:
```PUT```, ```POST```, ```DESTROY```. Zusätzlich können mit einem Befehl direkt
alle Routes für die CRUD-Operationen angelegt werden:

````php
   Route::apiRessource('crud-url-prefix',ControllerName::class)
````

Die dadurch erstellten Routes können mit ```php artisan route:list```
überprüft werden:

```
GET|HEAD api/domain  ..... domain.index › DomainController@index
POST  api/domain .....  domain.store › DomainController@store
GET|HEAD  api/domain/{domain} ..... domain.show › DomainController@show
PUT|PATCH api/domain/{domain} ..... domain.update › DomainController@update
DELETE   api/domain/{domain} .....  domain.destroy › DomainController@destroy
`````

Die Parameter innerhalb der geschweiften Klammern müssen dabei als ID des
jeweiligen Models übergeben werden. Der Vorteil: Über das sogenannte
**Route-Model-Binding** werden nicht vorhandenen Records direkt abgefangen und
durch einen 404-Error direkt an den Nutzer zurückgegeben.

#### Json-Response

Laravel hat als Framework verschiedenste Einsatzzwecke. Für dieses Projekt wird
Laravel ausschließlich als API genutzt. Damit Laravel auf alle Requests mit
einem Json-Response antwortet wird zunächst ein neuer Request erstellt.

1. Request erstellen
   ```
   php artisan make:Request JsonRequest
   ```
2. Anpassen der Request-Datei in ```app/Http/Requests/JsonRequest.php```

   ```php
    public function expectsJson(): bool
       {
           return true;
       }
   
       public function wantsJson(): bool
       {
           return true;
       }
   ```

3. Registrieren des neuen Requests als Standard in ```public/index.php```
   ```php
   $response = $kernel->handle(
   $request = \App\Http\Requests\JsonRequest::capture()
   )->send();
   ```

### CRUD-Optionen am Beispiel der Domain

Folgend werden am Beispiel des Domain-Models CRUD-Operationen in Laravel
gezeigt. Dabei wird zunächst die Grund-Struktur erstellt und im Anschluss
erweitert.

#### Erstellen der Migration, Controller, Routes und Model

Zunächst wird das Model und die damit verbunden Migration erstellt. Dies
geschieht über den folgenden Befehl:

```php artisan make:model Domain -m```
Über die Flag `````-m````` wird neben dem Model direkt eine Migrations-Datei
erstellt.

Eine Domain hat folgende Eigenschaften:

- ``ìd`` integer als UID
- ``name`` string, einzigartig
- ``favicon`` string als Icon der Website (optional)
- ``url`` string, Standard-Link der Webseite, einzigartig
- ``sitemap`` string, Link zur Sitemap der Webseite, einzigartig
- ``sitemapFound`` boolean, default:true
- ``timestamps`` Laravel-Funktion, erstellt die Spalten updated_at und
  created_at und aktualisiert diese automatisch

Für diese Eigenschaften schaut die dazugehörige Migrations-Datei wie foglt aus:

````php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('domains', function (Blueprint $table) {
            $table->id();

            $table->string('name')->unique();
            $table->string('favicon')->default(null);
            $table->string('sitemap')->unique();
            $table->string('url')->unique();

            $table->boolean('sitemapFound')->default(true);


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('domains');
    }
};

````

Nachdem die Migrations-Datei angepasst wurde, kann die Tabelle durch den
Befehl ````php artisan migrate```` erstellt werden. Aus der Migrations-Datei
lässt sich dann das Model ableiten.

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    protected $fillable = [
    'name', 'favicon', 'sitemap', 'sitemapFound', 'url'
    ];
}

```

Dabei wird über den Artisan bereits ein Grund-Struktur erstellt. Die geschütze
variable ```$fillable``` beschreibt dabei alle Eigenschaften des Models, welche
über Nutzer-Requests bearbeitet beziehungsweise beeinflusst werden können.

Nachdem das Model definiert und die Tabelle erstellt wurde, können die Routes
sowie der Controller ergänzt werden. Der Controller wird mit folgendem Befehl
erstellt ```php artisan make:controller DomainController --api```. Die Flag
```--api```das folgende Methoden Bereits in den Controller implementiert werden:

`````php
<?php

namespace App\Http\Controllers;
use App\Models\Domain;

class DomainController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
    }
}
`````

Diese stellen die typischen CRUD-Operationen eines Api-Endpunktes dar. Die
Methode ````index()```` soll alle Records, ```find()``` ein Record eines Models
zurückgeben.
```store()``` dient zum Erstellen eines neuen Records, sowie ```update()```
zum Aktualisieren. Durch die `````destroy()`````Methode können Records gelöscht
werden.

Innerhalb der ```api.php``` kann der Controller durch den
``Route::apiRessource``-Befehl mit den Endpunkten verknüpft werden.

Im Folgenden werden Techniken beschrieben, die das Daten-Handling vereinfachen
können.

##### Route-Model-Binding

Durch das Route-Model-Binding (**RMB**) überprüft Laravel selbständig, ob ein
Record mit der angegebenen id überhaupt existiert. Sollte dieser nicht
exisiteren wird automatisch ein 404 Response zurückgegeben.

Das RMB bietet sich für alle Methoden an, die eine id als Parameter erwarten.
Dazu zählen die
```update()```, ```destroy()```, ```find()``` Methoden. Das RMB wird durch die
Parameter einer Methode genutzt. Dabei wird anstatt des Parameters
```int $id``` direkt ein Model, bspws ```Domain $domain```, erwartet. Die
Methoden können deshalb wie folgt angepasst werden:

```php
 /**
     * Display the specified resource.
     *
     * @param  Domain  $domain
     * @return \Illuminate\Http\Response
     */
    public function show(Domain $domain)
    {
        return response($domain);
    }
```

Da das RMB bereits überprüft ob eine Ressource mit der angegeben id existiert,
können wir hier direkt die $domain durch einen Response zurückgeben.

##### Custom Requests

Es ist essenziell, Eingaben eines Nutzer zu validieren. Laravel besitzt hierfür
bereits eine integrierte Validierungs-Funktion. Diese Validierung kann durch
Custom-Requests aus dem Controller ausgegliedert werden. Analog zum bereits
erstellten JsonRequest können wir hier beispielsweise einen DomainRequest
über ```php artisan make:Request DomainRequest``` erstellen. Dabei ensteht eine
Datei mit folgender Struktur:

```````php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DomainRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'unique:domains'],
            'favicon' => ['string'],
            'sitemap' => ['required', 'string'],
            'url' => ['required', 'string', 'unique:domains'],
        ];
    }
}

```````

Die Methode ```authorize()``` kann dafür genutzt werden, zu Bestimmen, ob der
Nutzer die nötigen Berechtigungen für den Request hat. Authorization wird in
diesem Projekt vernachlässigt, weshalb diese Methoden im den Wert
```true``` zurückgibt.

Über die Methode ````rules()```` können die Validierungs-Regeln definiert
werden. Diese sind in der
Laravel-Dokumentation [hier](https://laravel.com/docs/9.x/validation#available-validation-rules)
nachzulesen.

Sobald eine der Validierungs-Regeln nicht erefolgreich war, wird automaitsch ein
422-Response an den Nutzer zurück geschickt. Zum Nutzen des neu erstellten
Requests kann dieser als entsprechender Parameter in einer Methode zugewiesen
werden. Wichtig ist, das dies nur innerhalb eines POST-Requests funktioniert.

Am Beispiel der Store und Update Methode schauen diese nun wie folgt aus:

````php
/**
     * Store a newly created resource in storage.
     *
     * @param  DomainRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DomainRequest $request)
    {
       $domain=Domain::create($request->all());
       return response($domain,201);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateDomainRequest  $request
     * @param  Domain  $domain
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDomainRequest $request, Domain $domain)
    {
        $domain->update($request->all());
        return response($domain, 200);
    }

````

Die Daten innerhalb der ```store```-Methode sind bereits validiert, weshalb
diese direkt dazu genutzt werden können, eine neue Ressource zu erstellen.
Nachdem diese erstellt wurde, wird diese mit dem Status-Code 201 an den Nutzer
zurückgegeben.

Der Angepasste Controller schaut nun wie folgt aus:

```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\DomainRequest;
use App\Models\Domain;

class DomainController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $domains = Domain::all();
        return response($domains);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  DomainRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DomainRequest $request)
    {
        $domain = Domain::create($request->all());
        return response($domain, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response($domain);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  DomainRequest  $request
     * @param  Domain  $domain
     * @return \Illuminate\Http\Response
     */
    public function update(DomainRequest $request, Domain $domain)
    {
        $domain->update($request->all());
        return response($domain, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Domain  $domain
     * @return \Illuminate\Http\Response
     */
    public function destroy(Domain $domain)
    {
        $domain->delete();
        return response(['message' => 'Record deleted'], 200);
    }
}

```

### Relations in Laravel

Relations bezeichnen Abhängigkeiten von einzelnen Models untereinander. Dabei
können diese in folgenden Varianten auftretten:

- One to One
- One to Many
- Many to Many

So stehen beispielsweise die Seiten einer Domain beziehungsweise Webseite in
einem One to Many Verhältnis. Eine Seite hat gehört immer zu einer Domain,
hingegen kann eine Domain mehrere Seiten haben.  