<?php

namespace App\Security\Voter;

use App\Entity\Announce;
use App\Entity\Teacher;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class TeacherVoter extends Voter
{
    private $security;

    // Construc the Security to get the current user
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    // Declare the constant of the methods we want vote to
    const EDIT = 'edit';
    const DELETE = 'delete';

    protected function supports(string $attribute, $subject): bool
    {
        return in_array($attribute, [self::EDIT, self::DELETE])
            && $subject instanceof Announce;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // If the user is the Admin, always allow access
        if ($this->security->isGranted('ROLE_ADMIN')) {
            return true;
        }
        
        /**@var Announce $post */
        $post = $subject;

        // we check if the announce has a creator
        if(null === $post->getTeacher()) return false;

        // check conditions and return true to grant permission
        switch ($attribute) {
            case self::EDIT:
                return $this->canEdit($post, $user);
                break;
            case self::DELETE:
                return $this->canDelete($post, $user);
                break;
        }
        return false;
    }

    // Check if we are the owner of the announce
    // If true, we can edit or delete it

    private function canEdit(Announce $post, $user)
    {
        return $user === $post->getTeacher();
    }
    
    private function canDelete(Announce $post, $user)
    {
        return $user === $post->getTeacher(); 
    }
}
