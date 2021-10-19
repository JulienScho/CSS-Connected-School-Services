<?php

namespace App\Form;

use App\Entity\Classroom;
use App\Entity\Teacher;
use App\Repository\TeacherRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ClassroomType extends AbstractType
{
    /**@var Uuid */
    private $encoder;


    public function buildForm(FormBuilderInterface $builder, array $options)
    {

        $builder
            ->add('grade', ChoiceType::class,[
                'choices'=>[
                    '6 ème'=>'6',
                    '5 ème'=>'5',
                    '4 ème'=>'4',
                    '3 ème'=>'3',
                ],
                'placeholder'=>'Choisir un niveau',
                'label'=>'Niveau de classe'
            ])
            ->add('letter',null,[
                'label'=>'Lettre',
                'attr'=>[
                    'placeholder'=>'Lettre'
                ]
            ])
            ->add('teachers', EntityType::class,[
                'class'=>Teacher::class,
                'required'=>true,
                'choice_label' => function(Teacher $teacher) {
                    return sprintf('(%s) %s', $teacher->getDiscipline(), $teacher->getName());
                },
                'multiple'=>true,
                'expanded'=>true,
                'label'=>'Professeurs',
                'placeholder' => 'Choisissez des professeurs',
            ])
            ->add('submit', SubmitType::class,[
                'label'=>'Suite',
                'attr'=>[
                    'class'=>'btn btn-secondary mb-3 mx-auto'
                ]
            ])
            ->addEventListener(FormEvents::SUBMIT, function(FormEvent $event){
                /**@var Classroom $class */
                $class = $event->getData();
                /**@var Teacher $teacher */
                foreach ($class->getTeachers() as $teacher){
                    $teacher->addClassroom($class);
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
