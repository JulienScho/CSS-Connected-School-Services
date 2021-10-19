<?php

namespace App\Tests\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class HomeTest extends WebTestCase
{
    /**
     * Test de la page d'accueil backoffice en monde connecté (Admin)
     *
     * @return void
     */
    public function testSomething(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);

        $testUser = $userRepository->findOneByEmail('admin@css.io');

        $client->loginUser($testUser);

        $crawler = $client->request('GET', '/');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h2', 'Panneau d\'administration');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    /**
     * Test de l'acces au backoffice en monde non connecté (public)
     *
     * @return void
     */
    /*public function testSomethingBackoffice(): void
    //{
        // On va se mettre dans la peau d'un navigateur
        // Et tenter d'accéder à la page d'accueil backoffice ("/")
        $client = static::createClient();
        $crawler = $client->request('GET', '/');
        
        // On vérifie la redirection et la reponse serveur : 
        $this->assertEquals(403, $client->getResponse()->getStatusCode());

        //$this->assertResponseRedirects('/login');
                
    }*/
}
