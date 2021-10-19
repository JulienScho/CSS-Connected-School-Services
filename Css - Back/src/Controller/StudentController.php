<?php

namespace App\Controller;

use App\Entity\Classroom;
use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Form\StudentType;
use App\Repository\ClassroomRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * @Route("/backoffice/student", name="student_")
 * @IsGranted("ROLE_ADMIN")
 */
class StudentController extends AbstractController
{
    /**
     * Display all classrooms
     * 
     * @Route("/", name="home", methods={"GET"})
     *
     * @return Response
     */
    public function index(ClassroomRepository $classroomRepository): Response
    {
        return $this->render('student/index.html.twig', [
            'classrooms'=>$classroomRepository->findAll()
        ]);
    }

    /**
     * Display student list of a classroom selected by its ID
     * 
     * @Route("/{id}/classroom", name="classroom", requirements={"id"="\d+"}, methods={"GET"})
     *
     * @param Classroom $classroom
     * @return void
     */
    public function studentList(Classroom $classroom)
    {
        return $this->render('student/show-list.html.twig', [
            'classroom'=>$classroom
        ]);
    }

    /**
     * Show a student by its ID
     * 
     * @Route("/{id}", name="show", requirements={"id"="\d+"}, methods={"GET"})
     *
     * @param User $user
     * @return void
     */
    public function show(User $user)
    {
        return $this->render('student/show.html.twig', [
            'user'=>$user
        ]);
    }

    /**
     * Create a new student
     * 
     * @Route("/add", name="add", methods={"GET", "POST"})
     *
     * @param Request $request
     * @param UserPasswordHasherInterface $hasher
     * @param \Swift_Mailer $mailer
     * @return void
     */
    public function add(Request $request, UserPasswordHasherInterface $hasher, \Swift_Mailer $mailer)
    {
        $user = new User();

        $plainPassword = 'cssteamisthebest';
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);
        
        if($form->isSubmitted() && $form->isValid()){

            $user->setPassword(
                $hasher->hashPassword(
                    $user,
                    $plainPassword
                )
            );

            $user->setActivationToken(md5(uniqid()));

            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            $message = (new \Swift_Message('Activation de votre compte'))
                    ->setFrom('admin@css.io')
                    ->setTo($user->getEmail())
                    ->setBody(
                        $this->renderView(
                            'email/activation.html.twig',
                            ['token'=>$user->getActivationToken()]
                        ),
                        'text/html'
                    );
                    $mailer->send($message);

                    $this->addFlash(
                        'success',
                        'Élève ajouté avec succès'
                    );

            return $this->redirectToRoute('home');
        }

        return $this->render('registration/register.html.twig',[
            'registrationForm'=>$form->createView()
        ]);
    }


    /**
     * Update a student by its ID
     * 
     * @Route("/{id}/update", name="update", requirements={"id"="\d+"}, methods={"GET", "POST"})
     *
     * @param Request $request
     * @param User $user
     * @return void
     */
    public function update(Request $request, User $user)
    {
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $this->getDoctrine()->getManager()->flush();

            $this->addFlash(
                'success',
                'L\'élève a bien été modifié(e)'
            );

            return $this->redirectToRoute('student_home');
        }

        return $this->render('student/update.html.twig', [
            'user'=>$user,
            'registrationForm'=>$form->createView()
        ]);
    }

    /**
     * Delete a selected student
     * 
     * @Route("/{id}", name="delete", requirements={"id"="\d+"}, methods={"POST"})
     *
     * @param User $user
     * @return void
     */
    public function delete(User $user)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($user);
        $em->flush();

        $this->addFlash(
            'sucess',
            'L\'élève séléctionné a bien été supprimé'
        );

        return $this->redirectToRoute('student_home');
    }
}
