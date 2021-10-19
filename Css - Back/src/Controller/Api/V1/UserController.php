<?php

namespace App\Controller\Api\V1;

use App\Entity\User;
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
 * @Route("/api/v1/user", name="api_v1_user_", requirements={"id"="\d+"})
 * @IsGranted("ROLE_ADMIN")
 */
class UserController extends AbstractController
{
    /**
     * Get the User List
     * 
     * @Route("/", name="index", methods={"GET"})
     *
     * @return Response
     */
    public function index(UserRepository $userRepository): Response
    {
        $users = $userRepository->findAll();

        return $this->json($users, 200, [], [
            'groups' => 'user'
        ]);
    }

    /**
     * Show a user by its ID
     * 
     * @Route("/{id}", name="show", methods={"GET"})
     *
     * @param integer $id
     * @param UserRepository $userRepository
     * @return void
     */
    public function show(int $id, UserRepository $userRepository)
    {
        $user = $userRepository->find($id);

        if(!$user){
            return $this->json([
                'error' => 'L\'utilisateur numéro ' . $id . ' n\'existe pas'
            ], 404
            );
        }

        return $this->json($user, 200, [], [
            'groups' => 'user'
        ]);
    }

    /**
     * Edit a user with put or patch method
     * 
     * @Route("/{id}", name="edit", methods={"PUT", "PATCH"})
     *
     * @param integer $id
     * @param UserRepository $userRepository
     * @param Request $request
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function edit(int $id, UserRepository $userRepository, Request $request, SerializerInterface $serializer)
    {
        $jsonData = $request->getContent();
        
        $user = $userRepository->find($id);
        if(!$user){
            return $this->json([
                'errors' => ['message'=>'L\'utilisateur numéro' .$id . 'n\'existe pas']
            ], 404
            );
        }

        $serializer->deserialize($jsonData, User::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE=>$user]);

        $this->getDoctrine()->getManager()->flush();

        return $this->json(["message"=>"L'utilisateur a bien été modifiée"], 200, [], [
            'groups' => 'user'
        ]);
    }

    /**
     * Delete an existing user
     * 
     * @Route("/{id}", name="delete", methods={"DELETE"})
     *
     * @param integer $id
     * @param UserRepository $userRepository
     * @return void
     */
    public function delete(int $id, UserRepository $userRepository)
    {
        $user = $userRepository->find($id);
        if(!$user){
            return $this->json([
                'error' => 'Cette annonce n\'existe pas'
            ],404
            );
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($user);
        $em->flush();

        return $this->json([
            'ok'=>'L\'utilisateur a bien été supprimée'
        ], 200
        );
    }
}
