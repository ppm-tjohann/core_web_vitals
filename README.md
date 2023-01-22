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

#### Controller, Models, Migrations, Routing

Diese vier Begriffe bzw. Methoden können als Kern von Laravel angesehen werden.
Mithilfe dieser können so gut wie alle Vorstellungen umgesetzt werden.

##### Model

Das Model definiert die Grundstruktur eine Objekts. Ebenfalls werden hier
Relations definiert, sowie Grund-Funktionen eines Objektes hinterlegt.

##### Controller

Der Controller verknüpft das Model mit den Routes. Innerhalb der einzelnen
Controller-Funktionen können

##### Migration

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

##### Routing

Im Routing wird typischerweise eine Request-URL mit einer Controller-Methode
verbunden. Diese Verknüpfung wird innerhalb der ```routes/api.php``` für alle
Api-Endpunkte festgelegt.

Eine Verknüpfung ist nach folgendem Standard aufgebaut:

```php
Route::get('test-url',[ControllerName::class,'controller-method']);
```

Neben einem Get-Request können hier alle Request-Methoden angelegt werden:
```PUT```,
```POST```,
```DESTROY```. Zusätzlich können mit einem Befehl direkt alle Routes für die
CRUD-Operationen angelegt werden:

````php
   Route::apiRessource('crud-url-prefix',ControllerName::class)
````

Die dadurch erstellten Routes können mit ```php artisan route:list```
überprüft werden:

```
GET|HEAD api/domain   ..... domain.index › DomainController@index
POST  api/domain .....  domain.store › DomainController@store
GET|HEAD  api/domain/{domain} ..... domain.show › DomainController@show
PUT|PATCH api/domain/{domain} ..... domain.update › DomainController@update
DELETE   api/domain/{domain} .....  domain.destroy › DomainController@destroy
`````

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






