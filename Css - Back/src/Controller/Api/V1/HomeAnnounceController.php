<?php

namespace App\Controller\Api\V1;

use App\Repository\AnnounceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/v1/homeannounce", name="api_v1_home_announce_", requirements={"id"="\d+"})
 */
class HomeAnnounceController extends AbstractController
{
    /**
     * @Route("/", name="index", methods={"GET"})
     *
     * @param AnnounceRepository $announceRepository
     * @return Response
     */
    public function index(AnnounceRepository $announceRepository): Response
    {
        $announces = $announceRepository->findBy([],['createdAt'=>"DESC"]);

        return $this->json($announces, 200, [],[
            'groups' => 'announce'
        ]);
    }

    /**
     * Get an announce by its ID
     * 
     * @Route("/{id}", name="show", methods={"GET"})
     *
     * @param integer $id
     * @param AnnounceRepository $announceRepository
     * @return void
     */
    public function show(int $id, AnnounceRepository $announceRepository)
    {
        $announce = $announceRepository->find($id);

        if(!$announce){
            return $this->json([
                'error' => 'L\'annonce numéro ' . $id . ' n\'existe pas.'
            ], 404
            );
        }

        return $this->json($announce, 200, [], [
            'groups' => 'announce'
        ]);
    }
}
