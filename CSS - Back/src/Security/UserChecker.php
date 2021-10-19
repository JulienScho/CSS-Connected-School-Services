<?php

namespace App\Security;

use App\Entity\Teacher;
use App\Entity\User as AppUser;
use Symfony\Component\Security\Core\Exception\AccountExpiredException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAccountStatusException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserChecker implements UserCheckerInterface
{
    public function checkPreAuth(UserInterface $user): void
    {
        if (!$user instanceof AppUser || !$user instanceof Teacher ) {
            return;
        }
        // Verification of the activation Token in the DB
        // If the token is still here, so the account is still not activate, and you cannot connect with it
        if (!$user->getActivationToken() == null) {
        // the message passed to this exception is meant to be displayed to the user
            throw new CustomUserMessageAccountStatusException('Votre compte doit être activé par mail');
        }
    }

    public function checkPostAuth(UserInterface $user): void
    {
        if (!$user instanceof AppUser) {
            return;
        }
        // user account is expired, the user may be notified
        // if ($user->isExpired()) {
        // throw new AccountExpiredException('...');
        // }
    }
}