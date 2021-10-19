<?php

namespace App\Controller\Api\V1;

use App\Entity\Day;
use App\Repository\DayRepository;
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
 * @Route("/api/v1/day", name="api_v1_day_", requirements={"id"="\d+"})
 */
class DayController extends AbstractController
{
    /**
     * @Route("/", name="index", methods={"GET"})
     * Get the day list
     * @param DayRepository $dayRepository
     * @return Response
     */
    public function index(DayRepository $dayRepository): Response
    {
        $day = $dayRepository->findAll();

        return $this->json($day, 200, [], [

            'groups' => 'day'
        ]);
    }

    /**
     * @Route("/{id}", name="show", methods={"GET"})
     * Get a day by its ID
     * 
     * @param integer $id
     * 
     * @param DayRepository $dayRepository
     * 
     * @return JsonResponse
     */
    public function show(int $id, DayRepository $dayRepository)
    {
        $day = $dayRepository->find($id);
        if (!$day) {
            return $this->json([
                'error' => 'La journée ' . $id . 'n\'existe pas'
            ],404);
        }

        return $this->json($day, 200, [], [
            'groups' => 'day'
        ]);
    }
    /**
     * Create a new day
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

        $day = $serializerInterface->deserialize($jsonData, Day::class, 'json');

        $errors = $validatorInterface->validate($day);

        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($day);
        $em->flush();

        return $this->json($day, 201);
    }

    /**
     * Update a day by its ID with PUT or PATCH method
     * 
     * @Route("/{id}", name="edit", methods={"PUT", "PATCH"})
     * @IsGranted("ROLE_TEACHER")
     * 
     * @param integer $id
     * @param DayRepository $dayRepository
     * @param SerializerInterface $serializerInterface
     * @param Request $request
     * @return void
     */
    public function update(int $id, DayRepository $dayRepository, SerializerInterface $serializerInterface, Request $request)
    {
        $jsonData = $request->getContent();

        $day = $dayRepository->find($id);

        if(!$day) {
            return $this->json(
                [
                    'errors' => [
                        'message' => 'La journée ' . $id . 'n\'existe pas'
                    ]
                ],
                404
            );
        }

        $serializerInterface->deserialize($jsonData, Day::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $day]);

        $this->getDoctrine()->getManager()->flush();

        return $this->json([
            'message' => 'La journée ' . $day->getName() . ' a bien été mis a jour' 
        ]);
    }

    /**
     * Delete a day
     *
     * @Route("/{id}", name="delete", methods={"DELETE"})
     * @IsGranted("ROLE_TEACHER")
     * @param integer $id
     * @param DayRepository $dayRepository
     * @return JsonResponse
     */
    public function delete (int $id, DayRepository $dayRepository)
    {
        $day = $dayRepository->find($id);

        if (!$day) {
            return $this->json([
                'error' => 'La journée ' . $id . 'n\'existe pas'
            ], 404);
        }
        $em = $this->getDoctrine()->getManager();
        $em->remove($day);
        $em->flush();

        return $this->json([
            'ok'=>'La journée a bien été supprimée'
        ], 200
    );
        
    }
}
