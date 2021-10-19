<?php

namespace App\Repository;

use App\Entity\Announce;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

use function Symfony\Component\DependencyInjection\Loader\Configurator\expr;

/**
 * @method Announce|null find($id, $lockMode = null, $lockVersion = null)
 * @method Announce|null findOneBy(array $criteria, array $orderBy = null)
 * @method Announce[]    findAll()
 * @method Announce[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnnounceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Announce::class);
    }

    public function findByCategory($category)
    {
        return $this->createQueryBuilder('announce')
                    ->join('announce.category', 'category')
                    ->where('category.name LIKE :name')
                    ->setParameter(':name', "%$category%")
                    ->getQuery()
                    ->getResult();
    }

    public function findByClassroom($classroom)
    {
        return $this->createQueryBuilder('announce')
                    ->join('announce.classrooms', 'classroom')
                    ->where('classroom.id LIKE :id')
                    ->setParameter(':id', "%$classroom%")
                    ->getQuery()
                    ->getResult();
    }

    public function findAllHomework()
    {
        return $this->createQueryBuilder('a')
                    ->where('a.homework IS NOT NULL')
                    ->orderBy('a.expireAt', 'ASC')
                    ->getQuery()
                    ->getResult();         
    }

    public function findHomeworkByClassroom($classroom)
    {
        return $this->createQueryBuilder('a')
                    ->andWhere('a.homework IS NOT NULL')
                    ->join('a.classrooms', 'ac')
                    ->andWhere('ac.id LIKE :id')
                    ->setParameter(':id', "%$classroom%")
                    ->orderBy('a.expireAt', 'ASC')
                    ->getQuery()
                    ->getResult();         
    }

    // /**
    //  * @return Announce[] Returns an array of Announce objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Announce
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
