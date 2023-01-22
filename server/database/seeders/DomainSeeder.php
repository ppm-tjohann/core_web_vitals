<?php

namespace Database\Seeders;

use App\Models\Domain;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DomainSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //WKE,Peine,Ruhrradiologie,Radios,Karriere-WKE
        Domain::create([
            'name' => 'Waldkliniken Eisenberg',
            'favicon' => 'https://www.waldkliniken-eisenberg.de/favicon.ico',
            'sitemap' => 'https://www.waldkliniken-eisenberg.de/sitemap.xml?sitemap=pages&cHash=ebe68cfc3df09d093dd2e6bb5f340ba6',
            'url' => 'https://www.waldkliniken-eisenberg.de/',
        ]);

        Domain::create([
            'name' => 'Radiologie Peine',
            'favicon' => 'https://peine-radiologie.fra1.digitaloceanspaces.com/c1e8431f94b51e1ef50fde1a92d0f79c.png',
            'sitemap' => 'https://www.peine-radiologie.de/sitemap.xml',
            'url' => 'https://www.peine-radiologie.de/',
        ]);

        Domain::create([
            'name' => 'Ruhrradiologie',
            'favicon' => 'https://ruhrradiologie-cms.fra1.digitaloceanspaces.com/ff56b436c55d1cb9f118aa284bbc2d08.png',
            'sitemap' => 'https://www.ruhrradiologie.de/sitemap.xml',
            'url' => 'https://www.ruhrradiologie.de',
        ]);

        Domain::create([
            'name' => 'Radios Praxen',
            'favicon' => 'https://www.radios-praxen.de/typo3conf/ext/radios/Resources/Public/Images/favicons/android-icon-192x192.png',
            'sitemap' => 'https://radios-praxen.de/sitemap-www.xml',
            'url' => 'https://www.radios-praxen.de/',
        ]);

//        Domain::create([
//            'name' => 'Karriere – Waldkliniken Eisenberg',
//            'favicon' => 'https://www.waldkliniken-eisenberg.de/favicon.ico',
//            'sitemap' => 'https://karriere.waldkliniken-eisenberg.de/sitemap.xml',
//            'url' => 'https://karriere.waldkliniken-eisenberg.de/',
//        ]);

    }
}
