<?php

namespace App\Entity;

use App\Repository\PlanningRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PlanningRepository::class)
 */
class Planning
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"user", "planning"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user", "planning"})
     */
    private $begin;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user", "planning"})
     */
    private $finish;

    /**
     * @ORM\Column(type="datetime_immutable")
     * 
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Day::class, inversedBy="plannings")
     * @Groups({"planning"})
     */
    private $day;

    /**
     * @ORM\ManyToOne(targetEntity=Discipline::class, inversedBy="planning")
     * @Groups({"planning"})
     */
    private $discipline;

    /**
     * @ORM\ManyToOne(targetEntity=Classroom::class, inversedBy="plannings")
     * @Groups({"planning"})
     */
    private $classroom;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBegin(): ?string
    {
        return $this->begin;
    }

    public function setBegin(string $begin): self
    {
        $this->begin = $begin;

        return $this;
    }

    public function getFinish(): ?string
    {
        return $this->finish;
    }

    public function setFinish(string $finish): self
    {
        $this->finish = $finish;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getDay(): ?Day
    {
        return $this->day;
    }

    public function setDay(?Day $day): self
    {
        $this->day = $day;

        return $this;
    }

    public function getDiscipline(): ?Discipline
    {
        return $this->discipline;
    }

    public function setDiscipline(?Discipline $discipline): self
    {
        $this->discipline = $discipline;

        return $this;
    }

    public function getClassroom(): ?Classroom
    {
        return $this->classroom;
    }

    public function setClassroom(?Classroom $classroom): self
    {
        $this->classroom = $classroom;

        return $this;
    }
}
