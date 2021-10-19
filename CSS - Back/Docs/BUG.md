# bug ne trouve pas le mailer et la JWT_PASSPHRASE

```bash
student@teleporter:/var/www/html/Apothéose/projet-connected-school-services$ php bin/console d:f:l
Symfony\Component\ErrorHandler\Error\ClassNotFoundError^ {#48
  #message: """
    Attempted to load class "LexikJWTAuthenticationBundle" from namespace "Lexik\Bundle\JWTAuthenticationBundle".\n
    Did you forget a "use" statement for another namespace?
    """
  #code: 0
  #file: "./vendor/symfony/framework-bundle/Kernel/MicroKernelTrait.php"
  #line: 94
  trace: {
    ./vendor/symfony/framework-bundle/Kernel/MicroKernelTrait.php:94 { …}
    ./vendor/symfony/http-kernel/Kernel.php:383 { …}
    ./vendor/symfony/http-kernel/Kernel.php:785 { …}
    ./vendor/symfony/http-kernel/Kernel.php:125 { …}
    ./vendor/symfony/framework-bundle/Console/Application.php:168 { …}
    ./vendor/symfony/framework-bundle/Console/Application.php:74 { …}
    ./vendor/symfony/console/Application.php:167 { …}
    ./vendor/symfony/runtime/Runner/Symfony/ConsoleApplicationRunner.php:56 { …}
    ./vendor/autoload_runtime.php:35 { …}
    ./bin/console:11 {
      › 
      › require_once dirname(__DIR__).'/vendor/autoload_runtime.php';
      › 
      arguments: {
        "/var/www/html/Apothéose/projet-connected-school-services/vendor/autoload_runtime.php"
      }
    }
  }
}
2021-09-21T19:32:00+02:00 [critical] Uncaught Error: Class 'Lexik\Bundle\JWTAuthenticationBundle\LexikJWTAuthenticationBundle' not found

```
## Solution `composer require symfony/swiftmailer-bundle` ET `"JWT_PASSPHRASE" ds env.local`



# bug no reconnait plus la commande php bin/console d:f:l

```bash
php bin/console doctrine:fixtures:load
              
  There are no commands defined in the "doctrine:fixtures" namespace.                                                                                                                              
  Did you mean one of these?                                                                                                                                  
      doctrine                                                                                                                        
      doctrine:cache                                                                                                                     
      doctrine:database                                                                                                              
      doctrine:mapping                                                                                                              
      doctrine:migrations                                                                                                                    
      doctrine:query                                                                                        
      doctrine:schema                                                                           
  You may be looking for a command provided by the "DoctrineFixturesBundle" which is currently not installed. Try running "composer require doctrine/doctrine-fixtures-bundle --d  
  ev".                                                                                              
```
 ### malgré installation du bundel j'ai du rentré a la main `Doctrine\Bundle\FixturesBundle\DoctrineFixturesBundle::class => ['all' => 'true'],` même !!! bug !!! 😫