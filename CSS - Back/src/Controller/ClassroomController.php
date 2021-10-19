<?php

namespace App\Controller;

use App\Entity\Classroom;
use App\Entity\Teacher;
use App\Entity\User;
use App\Form\ClassroomType;
use App\Form\UserClassType;
use App\Repository\ClassroomRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/backoffice/classroom", name="classroom_", requirements={"id"="\d+"})
 */
class ClassroomController extends AbstractController
{
    /**
     * Display classrooms' list
     * 
     * @Route("/", name="home", methods={"GET"})
     *
     * @return Response
     */
    public function index(ClassroomRepository $classroomRepository): Response
    {
        return $this->render('classroom/classroom.html.twig', [
            "classrooms"=>$classroomRepository->findAll()
        ]);
    }

    /**
     * Display classrooms by grade
     * 
     * @Route("/{id}/grade_list", name="list")
     *
     * @param integer $id
     * @param ClassroomRepository $repository
     * @return void
     */
    public function classList(int $id, ClassroomRepository $repository)
    {
        $list = $repository->findBy(['grade'=>$id], ['letter'=>'ASC']);

        return $this->render('classroom/classlist.html.twig',[
            "class"=>$list
        ]);
    }

    /**
     * Create a new classroom
     * 
     * @Route("/add", name="add", methods={"GET", "POST"})
     *
     * @param Request $request
     * @return void
     */
    public function create(Request $request)
    {
        $class = new Classroom();

        $form = $this->createForm(ClassroomType::class, $class);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){

            $em = $this->getDoctrine()->getManager();
            $em->persist($class);
            $em->flush();

            $id = $class->getId();

            $this->addFlash(
                'success',
                'La nouvelle classe a bien été ajoutée'
            );

            return $this->redirectToRoute('classroom_add_next',[
                'id'=>$id
            ]);
        }

        return $this->render('classroom/add.html.twig',[
            'formView'=>$form->createView(),
        ]);
    }

    /**
     * Continue classroom creation with adding students
     * 
     * @Route("/{id}/add", name="add_next", methods={"GET", "POST"})
     *
     * @param integer $id
     * @param Request $request
     * @param ClassroomRepository $repository
     * @return void
     */
    public function createNext(Classroom $class, Request $request)
    {
        $form = $this->createForm(UserClassType::class, $class);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){

            $this->getDoctrine()->getManager()->flush();

            $this->addFlash(
                'success',
                'Les élèves ont bien été ajoutés'
            );

            return $this->redirectToRoute('home');
        }

        return $this->render('classroom/next.html.twig',[
            'formView'=>$form->createView()
        ]);
    }

    /**
     * Edit a classroom composition
     * 
     * @Route("/{id}/update", name="update", methods={"GET", "POST"})
     *
     * @param Request $request
     * @param Classroom $class
     * @return void
     */
    public function update(Request $request, Classroom $class)
    {
        $form = $this->createForm(ClassroomType::class, $class);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $this->getDoctrine()->getManager()->flush();

            $id = $class->getId();

            $this->addFlash(
                'success',
                'Première partie de la classe modifiée'
            );

            return $this->redirectToRoute('classroom_update_next',[
                'id'=>$id
            ]);
        }

        return $this->render('classroom/update.html.twig',[
            'formView'=>$form->createView()
        ]);
    }

    /**
     * Next page to update a classroom
     * 
     * @Route("/{id}/next", name="update_next", methods={"GET", "POST"})
     *
     * @param Request $request
     * @param Classroom $class
     * @return void
     */
    public function updateNext(Request $request, Classroom $class)
    {
        $form = $this->createForm(UserClassType::class, $class);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $this->getDoctrine()->getManager()->flush();

            $this->addFlash(
                'success',
                'La classe a bien été modifiée'
            );

            return $this->redirectToRoute('home');
        }

        return $this->render('classroom/update-next.html.twig', [
            'formView'=>$form->createView()
        ]);
    }

    
    /**
     * Delete a classroom
     * 
     * @Route("/{id}/delete", name="delete", methods={"GET", "POST"})
     *
     * @param Classroom $class
     * @return void
     */
    public function delete(Classroom $class)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($class);
        $em->flush();

        $this->addFlash(
            'success',
            'La classe a bien été supprimée'
        );

        return $this->redirectToRoute('home');
    }
}
