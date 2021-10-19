<?php

namespace App\Controller\Api\V1;

use App\Entity\Note;
use App\Repository\ClassroomRepository;
use App\Repository\NoteRepository;
use App\Repository\UserRepository;
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
 * @Route("/api/v1/note", name="api_v1_note_", requirements={"id"="\d+"})
 */
class NoteController extends AbstractController
{
    /**
     * @Route("/", name="index", methods={"GET"})
     * Get the note list
     * @param NoteRepository $noteRepository
     * @return Response
     */
    public function index(NoteRepository $noteRepository): Response
    {
        $note = $noteRepository->findAll();

        return $this->json($note, 200, [], [

            'groups' => 'note'
        ]);
    }

    /**
     * @Route("/{id}", name="show", methods={"GET"})
     * Get a note by its ID
     * 
     * @param integer $id
     * 
     * @param NoteRepository $noteRepository
     * 
     * @return JsonResponse
     */
    public function show(int $id, NoteRepository $noteRepository)
    {
        $note = $noteRepository->find($id);
        if (!$note) {
            return $this->json([
                'error' => 'La note ' . $id . 'n\'existe pas'
            ],404);
        }

        return $this->json($note, 200, [], [
            'groups' => 'note'
        ]);
    }

    /**
     * Get Notes order by students
     * 
     * @Route("/sortedbystudents/{id}", name="sortedby_students", methods={"GET"})
     *
     * @param integer $id
     * @param NoteRepository $noteRepository
     * @param UserRepository $userRepository
     * @return void
     */
    public function sortedByStudent(int $id, NoteRepository $noteRepository, UserRepository $userRepository)
    {
        $student = $userRepository->find($id);

        $notes = $noteRepository->findBy(['user'=>$student]);

        return $this->json($notes, 200, [],[
            'groups' => 'note'
        ]);
    }


    /**
     * Order notes by classroom
     * 
     * @Route("/sortedbyclassroom/{id}", name="sortedby_classroom", methods={"GET"})
     *
     * @param integer $id
     * @param NoteRepository $noteRepository
     * @param ClassroomRepository $classroomRepository
     * @return void
     */
    public function sortedByClassroom(int $id, NoteRepository $noteRepository, ClassroomRepository $classroomRepository)
    {
        $classroom = $noteRepository->findByClassroom($id);

        return $this->json($classroom, 200, [],[
            'groups' => 'note'
        ]);
    }

    /**
     * Create a new note
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

        $note = $serializerInterface->deserialize($jsonData, Note::class, 'json');

        $errors = $validatorInterface->validate($note);

        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($note);
        $em->flush();

        return $this->json($note, 201,[],[
            'groups'=>'note'
        ]);
    }

    /**
     * Update a note by its ID with PUT or PATCH method
     * 
     * @Route("/{id}", name="edit", methods={"PUT", "PATCH"})
     * @IsGranted("ROLE_TEACHER")
     * 
     * @param integer $id
     * @param NoteRepository $noteRepository
     * @param SerializerInterface $serializerInterface
     * @param Request $request
     * @return void
     */
    public function update(int $id, NoteRepository $noteRepository, SerializerInterface $serializerInterface, Request $request)
    {
        $jsonData = $request->getContent();

        $note = $noteRepository->find($id);

        if(!$note) {
            return $this->json(
                [
                    'errors' => [
                        'message' => 'L\'appréciation ' . $id . 'n\'existe pas'
                    ]
                ],
                404
            );
        }

        $serializerInterface->deserialize($jsonData, Note::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $note]);

        $this->getDoctrine()->getManager()->flush();

        return $this->json([
            'message' => 'L\'appréciation ' . $note->getTitle() . ' a bien été mis a jour' 
        ]);
    }

    /**
     * Delete a note
     *
     * @Route("/{id}", name="delete", methods={"DELETE"})
     * @IsGranted("ROLE_TEACHER")
     * @param integer $id
     * @param NoteRepository $noteRepository
     * @return JsonResponse
     */
    public function delete (int $id, NoteRepository $noteRepository)
    {
        $note = $noteRepository->find($id);

        if (!$note) {
            return $this->json([
                'error' => 'L\'appréciation  ' . $id . 'n\'existe pas'
            ], 404);
        }
        $em = $this->getDoctrine()->getManager();
        $em->remove($note);
        $em->flush();

        return $this->json([
            'ok'=>'L\'appréciation a bien été supprimée'
        ], 200
    );
        
    }
}

