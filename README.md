# E-Learning – Automatisierte Analyze von Webseiten mithilfe der Google Page-Speed-Insights Api

## Inhaltsverzeichnis

1. Das Projekt / Einleitung
    1. Vorraussetzungen
    2. Tech-Stack

3. Das Laravel-Backend
    1. Grundstruktur des Servers
    2. Installation Laravel
    3. Erste Schritte
        1. Konfiguration
        2. Models, Controller, Migrations und Routing
        3. Json-Response
    4. CRUD-Operationen am Beispiel der Domain
    5. Relations in Laravel
    6. Polymorphische Abhängigkeiten
    7. Automatische Erstellen von Seiten (Observer & Jobs)
    8. Bewertung von Seiten (Cron-Jobs)
4. Einrichtung Front-End

## 1. Das Projekt

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
Programmiersprache PHP sollte vor allem in Bezug auf Objektorientierung bekannt
sein. Die Architektur des MVC-Prinzips ist von Vorteil.

### Tech-Stack

Der Tech-Stack dieses Projektes ist eine eher untypische Kombination. Im Backend
wird Laravel (V9) ein PHP-Framework verwendet. Im Frontend wird NextJs in
Kombination mit Typescript verwendet.

## 2. Das Laravel-Backend

### Grundstruktur des Servers

Der Server besitzt neben dem Standard Laravel Model User drei weitere:

- **Domain**: Das Domain-Model beschreibt die Domain. Diese besitzt folgende
  Eigenschaften:``id``,``name``,``favicon``,``url``,``sitemap``
  ,``sitemapFound``,``timestamps``. Darüberhinaus besitzt diese eine Vielzahl an
  Seiten ( ``Pages``), sowie eine Durchschnitts-Bewertung
  ( ``Rating``).
- **Page**: Eine Page stellt eine Seite dar. Diese ist immer einer Domain
  zugeordnet und besitzt eine Vielzahl an Bewertungen( ``Rating``). Zusätzlich
  besitzt diese eine `url`, sowie den Boolean `error`.
- **Rating**: Das Rating selbst hat folgende Eigenschaften:``performance``,
  ``seo``, ``accessibility``. Dieses steht in einer polymorphischen Many to Many
  Beziehung zu `Pages`, sowie in einer polymorpischen One to One Beziehung
  zu `Domain`

Beim Erstellen einer Domain muss ein Link zur Sitemap übergeben werden.
Basierend auf der Sitemap werden alle Pages erstellt. Über einen Cron-Job werden
die Seiten regelmäßig durch die Google-Page-Speed Api überprüft und die
Ergebnisse gespeichert.

### Installation Laravel

Nachdem ein passender Ordner mithilfe des Terminals ausgewählt wurde, kann
Laravel mit folgendem Befehl installiert werden:

```
composer create-project laravel/laravel [server_name]
```

### Erste Schritte

#### Konfiguration

Zu Beginn werden innerhalb der ```.env ```` einige Anpassungen vorgenommen.

```
GOOGLE_CWV_KEY=[GOOGLE_API_KEY]

DB_CONNECTION=mysql
DB_HOST=[DATENBANK_SERVER]
DB_PORT=3306
DB_DATABASE=[DATENBANK_NAME]
DB_USERNAME=[NUTZER_DATENBANK]
DB_PASSWORD=[NUTZER_PASSWORT_DATENBANK]

