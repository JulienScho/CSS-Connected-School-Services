<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\PasswordValidateType;
use App\Form\RegistrationFormType;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Response;

class RegistrationController extends AbstractController
{
    /**
     * @Route("/register", name="app_register")
     * @IsGranted("ROLE_ADMIN")
     */
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasherInterface, \Swift_Mailer $mailer): Response
    {
        $user = new User();
        // Define a default password, that will be change by the user
        $plainPassword = 'cssteamisthebest';
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // encode the plain password
            $user->setPassword(
                $userPasswordHasherInterface->hashPassword(
                    $user,
                    $plainPassword
                )
            );

            $user->setActivationToken(md5(uniqid()));

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
            
            $message = (new \Swift_Message('Activation de votre compte'))
                    ->setFrom('admin@css.io')
                    ->setTo($user->getEmail())
                    ->setBody(
                        $this->renderView(
                            'email/activation.html.twig',
                            ['token'=>$user->getActivationToken()]
                        ),
                        'text/html'
                    )
            ;
            $mailer->send($message);


            return $this->redirectToRoute('app_login');
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form->createView(),
        ]);
    }

    /**
     * Method to activate a user
     * 
     * @Route("/activation/{token}", name="activation")
     *
     * @param [type] $token
     * @param UserRepository $userRepository
     * @param Request $request
     * @param UserPasswordHasherInterface $userPasswordHasherInterface
     * @return void
     */
    public function activation($token, UserRepository $userRepository, Request $request, UserPasswordHasherInterface $userPasswordHasherInterface)
    {
        $user = $userRepository->findOneBy(['activation_token'=>$token]);

        if(!$user){
            throw $this->createNotFoundException('Vous avez déjà activé votre compte');
        }

        $this->getDoctrine()->getManager();
        $resetForm = $this->createForm(PasswordValidateType::class, $user);
        $resetForm->handleRequest($request);

        if($resetForm->isSubmitted() && $resetForm->isValid()){
            $user->setActivationToken(null);
            $user->setPassword(
                $userPasswordHasherInterface->hashPassword(
                    $user,
                    $resetForm->get('plainPassword')->getData()
                )
            );

            $this->getDoctrine()->getManager()->flush();

            $this->addFlash(
                'success',
                'Votre compte a bien été activé !'
            );

            return $this->render('security/redirect.html.twig');
        }

        return $this->render('email/confirmation.html.twig', [
            'formView'=>$resetForm->createView()
        ]);
    }
}
