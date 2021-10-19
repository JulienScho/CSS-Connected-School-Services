<?php

namespace App\Controller\Api\V1;

use App\Entity\Lesson;
use App\Repository\DisciplineRepository;
use App\Repository\LessonRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/v1/lesson", name="api_v1_lesson_", requirements={"id"="\d+"})
 */
class LessonController extends AbstractController
{
    /**
     * Get the lessons list
     * 
     * @Route("/", name="index", methods={"GET"})
     *
     * @return Response
     */
    public function index(LessonRepository $lessonRepository): Response
    {
        // Taking all the lessons with the findAll method into the repository
        $lessons = $lessonRepository->findAll();

        // And return it into json with the good http code
        return $this->json($lessons, 200, [], [
            'groups'=>'lesson'
        ]);
    }

    /**
     * Get lesson list order by title
     * 
     * @Route("/orderByTitle", name="order_by_title", methods={"GET"})
     *
     * @param LessonRepository $lessonRepository
     * @return Response
     */
    public function orderByName(LessonRepository $lessonRepository):Response
    {
        $lessons = $lessonRepository->findBy([],['title'=>'ASC']);

        return $this->json($lessons, 200, [], [
            'groups'=>'lesson'
        ]);
    }

    /**
     * Get a lesson by its ID
     * 
     * @Route("/{id}", name="show", methods={"GET"})
     *
     * @param integer $id
     * @param LessonRepository $lessonRepository
     * @return void
     */
    public function show(int $id, LessonRepository $lessonRepository)
    {
        // We get an lesson by its ID
        $lesson = $lessonRepository->find($id);

        // If the lesson does not exists, we display 404
        if(!$lesson){
            return $this->json([
                'error' => 'La leçon numéro ' . $id . ' n\'existe pas'
            ], 404
            );
        }

        // We return the result with Json format
        return $this->json($lesson, 200, [], [
            'groups' => 'lesson'
        ]);
    }

    /**
     * Select lessons sorted by discipline ID
     * 
     * @Route("/sortedbydiscipline/{id}", name="sortedby_discipline", methods={"GET"})
     *
     * @param integer $id
     * @param DisciplineRepository $disciplineRepository
     * @param LessonRepository $lessonRepository
     * @return void
     */
    public function sortedByDiscipline(int $id, DisciplineRepository $disciplineRepository, LessonRepository $lessonRepository)
    {
        $discipline = $disciplineRepository->find($id);

        $lesson = $lessonRepository->findBy(['discipline'=>$discipline]);

        return $this->json($lesson, 200, [], [
            'groups'=>'lesson'
        ]);
    }

    /**
     * Create a new lesson
     * 
     * @Route("/", name="add", methods={"POST"})
     * @IsGranted("ROLE_TEACHER")
     *
     * @param Request $request
     * @param SerializerInterface $serializer
     * @param ValidatorInterface $validator
     * @return void
     */
    public function create(Request $request, SerializerInterface $serializer, ValidatorInterface $validator)
    {
        // we get the JSON
        $jsonData = $request->getContent();

        // We transform the json in an object with the serializer
        $lesson = $serializer->deserialize($jsonData, Lesson::class, 'json');

        // We validate the datas that are in $lesson 
        $errors = $validator->validate($lesson);

        // If the errors array is not empty, we return an error code 
        if(count($errors) > 0) {
            return $this->json($errors, 400);
        }

        // And then add into the DB
        $em = $this->getDoctrine()->getManager();
        $em->persist($lesson);
        $em->flush();

        return $this->json($lesson, 201, [],[
            'groups'=>'lesson'
        ]);
    }

    /**
     * Update a lesson by its ID with PUT or PATCH method
     * 
     * @Route("/{id}", name="edit", methods={"PUT", "PATCH"})
     * @IsGranted("ROLE_TEACHER")
     *
     * @param integer $id
     * @param LessonRepository $lessonRepository
     * @param Request $request
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function edit(int $id, LessonRepository $lessonRepository, Request $request, SerializerInterface $serializer)
    {
        // We take the Json datas
        $jsonData = $request->getContent();
        
        // We select the good leçon according its ID
        $lesson = $lessonRepository->find($id);
        // If there are no lesson with the good idea, we return an error
        if(!$lesson){
            return $this->json([
                'errors' => ['message'=>'La leçon numéro' .$id . 'n\'existe pas']
            ], 404
            );
        }

        // Transforms th json in an object
        $serializer->deserialize($jsonData, Lesson::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE=>$lesson]);

        // And update it into DB
        $this->getDoctrine()->getManager()->flush();

        // Finally return the good code and message to the API
        return $this->json(["message"=>"La leçon a bien été modifiée"], 200, [], [
            'groups' => 'lesson'
        ]);
    }

    /**
     * Delete a lesson
     * @IsGranted("ROLE_TEACHER")
     *
     * @Route("/{id}", name="delete", methods={"DELETE"})
     * 
     * @param integer $id
     * @param LessonRepository $lessonRepository
     * @return JsonResponse
     */
    public function delete(int $id, LessonRepository $lessonRepository)
    {
        $lesson = $lessonRepository->find($id);
        if(!$lesson){
            return $this->json([
                'error' => 'Cette leçon n\'existe pas'
            ],404
            );
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($lesson);
        $em->flush();

        return $this->json([
            'ok'=>'La leçon a bien été supprimée'
        ], 200
    );
    }
}
