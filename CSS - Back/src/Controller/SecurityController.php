<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\ResetPassType;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     * 
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('home');
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        // throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');

        return $this->redirectToRoute('app_login');
    }

    /**
     * Change password if it's lost
     * 
     * @Route("/reset_pass", name="reset")
     *
     * @param Request $request
     * @param UserRepository $repository
     * @param \Swift_Mailer $mailer
     * @param TokenGeneratorInterface $tokenGenerator
     * @return Response
     */
    public function forgotPass(Request $request, UserRepository $repository, \Swift_Mailer $mailer, TokenGeneratorInterface $tokenGenerator): Response
    {
        // We intitialize the form
        $form = $this->createForm(ResetPassType::class);
        
        // Process the form
        $form->handleRequest($request);

        // If form is valid
        if($form->isSubmitted() && $form->isValid()){
            
            // Get datas
            $datas = $form->getData();

            // Search for a user that have this mail
            $user = $repository->findOneBy(['email'=>$datas]);

            // If there is no user
            if($user === null){
                $this->addFlash(
                    'danger',
                    'Cette adresse e-mail est inconnue'
                );

                return $this->render('security/redirect.html.twig');
            }

            // We generate a token
            $token = $tokenGenerator->generateToken();
            // Try ti write token in DB
            try{
                $user->setResetToken($token);
                $em = $this->getDoctrine()->getManager();
                $em->persist($user);
                $em->flush();
            } catch (\Exception $e) {
                $this->addFlash(
                    'warning',
                    $e->getMessage());
                    return $this->render('security/redirect.html.twig');
            }

            // Generate change password URL
            $url = $this->generateUrl('app_reset_password', array('token'=>$token), UrlGeneratorInterface::ABSOLUTE_URL);

            // Generate Mail
            $message = (new \Swift_Message('Mot de passe oublié'))
                    ->setFrom('admin@css.io')
                    ->setTo($user->getEmail())
                    ->setBody(
                        $this->renderView(
                            'email/reset.html.twig', 
                            ['url'=>$url]
                        ),
                        'text/html'
                    )
            ;
            $mailer->send($message);
            $this->addFlash(
                'success',
                'Email de réinitialisation du mot de passe envoyé !'
            );

            return $this->render('security/redirect.html.twig');
        }
        return $this->render('security/reset.html.twig',[
            'formView'=>$form->createView()
        ]);
    }

    /**
     * Reset password after token verification
     * 
     * @Route("/reset_pass/{token}", name="app_reset_password")
     *
     * @param Request $request
     * @param string $token
     * @param UserPasswordHasherInterface $hasher
     * @return void
     */
    public function resetPass(Request $request, string $token, UserPasswordHasherInterface $hasher, UserRepository $repository)
    {
        // We search an user with the token given
        $user = $repository->findOneBy(['reset_token'=>$token]);

        // If user does not exist
        if($user === null){
            $this->addFlash(
                'danger',
                'Ce lien n\'est pas/plus valide'
            );
            return $this->render('security/redirect.html.twig');
        }

        // If form is send with post method
        if($request->isMethod('POST')){
            // Delete token
            $user->setResetToken(null);

            // Hash password
            $user->setPassword($hasher->hashPassword($user, $request->request->get('password')));

            // Stock in DB
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            $this->addFlash(
                'success',
                'Votre mot de passe a bien été mis à jour'
            );

            return $this->render('security/redirect.html.twig');
        } else {
            // If we don't have datas, we display the form
            return $this->render('security/reset_password.html.twig',[
                'token'=>$token
            ]);
        }
    }
}
