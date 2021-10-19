<?php

namespace App\Entity;

use App\Repository\AnnounceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=AnnounceRepository::class)
 * @Vich\Uploadable
 */
class Announce
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"announce"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"announce"})
     * @Assert\NotBlank(message="Ajouter un titre")
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"announce"})
     */
    private $content;

    /**
     * @Assert\File(
     *      maxSize = "1M",
     *      maxSizeMessage = "Taille maximale autorisée : {{ limit }} {{ suffix }}.",
     *      mimeTypes = {"image/png", "image/jpg", "image/jpeg"},
     *      mimeTypesMessage = "Formats autorisés : png, jpg, jpeg."
     * )
     * @Vich\UploadableField(mapping="product_image", fileNameProperty="image")
     *
     * @var File|null
     */
    private $imageFile;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"announce"})
     */
    private $image;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"announce"})
     */
    private $homework;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"announce"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     * @Groups({"announce"})
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     * @Groups({"announce"})
     */
    private $expireAt;

    /**
     * @ORM\ManyToMany(targetEntity=Category::class, inversedBy="announces")
     * @Groups({"announce"})
     */
    private $category;

    /**
     * @ORM\ManyToMany(targetEntity=Classroom::class, mappedBy="announce")
     * @Groups({"announce"})
     */
    private $classrooms;

    /**
     * @ORM\ManyToOne(targetEntity=Teacher::class, inversedBy="announces")
     */
    private $teacher;

    public function __construct()
    {
        $this->category = new ArrayCollection();
        $this->classrooms = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getHomework(): ?string
    {
        return $this->homework;
    }

    public function setHomework(?string $homework): self
    {
        $this->homework = $homework;

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

    public function getExpireAt(): ?\DateTimeImmutable
    {
        return $this->expireAt;
    }

    public function setExpireAt(?\DateTimeImmutable $expireAt): self
    {
        $this->expireAt = $expireAt;

        return $this;
    }

    /**
     * @return Collection|Category[]
     */
    public function getCategory(): Collection
    {
        return $this->category;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->category->contains($category)) {
            $this->category[] = $category;
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        $this->category->removeElement($category);

        return $this;
    }

    /**
     * @return Collection|Classroom[]
     */
    public function getClassrooms(): Collection
    {
        return $this->classrooms;
    }

    public function addClassroom(Classroom $classroom): self
    {
        if (!$this->classrooms->contains($classroom)) {
            $this->classrooms[] = $classroom;
            $classroom->addAnnounce($this);
        }

        return $this;
    }

    public function removeClassroom(Classroom $classroom): self
    {
        if ($this->classrooms->removeElement($classroom)) {
            $classroom->removeAnnounce($this);
        }

        return $this;
    }

    /**
     * Get the value of imageFile
     *
     * @return  File|null
     */
    public function getImageFile()
    {
        return $this->imageFile;
    }

    /**
     * Set the value of imageFile
     *
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile|null $imageFile 
     *
     * 
     */
    public function setImageFile($imageFile)
    {
        $this->imageFile = $imageFile;

        if (null !== $imageFile) {
             // Il est nécessaire qu'au moins un champ change si vous utilisez doctrine 
            // sinon les écouteurs d'événement ne seront pas appelés et le fichier est perdu 
            $this->updatedAt = new \DateTimeImmutable();
        }
    }

    public function getTeacher(): ?Teacher
    {
        return $this->teacher;
    }

    public function setTeacher(?Teacher $teacher): self
    {
        $this->teacher = $teacher;

        return $this;
    }

}