QUEUE_CONNECTION=database
```

Zunächst wird der Key für die Google-Page-Speed-Api hinzugefügt. Dieser kann
nach einer Anmeldung [hier](https://www.google.de) erhalten werden.

Im Anschluss wird die Verbindung zur Datenbank integriert. Diese kann über
```php artisan migrate``` getestet werden. Zuletz wird definiert, wie Laravel
Jobs 'abarbeitern' soll. ```database``` legt hierbei fest, dass Jobs asynchron
basierend auf einer Tabelle ausgeführt werden.

Folgende vier Begriffe bzw. Methoden können als Kern von Laravel angesehen
werden. Mithilfe dieser können so gut wie alle Vorstellungen umgesetzt werden.

#### Models, Controller, Migrations und Routing

Das **Model** definiert die Grundstruktur eines Objekts. Ebenfalls werden hier
Relations definiert, sowie Grund-Funktionen eines Objektes hinterlegt.

Der **Controller** verknüpft das Model mit den Routes. Innerhalb der einzelnen
Controller-Funktionen können

Über **Migrationen** werden die einzelnen Tabellen in der Datenbank erstellt.
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
integer, boolean noch viele weitere Attribute zur Verfügung:

- ``id()``: Legt einen Unique-Identifier an
- ``foreingId()``: Definiert eine 'Relation'
- ``timestamps()``: Legt automatisch die Spalten ``updated_at`` und
  ``created_at`` an
- [weitere Methoden](https://laravel.com/docs/9.x/migrations#creating-columns)

Im **Routing** wird typischerweise eine Request-URL mit einer Controller-Methode
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
einem Json-Response geantwortet wird zunächst ein neuer Request erstellt.

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

Dabei wird über den Artisan bereits eine Grund-Struktur erstellt. Die geschütze
variable ```$fillable``` beschreibt dabei alle Eigenschaften des Models, welche
über Nutzer-Requests bearbeitet beziehungsweise beeinflusst werden können.

Nachdem das Model definiert und die Tabelle erstellt wurde, können die Routes
sowie der Controller ergänzt werden. Der Controller wird mit folgendem Befehl
erstellt ```php artisan make:controller DomainController --api```. Die Flag
```--api```das folgende Methoden bereits in den Controller implementiert werden:

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
Record mit der angegebenen id überhaupt existiert. Existiert dieser nicht, wird
automatisch ein 404 Response zurückgegeben.

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

Da das RMB bereits überprüft, ob eine Ressource mit der angegeben id existiert,
kann die ```$domain``` direkt durch einen Response zurückgegeben werden.

##### Custom Requests

Es ist essenziell, Eingaben eines Nutzers zu validieren. Laravel besitzt hierfür
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
diesem Projekt vernachlässigt, weshalb diese Methoden immer den Wert
```true``` zurückgibt.

Über die Methode ````rules()```` können die Validierungs-Regeln definiert
werden. Diese sind in der
Laravel-Dokumentation [hier](https://laravel.com/docs/9.x/validation#available-validation-rules)
nachzulesen.

Sobald eine der Validierungs-Regeln nicht erefolgreich war, wird automaitsch ein
422-Response an den Nutzer zurückgeschickt. Zum Nutzen des neu erstellten
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

#### One To Many Relation am Beispiel Page

Abhängigkeit von Models werden im Model selbst, sowie der Migrations-Datei
definiert. Eine One To Many Abhängigkeit wird dabei in Migration des
'Many'-Models gekennzeichnet. Dies geschieht über
die ```foreignId([modelname]_id)``` Methode. Innerhalb dieser wird das '
One'-Model zugewiesen. Neben der Abhängigkeit besitzt das Page model noch
eine ```url```, sowie den boolean ```error```, welche standardmäßig <code>
0</code>* ist.
> *Laravel verwendet für die Darstellung von Booleans nicht <code>true</code>
> oder <code>false</code> sondern <code>0</code> und <code>1</code>

Das Page- und Domain-Model kann neben der bekannten ````$fillable```` nun mit
Methoden erweitert werden. Diese Methoden helfen dabei, die Abhängigkeiten von
Ressourcen abzufragen:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Page extends Model{
    protected $fillable = ['url', 'domain_id', 'error'];
    protected $touches=['domain'];

    //default order by last update
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('updated_at', 'DESC');
        });
    }


    public function domain(){
        return $this->belongsTo(Domain::class);
    }
}

class Domain extends Model{
    
    protected $fillable = ['name', 'favicon', 'sitemap', 'sitemapFound', 'url'];
    protected $with=['pages'];
    
    public function pages(){
        return $this->hasMany(Pages::class);
    }
}
```

