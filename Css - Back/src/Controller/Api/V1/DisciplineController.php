<?php

namespace App\Controller\Api\V1;

use App\Entity\Classroom;
use App\Entity\Discipline;
use App\Repository\DisciplineRepository;
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
 * @Route("/api/v1/discipline", name="api_v1_discipline_", requirements={"id"="\d+"})
 */
class DisciplineController extends AbstractController
{
    /**
     * @Route("/", name="index", methods={"GET"})
     * Get the discipline list
     * @param DisciplineRepository $disciplineRepository
     * @return Response
     */
    public function index(DisciplineRepository $disciplineRepository): Response
    {
        $discipline = $disciplineRepository->findAll();

        return $this->json($discipline, 200, [], [

            'groups' => 'discipline'
        ]);
    }

    /**
     * @Route("/{id}", name="show", methods={"GET"})
     * Get a discipline by its ID
     * 
     * @param integer $id
     * 
     * @param DisciplineRepository $disciplineRepository
     * 
     * @return JsonResponse
     */
    public function show(int $id, DisciplineRepository $disciplineRepository)
    {
        $discipline = $disciplineRepository->find($id);
        if (!$discipline) {
            return $this->json([
                'error' => 'La discipline ' . $id . 'n\'existe pas'
            ],404);
        }

        return $this->json($discipline, 200, [], [
            'groups' => 'discipline'
        ]);
    }
    /**
     * Create a new discipline
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

        $discipline = $serializerInterface->deserialize($jsonData, Discipline::class, 'json');

        $errors = $validatorInterface->validate($discipline);

        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($discipline);
        $em->flush();

        return $this->json($discipline, 201);
    }

    /**
     * Update a discipline by its ID with PUT or PATCH method
     * 
     * @Route("/{id}", name="edit", methods={"PUT", "PATCH"})
     * @IsGranted("ROLE_TEACHER")
     * 
     * @param integer $id
     * @param DisciplineRepository $disciplineRepository
     * @param SerializerInterface $serializerInterface
     * @param Request $request
     * @return void
     */
    public function update(int $id, DisciplineRepository $disciplineRepository, SerializerInterface $serializerInterface, Request $request)
    {
        $jsonData = $request->getContent();

        $discipline = $disciplineRepository->find($id);

        if(!$discipline) {
            return $this->json(
                [
                    'errors' => [
                        'message' => 'La discipline ' . $id . 'n\'existe pas'
                    ]
                ],
                404
            );
        }

        $serializerInterface->deserialize($jsonData, Discipline::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $discipline]);

        $this->getDoctrine()->getManager()->flush();

        return $this->json([
            'message' => 'La discipline ' . $discipline->getName() . ' a bien été mise a jour' 
        ]);
    }

    /**
     * Delete a discipline
     *
     * @Route("/{id}", name="delete", methods={"DELETE"})
     * @IsGranted("ROLE_TEACHER")
     * @param integer $id
     * @param DisciplineRepository $DisciplineRepository
     * @return JsonResponse
     */
    public function delete (int $id, DisciplineRepository $DisciplineRepository)
    {
        $discipline = $DisciplineRepository->find($id);

        if (!$discipline) {
            return $this->json([
                'error' => 'La classe ' . $id . 'n\'existe pas'
            ], 404);
        }
        $em = $this->getDoctrine()->getManager();
        $em->remove($discipline);
        $em->flush();

        return $this->json([
            'ok'=>'La discipline a bien été supprimée'
        ], 200
    );
        
    }
}
