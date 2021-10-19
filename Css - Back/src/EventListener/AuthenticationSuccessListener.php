<?php

namespace App\EventListener;

use App\Entity\User;
use App\Repository\TeacherRepository;
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationSuccessListener {

    private $repository;
    private $teacherRepository;

    // Construct the repo to get it into the method, neither the method wouldn't take it
    public function __construct(UserRepository $repository, TeacherRepository $teacherRepository)
    {
        $this->repository = $repository;
        $this->teacherRepository = $teacherRepository;
    }

    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        // Get the datas after success response and get the User in UserInterface
        $data = $event->getData();
        $user = $event->getUser();
        // Take the username according the UserInterface
        $users = $user->getUserIdentifier();
        // And get the datas we need
        $role = $user->getRoles();
        
        if($role == ["ROLE_USER"]){
            // Find the good user with the username/email
            $test = $this->repository->findOneBy(['email'=>$users]);
            $first = $test->getFirstname();
            $last = $test->getLastname();
            $id = $test->getId();
            $class = $test->getClassroom();
            if ($class == !null) {
                $letter = $class->getLetter();
                $grade = $class->getGrade();
                $classId = $class->getId();
            }
        }
        elseif($role == ["ROLE_TEACHER"]){
            $teacher = $this->teacherRepository->findOneBy(['email'=>$users]);
            $first = $teacher->getFirstname();
            $last = $teacher->getLastname();
            $id = $teacher->getId();
            $class = $teacher->getClassroom();
            $discipline = $teacher->getDiscipline();
            $matiere = $discipline->getName();
            $disciplineId = $discipline->getId();
        }
        else{
            $test = $this->repository->findOneBy(['email'=>$users]);
            $first = $test->getFirstname();
            $last = $test->getLastname();
            $id = $test->getId();
            $class = $test->getClassroom();
        }
        // Check and verify if $user is well part of UserInterface
        if(!$user instanceof UserInterface) {
            return;
        }
       
        // And then make the data array that will display in the body response of the connection with the JWT Token
        if($role == ["ROLE_USER"] && $class == !null){
        $data['data'] = array(
            'id' => $id,
            'firstname' => $first,
            'lastname' => $last,
            'roles' => $user->getRoles(),
                'classroom' => [
                    'id'=>$classId,
                    'letter'=>$letter,
                    'grade'=>$grade
                    ]
            );
        } 
        elseif($role == ["ROLE_TEACHER"]){
            $data['data'] = array(
                'id'=> $id,
                'firstname' => $first,
                'lastname' => $last,
                'roles' => $user->getRoles(),
                'classroom' => $class,
                'discipline_id'=>$disciplineId,
                'discipline' => $matiere
            );
        }
        else{
            $data['data'] = array(
                'id'=>$id,
                'firstname' => $first,
                'lastname' => $last,
                'roles' => $user->getRoles(),
                'classroom' => $class,
            );
        }
        // Set it in the event
        
        $event->setData($data);
    }
}