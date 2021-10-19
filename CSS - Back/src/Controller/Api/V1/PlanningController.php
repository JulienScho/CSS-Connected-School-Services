<?php

namespace App\Controller\Api\V1;

use App\Entity\Planning;
use App\Repository\ClassroomRepository;
use App\Repository\PlanningRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * 
 * @Route("/api/v1/planning", name="api_v1_planning_", requirements={"id"="\d+"})
 */
class PlanningController extends AbstractController
{
    /**
     * @Route("/", name="index", methods={"GET"})
     * Get the planning list
     * @param PlanningRepository $planningRepository
     * @return Response
     */
    public function index(PlanningRepository $planningRepository): Response
    {
        $planning = $planningRepository->findAll();

        return $this->json($planning, 200, [], [

            'groups' => 'planning'
        ]);
    }
    /**
     * @Route("/{id}", name="show", methods={"GET"})
     * Get a planning by its ID
     * 
     * @param integer $id
     * 
     * @param PlanningRepository $planningRepository
     * 
     * @return JsonResponse
     */
    public function show(int $id, PlanningRepository $planningRepository)
    {
        $planning = $planningRepository->find($id);
        if (!$planning) {
            return $this->json([
                'error' => 'Le planning ' . $id . 'n\'existe pas'
            ],404);
        }

        return $this->json($planning, 200, [], [
            'groups' => 'planning'
        ]);
    }
    /**
     * Create a new planning
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

        $planning = $serializerInterface->deserialize($jsonData, Planning::class, 'json');

        $errors = $validatorInterface->validate($planning);

        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($planning);
        $em->flush();

        return $this->json($planning, 201, [], [
            'groups'=>'planning'
        ]);
    }

    /**
     * Select planning order by classroom's ID
     *
     * @Route("/sortedby/{id}", name="sortedby", methods={"GET"})
     * 
     * @param integer $id
     * @param PlanningRepository $planningRepository
     * @param ClassroomRepository $classroomRepository
     * @return void
     */
    public function sortedBy(int $id, PlanningRepository $planningRepository, ClassroomRepository $classroomRepository)
    {
        $classroom = $classroomRepository->find($id);

        $planning = $planningRepository->findBy(['classroom'=>$classroom]);

        return $this->json($planning, 200, [], [
            'groups'=> 'planning'
        ]);

    }

    /**
     * Update a planning by its ID with PUT or PATCH method
     * 
     * @Route("/{id}", name="edit", methods={"PUT", "PATCH"})
     * @IsGranted("ROLE_TEACHER")
     * 
     * @param integer $id
     * @param PlanningRepository $planningRepository
     * @param SerializerInterface $serializerInterface
     * @param Request $request
     * @return void
     */
    public function update(int $id, PlanningRepository $planningRepository, SerializerInterface $serializerInterface, Request $request)
    {
        $jsonData = $request->getContent();

        $planning = $planningRepository->find($id);

        if(!$planning) {
            return $this->json(
                [
                    'errors' => [
                        'message' => 'Le planning ' . $id . 'n\'existe pas'
                    ]
                ],
                404
            );
        }

        $serializerInterface->deserialize($jsonData, Planning::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $planning]);

        $this->getDoctrine()->getManager()->flush();

        return $this->json([
            'message' => 'Les horaires ont bien été modifiés ' . $planning->getBegin() .' - ' .$planning->getFinish() . ' a bien été mis a jour' 
        ]);
    }

    /**
     * Delete a planning
     *
     * @Route("/{id}", name="delete", methods={"DELETE"})
     * @IsGranted("ROLE_TEACHER")
     * @param integer $id
     * @param PlanningRepository $planningRepository
     * @return JsonResponse
     */
    public function delete (int $id, PlanningRepository $planningRepository)
    {
        $planning = $planningRepository->find($id);

        if (!$planning) {
            return $this->json([
                'error' => 'Le planning ' . $id . 'n\'existe pas'
            ], 404);
        }
        $em = $this->getDoctrine()->getManager();
        $em->remove($planning);
        $em->flush();

        return $this->json([
            'ok'=>'Le planning a bien été supprimée'
        ], 200
    );
        
    }
}

