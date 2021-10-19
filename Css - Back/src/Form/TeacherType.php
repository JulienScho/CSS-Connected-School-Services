<?php

namespace App\Form;

use App\Entity\Classroom;
use App\Entity\Discipline;
use App\Entity\Teacher;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TeacherType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', null, [
                'attr'=>[
                    'placeholder'=>'Email'
                ]
            ])
            ->add('lastname',null,[
                'label'=>'Nom',
                'attr'=>[
                    'placeholder'=>'Nom'
                ]
            ])
            ->add('firstname', null,[
                'label'=>'Prénom',
                'attr'=>[
                    'placeholder'=>'Prénom'
                ]
            ])
            ->add('discipline', EntityType::class,[
                'class'=>Discipline::class,
                'required'=>true,
                'choice_label'=>'name',
                // 'multiple'=>true,
                'label'=>'Matière',
                // 'placeholder'=>'Matière',
                'attr'=>[
                    'class'=>'text-center mx-auto'
                ]
           ])
            ->add('classroom', EntityType::class,[
                'class'=>Classroom::class,
                'required'=>true,
                'choice_label'=>function(Classroom $classroom){
                    return sprintf('%s', $classroom->getName());
                }
                ,
                'multiple'=>true,
                'expanded'=>true,
                'label'=>'Classe',
                // 'placeholder'=>'Classe',
                'attr'=>[
                    'class'=>'text-center mx-auto'
                ]
           ])
           ->add('submit', SubmitType::class,[
            'label'=>'Envoyer',
            'attr'=>[
                'class'=>'btn btn-secondary mb-3 mx-auto'
            ]
        ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Teacher::class,
        ]);
    }
}
