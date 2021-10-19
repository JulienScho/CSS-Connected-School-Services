<?php

namespace App\Entity;

use App\Repository\ClassroomRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ClassroomRepository::class)
 */
class Classroom
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"user", "classroomu", "classroomt", "planning", "announce", "teacher", "note", "classroom"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user", "classroomu", "classroomt", "planning", "announce", "teacher", "note", "classroom"})
     */
    private $letter;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user", "classroomu", "classroomt", "planning", "announce", "teacher", "note", "classroom"})
     */
    private $grade;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"classroom"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     * @Groups({"classroom"})
     */
    private $updatedAt;

    /**
     * @ORM\ManyToMany(targetEntity=Announce::class, inversedBy="classrooms")
     */
    private $announce;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="classroom")
     * @Groups({"classroomu"})
     */
    private $users;

    /**
     * @ORM\ManyToMany(targetEntity=Teacher::class, mappedBy="classroom")
     * @Groups({"classroomt"})
     */
    private $teachers;

    /**
     * @ORM\OneToMany(targetEntity=Planning::class, mappedBy="classroom")
     */
    private $plannings;

    public function __construct()
    {
        $this->announce = new ArrayCollection();
        $this->teachers = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->plannings = new ArrayCollection();
    }

    public function __toString()
    {
    return $this->letter;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->grade . ' ème ' . $this->letter;
    }

    public function getLetter(): ?string
    {
        return $this->letter;
    }

    public function setLetter(string $letter): self
    {
        $this->letter = $letter;

        return $this;
    }

    public function getGrade(): ?string
    {
        return $this->grade;
    }

    public function setGrade(string $grade): self
    {
        $this->grade = $grade;

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

    /**
     * @return Collection|Announce[]
     */
    public function getAnnounce(): Collection
    {
        return $this->announce;
    }

    public function addAnnounce(Announce $announce): self
    {
        if (!$this->announce->contains($announce)) {
            $this->announce[] = $announce;
        }

        return $this;
    }

    public function removeAnnounce(Announce $announce): self
    {
        $this->announce->removeElement($announce);

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setClassroom($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getClassroom() === $this) {
                $user->setClassroom(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Teacher[]
     */
    public function getTeachers():Collection
    {
        return $this->teachers;
    }

    public function addTeacher(Teacher $teacher): self
    {
        if (!$this->teachers->contains($teacher)) {
            $this->teachers[] = $teacher;
            $teacher->addClassroom($this);
        }

        return $this;
    }

    public function removeTeacher(Teacher $teacher): self
    {
        if ($this->teachers->removeElement($teacher)) {
            $teacher->removeClassroom($this);
        }

        return $this;
    }

    /**
     * @return Collection|Planning[]
     */
    public function getPlannings(): Collection
    {
        return $this->plannings;
    }

    public function addPlanning(Planning $planning): self
    {
        if (!$this->plannings->contains($planning)) {
            $this->plannings[] = $planning;
            $planning->setClassroom($this);
        }

        return $this;
    }

    public function removePlanning(Planning $planning): self
    {
        if ($this->plannings->removeElement($planning)) {
            // set the owning side to null (unless already changed)
            if ($planning->getClassroom() === $this) {
                $planning->setClassroom(null);
            }
        }

        return $this;
    }

}