Neben der <code>$fillable</code> Variable bieten Models weitere nützliche
Variablen, die im Laufe des Projektes genutzt werden:

- <code>protected $with</code>: Standardmäßig werden Ressourcen ohne
  Abhängigkeiten zurückgegeben. Alle Abhängigkeiten, die in der
  <code>$with</code> angegeben sind, werden nun mit zurückgegeben.
- <code>protected $touches</code>: Alle abhängigen Ressourcen innerhalb der
  <code>$touches</code> Variable aktualsieren dabei die Spalte
  <code>updated_at</code>. Standardmäßig wird bei einer Veränderung keine
  Ressource 'aktualisiert'.

Über Methoden können die Abhängigkeiten einzelner Models definiert werden. Im
Fall der Domain geschieht dies über die Methode ````pages()````. Umgekehrt wird
im Page Model die Abhängigkeit über die Methode ````domain()```` definiert.

Im Controller können die Abhängigkeiten entweder direkt bei der Abfrage über
die ```with()``` Methode geladen werden. Dabei werden als Parameter die
Methoden-Namen des jeweiligen Models übergeben. Dies werden entweder als String
oder bei mehrerren als String-Array übergeben.

Im Page-Model wird zusätzlich über die ```boot()```-Methode ein neuer Scope
gesetzt. Dieser dient dazu, dass die Ressourcen standardmäßig in nach
````updated_at```` in absteigender Reihenfolge geordnet werden.

### Polymorphische Abhängigkeiten

### Automatische Erstellen von Seiten (Observer & Jobs)

Nachdem eine neue Domain registriert wurde, sollen basierend auf der Sitemap die
entsprechenden Seiten erstellt werden. Hierfür bieten sich Observer, sowie Jobs
an.

#### Observer

Observer dienen in Laravel dazu, auf bestimmte Events zu reagieren. Diese '
beobachten' ein Model und ermöglichen es, eine Funktion nach einem Event
auszuführen. Dazu gehören folgende Events:
-**created**: Eine neue Ressource wurde erstellt -**updated**: Eine bestehende
Ressource wurde akutalisiert -**deleted**: Eine Ressource wurde gelöscht. -**
restored**: Eine gelöschte Ressource wurde wiederhergestellt. -**forceDeleted**:
Eine Ressource wurde permant gelöscht.

Dabei wird den Methoden die jeweilige Ressource übergeben.

Ein Observer kann mit folgendem Befehl erstellt werden:

`php artisan make:observer DomainObserver --model=Domain`
Über die `--model`-Flag kann der Observer direkt einem Model zugewiesen werden.
Innerhalb der `created()`-Methode können also nach dem Erstellen einer neuen
Domain die Seiten erstellt werden. Da diese relativ Zeitaufwändig ist, bieten
sich hierfür Jobs an.

#### Jobs

Jobs ermögolichen es, zeitintensive Aufgaben im Hintergrund auszuführen. Der
Nutzer muss nicht auf die Antwort des Servers warten. Nachdem ausführen eines
Jobs kann der Nutzer dennoch beispielsweise über einen Push-Nachricht oder
E-Mail darüber informiert werden.

Zum Erstellen eines Jobs muss folgender Befehl ausgeführt werden:
`php artisan make:job CreateSitemap`

Die Datei muss wie folgt angepasst werden:

```php
<?php

namespace App\Jobs;

use App\Models\Domain;
use App\Services\DomainService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CreateSitemap implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public Domain $domain;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Domain $domain)
    {
        $this->domain = $domain;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        DomainService::updateOrCreateSitemap($this->domain);
    }
}
```

Innerhalb des DomainService werden nun im Hintergrund alle Seiten erstellt.

Im Entwicklungsprozess kann über den Befehl ``php artisan jobs:work`` die
sogennante 'queue' abgearbeitet werden.

### Bewertung von Seiten