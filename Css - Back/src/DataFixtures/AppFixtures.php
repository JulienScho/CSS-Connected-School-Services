<?php

namespace App\DataFixtures;

use App\Entity\Announce;
use App\Entity\Category;
use App\Entity\Classroom;
use App\Entity\Discipline;
use App\Entity\Lesson;
use App\Entity\Note;
use App\Entity\Teacher;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $passwordHasher;
    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('fr_FR');
           // on crée 15 élèves avec email,noms, prénoms, adresse, numero de tel et image "aléatoires" en français
           //we create 15 students with email, names, first names, address, phone number and "random" image in French
            $userList = Array();
            print 'creation des élèves ';
            for ($i = 0; $i < 32; $i++) {
                $user = new User();
                $password = 'azertyu';
                $user->setEmail($faker->email());
                $user->setLastname($faker->lastName());
                $user->setFirstname($faker->firstName());
        //     //    $user[$i]->setRoles($faker->randomDigit);
                $user->setAdress($faker->address());
                $user->setPhone($faker->phoneNumber());
                $user->setImage($faker->image());
        //     //    $user->setCreatedAt($faker->dateTime($max = 'now', $timezone = null));
                $user->setPassword(
                 $this->passwordHasher->hashPassword(
                     $user,
                     $password,
                 )); 
                $userList[] = $user;
                $manager->persist($user);
            }
            print '- GG BG -';
           

           // on crée 4 teachers avec email, noms, prénoms et une image "aléatoires" en français
             // we create 4 teachers with email, names, first names and a "random" image in French 
             $teacherList = Array();
             print 'creation des profs ';
             for ($i = 0; $i < 22; $i++) {
                 $teacher = new Teacher();
                 $password = 'azertyu';
                 $teacher->setEmail($faker->email());
                 $teacher->setLastname($faker->lastName());
                 $teacher->setFirstname($faker->firstName());
                //  $teacher[$i]->setRoles($faker->randomDigit);
                 $teacher->setImage($faker->image());
                //  $teacher->setCreatedAt($faker->dateTime($max = 'now', $timezone = null));
                 $teacher->setPassword(
                  $this->passwordHasher->hashPassword(
                      $teacher,
                      $password,
                  )); 
                 $teacherList[] = $teacher;
                 $manager->persist($teacher);
             }
             print '- GG GB -';

           // on crée 4 salles de classes
           // we create 4 classrooms 
    //        $class = Array();
    //        print 'creation des salles de classes ';
    //        for ($i = 0; $i < 4; $i++) {
    //            $class[$i] = new Classroom();
    //            $class[$i]->setLetter($faker->randomElement($array =array('a', 'b', 'c', 'd')));
    //            $class[$i]->setGrade($faker->numberBetween($min = 3, $max = 6));
    //            $class[$i]->setCompleted($faker->);
    //            $classes[$i]->setCreatedAt($faker->date($format = Y-m-d, $Max = 'now'));
    //            $manager->persist($class[$i]);
    //        }
           
           

           
        
        
    //     $disciplineList = [
    //         'Francais',
    //         'Math',
    //         'SVT',
    //         'EPS',
    //         'Histoire-Géo',           
    //     ];
    //     we create five disciplines
    //     $disciplineObjectList = [];
    //     print 'Création des disciplines  ';
    //     foreach ($disciplineList as $disciplineName) {
    //         $discipline = new Discipline();
    //         $discipline->setName($disciplineName);
    //         $disciplineObjectList[] = $discipline;
    //         $manager->persist($discipline);
    //     }
        
     
    

    //  on crée des annonces 
    //  $announce = Array();
    //  print 'creation des annonces ';
    //  for ($i = 0; $i < 4; $i++) {
    //      $announce[$i] = new Announce();
    //      $announce[$i]->setTitle($faker->title);
    //      $announce[$i]->setContent($faker->text($maxNbChars = 150));
    //      $announce[$i]->setImage($faker->image());
    //      $announce[$i]->setTask($faker->text($maxNbChars = 15 ));
    //      $announce[$i]->setCompleted($faker->boolean($chanceOfGettingTrue = 45));
    //      $announce[$i]->setCompleted($faker->);
         

    //      $classes[$i]->setCreatedAt($faker->date($format = Y-m-d, $Max = 'now'));
    //      $manager->persist($announce[$i]);
    //  }
     

    //  $categoryList = [
    //     'Vie scolaire',
    //     'Trucs et Astuces',
    //     'News',           
    // ];

    // $categoryObjectList = [];

    // print 'Création des categories ';

    // foreach ($categoryList as $categoryName) {
    //     $category = new Category();
    //     $category->setName($categoryName);
    //     $categoryObjectList[] = $category;
    //     $manager->persist($category);
    // }
    
    

    // on crée des notes 
    // $note = Array();
    // print 'creation des notes ';
    // for ($i = 0; $i < 4; $i++){
    //     $note = new Note;
    //     $note->setTitle($faker->title);
    //     $note->setGrade($faker->numberBetween($min = 1, $max = 20));
    //     $manager->persist($note);
    // }
    
    
    

    // on crée des cours 
    // $lesson = Array();
    // print 'creation des cours ';
    // for ($i = 0; $i < 5; $i++){
    //     $lesson = new Lesson;
    //     $lesson->setContent($faker->text($maxNbChars = 100));
    //     $lesson->setIsPrivate($faker->boolean($chanceOfGettingTrue = 0));
    //     //$lesson->setIsPrivate($faker->);
    //     $manager->persist($lesson);
    // }
    
    $manager->flush();
    print '-SUCCESS-'; 
          
    }
}
