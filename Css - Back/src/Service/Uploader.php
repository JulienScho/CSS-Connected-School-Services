<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\String\Slugger\SluggerInterface;

class Uploader
{
    private $slugger;

    public function __construct(SluggerInterface $slugger)
    {
        $this->slugger = $slugger;
    }

    public function upload($form, $fieldName)
    {
        /** @var UploadedFile $uploadFile */
        $uploadFile = $form->get($fieldName)->getData();

        if ($uploadFile) {
            // We get the name of the file
            $originalFilename = pathinfo($uploadFile->getClientOriginalName(), PATHINFO_FILENAME);

            // this is needed to safely include the file name as part of the URL
            // We get the file name clean for safety, according the SluggerInterface Service
            $safeFilename = $this->slugger->slug($originalFilename);

            // To avoid that 2 users upload 2 files withthe same name, and to not overwrite someone's else file, we will rename our files with a uniq suffix.
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $uploadFile->guessExtension();

            try {
            // We move the file in the public asset
                $uploadFile->move('uploads', $newFilename);

                //  we return the new file
                return $newFilename;
            } catch (FileException $e) {
                // If it gets wrong, we can send a mail to the admin
            }

            return false;
        }
    }

            // $announce = new Announce();
        // $form = $this->createForm(AnnounceType::class, $announce);
        // $form->handleRequest($request);

        // $newImage = $uploader->upload($form, 'imgBrut');

        // if($newImage){
        //     $announce->setImage($newImage);
        // }
}