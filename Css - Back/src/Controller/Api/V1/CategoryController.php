<?php

namespace App\Controller\Api\V1;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/v1/category", name="api_v1_category_", requirements={"id"="\d+"})
 */
class CategoryController extends AbstractController
{
    /**
     * @Route("/", name="index", methods={"GET"})
     * Get the category list
     * @param CategoryRepository $categoryRepository
     * @return Response
     */
    public function index(CategoryRepository $categoryRepository): Response
    {
        $categories = $categoryRepository->findAll();

        return $this->json($categories, 200, [], [

            'groups' => 'category'
        ]);
    }

    /**
     * @Route("/{id}", name="show", methods={"GET"})
     * 
     * Get a category by its ID
     * @param integer $id
     * 
     * @param CategoryRepository $categoryRepository
     * 
     * @return JsonResponse
     */
    public function show(int $id, CategoryRepository $categoryRepository)
    {
        $category = $categoryRepository->find($id);
        if (!$category) {
            return $this->json([
                'error' => 'La série' . $id . 'n\'existe pas'
            ],404);
        }

        return $this->json($category, 200, [], [
            'groups' => 'category'
        ]);
    }
    /**
     * Create a new category
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

        $category = $serializerInterface->deserialize($jsonData, Category::class, 'json',[AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER]);

        $errors = $validatorInterface->validate($category);

        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($category);
        $em->flush();

        return $this->json($category, 201, [],[
            'groups'=>'announce'
        ]);
    }

    /**
     * Update a category by its ID with PUT or PATCH method
     * 
     * @Route("/{id}", name="edit", methods={"PUT", "PATCH"})
     * @IsGranted("ROLE_TEACHER")
     * 
     * @param integer $id
     * @param CategoryRepository $categoryRepository
     * @param SerializerInterface $serializerInterface
     * @param Request $request
     * @return void
     */
    public function update(int $id, CategoryRepository $categoryRepository, SerializerInterface $serializerInterface, Request $request)
    {
        $jsonData = $request->getContent();

        $category = $categoryRepository->find($id);

        if(!$category) {
            return $this->json(
                [
                    'errors' => [
                        'message' => 'La categorie' . $id . 'n\'existe pas'
                    ]
                ],
                404
            );
        }

        $serializerInterface->deserialize($jsonData, Category::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $category]);

        $this->getDoctrine()->getManager()->flush();

        return $this->json([
            'message' => 'La categorie ' . $category->getName() . ' a bien été mise a jour' 
        ]);
    }

    /**
     * Delete a category
     *
     * @Route("/{id}", name="delete", methods={"DELETE"})
     * @IsGranted("ROLE_TEACHER")
     * @param integer $id
     * @param CategoryRepository $CategoryRepository
     * @return JsonResponse
     */
    public function delete (int $id, CategoryRepository $categoryRepository)
    {
        $category = $categoryRepository->find($id);

        if (!$category) {
            return $this->json([
                'error' => 'La categorie ' . $id . ' n\'existe pas'
            ], 404);
        }
        $em = $this->getDoctrine()->getManager();
        $em->remove($category);
        $em->flush();

        return $this->json([
            'ok'=>'La catégorie a bien été supprimée'
        ], 200
    );
        
    }
}
