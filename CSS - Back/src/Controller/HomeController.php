<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ClassroomRepository;
use App\Repository\DisciplineRepository;
use App\Repository\TeacherRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

class HomeController extends AbstractController
{
    
    /**
     * Display homepage
     * 
     * @Route("/", name="home")
     * @IsGranted("ROLE_ADMIN")
     *
     * @return void
     */
    public function index(TeacherRepository $teacher, UserRepository $user, ClassroomRepository $classroom, DisciplineRepository $discipline)
    {
        // I've made Custom Queries in each repository
        // the user one is also order by roles, because of the ADMIN role
        $teachers = $teacher->countBy();
        $users = $user->countBy();
        $classrooms = $classroom->countBy();
        $disciplines = $discipline->countBy();

        return $this->render('index.html.twig',[
            'teacher'=>$teachers,
            'user'=>$users,
            'classroom'=>$classrooms,
            'discipline'=>$disciplines
        ]);
    }

}