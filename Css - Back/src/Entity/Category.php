<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
 */
class Category
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({ "announce", "category"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({ "announce", "category"})
     */
    private $name;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"category"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     * @Groups({"category"})
     */
    private $updatedAt;

    /**
     * @ORM\ManyToMany(targetEntity=Announce::class, mappedBy="category")
     * 
     */
    private $announces;

    public function __construct()
    {
        $this->announces = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    public function __toString()
    {
    return $this->name;
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
     * @return Collection|Announce[]
     */
    public function getAnnounces(): Collection
    {
        return $this->announces;
    }

    public function addAnnounce(Announce $announce): self
    {
        if (!$this->announces->contains($announce)) {
            $this->announces[] = $announce;
            $announce->addCategory($this);
        }

        return $this;
    }

    public function removeAnnounce(Announce $announce): self
    {
        if ($this->announces->removeElement($announce)) {
            $announce->removeCategory($this);
        }

        return $this;
    }
}
