<?php

namespace App\Repository;

use App\Entity\Classroom;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Classroom|null find($id, $lockMode = null, $lockVersion = null)
 * @method Classroom|null findOneBy(array $criteria, array $orderBy = null)
 * @method Classroom[]    findAll()
 * @method Classroom[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ClassroomRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Classroom::class);
    }

    public function findByTeacher($teacher)
    {
        return $this->createQueryBuilder('classroom')
                    ->join('classroom.teachers', 'teacher')
                    ->where('classroom.id LIKE :id')
                    ->setParameter(':id', "%$teacher%")
                    ->getQuery()
                    ->getResult();
    }

    public function findByUser($users)
    {
        return $this->createQueryBuilder('classrooms')
                    ->join('classrooms.users', 'users')
                    ->where('classrooms.id LIKE :id')
                    ->setParameter(':id', "%$users%")
                    ->getQuery()
                    ->getResult();
    }

    public function countBy()
    {
        return $this->createQueryBuilder('c')
                    ->select('count(c.id)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }
    

    // /**
    //  * @return Classroom[] Returns an array of Classroom objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Classroom
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
