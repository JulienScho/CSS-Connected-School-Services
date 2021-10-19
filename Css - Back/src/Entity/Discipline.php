<?php

namespace App\Entity;

use App\Repository\DisciplineRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=DisciplineRepository::class)
 */
class Discipline
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"lesson", "discipline", "planning", "note", "teacher"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"lesson", "discipline", "planning", "note", "teacher"})
     */
    private $name;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"discipline"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     * @Groups({"discipline"})
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity=Planning::class, mappedBy="discipline")
     */
    private $planning;

    /**
     * @ORM\OneToMany(targetEntity=Note::class, mappedBy="discipline")
     */
    private $note;

    /**
     * @ORM\OneToMany(targetEntity=Teacher::class, mappedBy="discipline")
     */
    private $teacher;

    /**
     * @ORM\OneToMany(targetEntity=Lesson::class, mappedBy="discipline")
     */
    private $lesson;

    /**
     * @ORM\OneToMany(targetEntity=Teacher::class, mappedBy="discipline")
     */
    private $teachers;

    public function __construct()
    {
        $this->planning = new ArrayCollection();
        $this->note = new ArrayCollection();
        $this->teacher = new ArrayCollection();
        $this->lesson = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->teachers = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->getName();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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
     * @return Collection|Planning[]
     */
    public function getPlanning(): Collection
    {
        return $this->planning;
    }

    public function addPlanning(Planning $planning): self
    {
        if (!$this->planning->contains($planning)) {
            $this->planning[] = $planning;
            $planning->setDiscipline($this);
        }

        return $this;
    }

    public function removePlanning(Planning $planning): self
    {
        if ($this->planning->removeElement($planning)) {
            // set the owning side to null (unless already changed)
            if ($planning->getDiscipline() === $this) {
                $planning->setDiscipline(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Note[]
     */
    public function getNote(): Collection
    {
        return $this->note;
    }

    public function addNote(Note $note): self
    {
        if (!$this->note->contains($note)) {
            $this->note[] = $note;
            $note->setDiscipline($this);
        }

        return $this;
    }

    public function removeNote(Note $note): self
    {
        if ($this->note->removeElement($note)) {
            // set the owning side to null (unless already changed)
            if ($note->getDiscipline() === $this) {
                $note->setDiscipline(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Teacher[]
     */
    public function getTeacher(): Collection
    {
        return $this->teacher;
    }

    public function addTeacher(Teacher $teacher): self
    {
        if (!$this->teacher->contains($teacher)) {
            $this->teacher[] = $teacher;
            $teacher->setDiscipline($this);
        }

        return $this;
    }

    public function removeTeacher(Teacher $teacher): self
    {
        if ($this->teacher->removeElement($teacher)) {
            // set the owning side to null (unless already changed)
            if ($teacher->getDiscipline() === $this) {
                $teacher->setDiscipline(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Lesson[]
     */
    public function getLesson(): Collection
    {
        return $this->lesson;
    }

    public function addLesson(Lesson $lesson): self
    {
        if (!$this->lesson->contains($lesson)) {
            $this->lesson[] = $lesson;
            $lesson->setDiscipline($this);
        }

        return $this;
    }

    public function removeLesson(Lesson $lesson): self
    {
        if ($this->lesson->removeElement($lesson)) {
            // set the owning side to null (unless already changed)
            if ($lesson->getDiscipline() === $this) {
                $lesson->setDiscipline(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Teacher[]
     */
    public function getTeachers(): Collection
    {
        return $this->teachers;
    }
}
