<?php

namespace App\Controller\Api\V1;

use App\Entity\Teacher;
use App\Repository\ClassroomRepository;
use App\Repository\TeacherRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
/**
 * 
 * @Route("/api/v1/teacher", name="api_v1_teacher_", requirements={"id"="\d+"})
 */
class TeacherController extends AbstractController
{
    /**
     * @Route("/", name="index", methods={"GET"})
     * Get the teacher list
     * @param TeacherRepository $teacherRepository
     * @return Response
     */
    public function index(TeacherRepository $teacherRepository): Response
    {
        $teacher = $teacherRepository->findAll();

        return $this->json($teacher, 200, [], [

            'groups' => 'teacher'
        ]);
    }

    /**
     * @Route("/{id}", name="show", methods={"GET"})
     * Get a teacher by its ID
     * 
     * @param integer $id
     * 
     * @param TeacherRepository $teacherRepository
     * 
     * @return JsonResponse
     */
    public function show(int $id, TeacherRepository $teacherRepository)
    {
        $teacher = $teacherRepository->find($id);
        if (!$teacher) {
            return $this->json([
                'error' => 'Le teacher ' . $id . 'n\'existe pas'
            ],404);
        }

        return $this->json($teacher, 200, [], [
            'groups' => 'teacher'
        ]);
    }

    /**
     * Undocumented function
     * @Route("/classroom/{id}", name="classroom", methods={"GET"})
     * @param integer $id
     * @param TeacherRepository $teacherRepository
     * @param ClassroomRepository $classroomRepository
     * @return JsonResponse
     */
    public function sortedby(int $id, TeacherRepository $teacherRepository, ClassroomRepository $classroomRepository)
    {
        $teacher = $teacherRepository->findbyClassroom($id);


        return $this->json($teacher, 200, [], [
            'groups'=> 'teacher'
        ]);
    }
    /**
     * Create a new teacher
     * @Route("/", name="add", methods={"POST"})
     * @IsGranted("ROLE_TEACHER")
     * 
     * @param Request $request
     * @param SerializerInterface $serializerInterface
     * @param ValidatorInterface $validatorInterface
     * @return void
     */
    public function add(Request $request, SerializerInterface $serializerInterface, ValidatorInterface $validatorInterface)
    {
        $jsonData = $request->getContent();

        $teacher = $serializerInterface->deserialize($jsonData, Teacher::class, 'json');

        $errors = $validatorInterface->validate($teacher);

        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($teacher);
        $em->flush();

        return $this->json($teacher, 201);
    }

    /**
     * Update a teacher by its ID with PUT or PATCH method
     * 
     * @Route("/{id}", name="edit", methods={"PUT", "PATCH"})
     * @IsGranted("ROLE_TEACHER")
     * 
     * @param integer $id
     * @param TeacherRepository $teacherRepository
     * @param SerializerInterface $serializerInterface
     * @param Request $request
     * @return void
     */
    public function update(int $id, TeacherRepository $teacherRepository, SerializerInterface $serializerInterface, Request $request)
    {
        $jsonData = $request->getContent();

        $teacher = $teacherRepository->find($id);

        if(!$teacher) {
            return $this->json(
                [
                    'errors' => [
                        'message' => 'Le teacher ' . $id . 'n\'existe pas'
                    ]
                ],
                404
            );
        }

        $serializerInterface->deserialize($jsonData, Teacher::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $teacher]);

        $this->getDoctrine()->getManager()->flush();

        return $this->json([
            'message' => 'Le prof ' . $teacher->getLastname() .' - ' .$teacher->getFirstname() . ' a bien été mis a jour' 
        ]);
    }

    /**
     * Delete a teacher
     *
     * @Route("/{id}", name="delete", methods={"DELETE"})
     * @IsGranted("ROLE_TEACHER")
     * @param integer $id
     * @param TeacherRepository $teacherRepository
     * @return JsonResponse
     */
    public function delete (int $id, TeacherRepository $teacherRepository)
    {
        $teacher = $teacherRepository->find($id);

        if (!$teacher) {
            return $this->json([
                'error' => 'Le teacher ' . $id . 'n\'existe pas'
            ], 404);
        }
        $em = $this->getDoctrine()->getManager();
        $em->remove($teacher);
        $em->flush();

        return $this->json([
            'ok'=>'Le teacher a bien été supprimée'
        ], 200
    );
        
    }
}


