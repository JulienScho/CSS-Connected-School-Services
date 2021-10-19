<?php

namespace App\Form;

use App\Entity\Classroom;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserClassType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('users', EntityType::class,[
                'class'=>User::class,
                'required'=> true,
                'choice_label'=> function(User $user){
                    return $user->getLastname() .' '. $user->getFirstname();
                },
                'multiple'=>true,
                'expanded'=>true,
                'label'=>'Élèves',
                'query_builder' => function(UserRepository $userRepository){
                    return $userRepository->createQueryBuilder('u')
                                        ->where('u.classroom IS NULL')
                                        ->orderBy('u.lastname', 'ASC')
                ;
                }
            ])
            ->add('submit', SubmitType::class,[
                'label'=>'Enregistrer',
                'attr'=>[
                    'class'=>'btn btn-secondary mb-3 mx-auto'
                ]
            ])
            ->addEventListener(FormEvents::SUBMIT, function(FormEvent $event){
                /**@var Classroom $class */
                $class = $event->getData();
                /**@var User $student */
                foreach ($class->getUsers() as $student){
                    $student->setClassroom($class);
                }
            })
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Classroom::class,
        ]);
    }
}
