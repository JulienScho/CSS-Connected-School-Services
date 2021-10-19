# Vich Uploader pour API

## Installation & config

Tout d'abord pour installer le bundle, *mettre **yes** dans la demande d'install de recipe* : `composer require vich/uploader-bundle`

Ensuite aller dans `config/packages/vich_uploader.yaml` 

Mettre `orm` dans le `db_driver`, décommenter la section du bas afin de configurer le dossier ou sera uploadé les documents. Ce qui donnera ceci :
*ne pas oublier de créer le dossier dans `\public\`*

```yaml
# config/packages/vich_uploader.yaml or app/config/config.yml
vich_uploader:
    db_driver: orm
    mappings:
       product_image:
            uri_prefix: /uploads
            upload_destination: '%kernel.project_dir%/public/uploads'
            namer : Vich\UploaderBundle\Naming\UniqidNamer
```

La dernière étape consiste à créer un lien entre le système de fichiers et l'entité que vous souhaitez rendre téléchargeable.

Tout d'abord dans l'Entity souhaitée, il faut annoter la classe avec l'annotation `@Vich\Uploadable`

Ensuite créer deux champs nécéssaires au fonctionnement du bundle :

1. Créer un champ qui sera stocké en string dans la BDD, qui contiendra le nom du fichier, *comme `imageName` par exemple ici ce sera `image`*
2. Créer un autre champ qui stockera l'objet de classe `UploadedFile` après soumission du formulaire, *par exemple `imageFile` qui lui ne sera pas persist à la BDD, mais qui doit être annoté*

L'annotation `UploadableField` a quelques options :

- **mapping**: obligatoire, le nom de mappage spécifié dans la configuration du bundle à utiliser
- **fileNameProperty**: obligatoire, la propriété qui contiendra le nom du fichier uploadé
- **size**: la propriété qui contiendra la taille en octets du fichier uploadé
- **mimeType**: la propriété qui contiendra le type mime du fichier uploadé
- **originalName**: la propriété qui contiendra le nom d'origine du fichier téléchargé
- **dimensions**: la propriété qui contiendra les dimensions du fichier image téléchargé

Rajouter à la mano dans son Entity un variable private qui prendra des paramètres en annotations de Vich, mais qui sera pas une entrée de BDD, comme cité au dessus.
Donc le mapping, pour situer le dossier d'upload, et fileNameProperty, le champ de BDD qui stockera le nom. On peut lier d'autres options, *voir la liste ci-dessus*
Et il faudra modifier légèrement le Setter, qu'il prenne bien le type UploadedFile comme ceci : 

```php
/**
 * @ORM\Entity(repositoryClass=AnnounceRepository::class)
 * @Vich\Uploadable
 */
class Announce
{
    /**
     * @Assert\File(
     *      maxSize = "1M",
     *      maxSizeMessage = "Maximum size allowed : {{ limit }} {{ suffix }}.",
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


	### RESTE DES PROPERTIES ###

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
```

## Formulaire

Créer un formulaire avec `php bin/console make:form` qui sera lié à la même Entity, ici pour moi `ImageType` de cette manière :

```php
<?php

namespace App\Form;

use App\Entity\Announce;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ImageType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('imageFile', FileType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Announce::class,
        ]);
    }
}
```
## Service

Ensuite il va falloir créer un service qui va récupérer le contenu de l'image encodée en Base64, qui va couper en deux le fichier pour enlever une partie du nom afin de le convertir correctement, ensuite décoder le fichier, le définir comme type UploadedFile et le préparer à aller dans le dossier défini.
Créer le Service dans `Src\Service`

```php
<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class UploadedBase64File extends UploadedFile
{
    public function __construct(string $base64Content, string $originalName)
    {
        $filePath = tempnam(sys_get_temp_dir(), 'UploadedFile');
        $data = base64_decode($this->getBase64String($base64Content));
        file_put_contents($filePath, $data);
        $error = null;
        $mimeType = null;
        $test = true;

        parent::__construct($filePath, $originalName, $mimeType, $error, $test);
    }

    private function getBase64String(string $base64Content)
    {
        $data = explode(';base64,', $base64Content);
        return $data[1];
    }

}
```

## La méthode

Récupérer la méthode add/create du Crud de notre API, il va falloir dans un premier temps, sous la méthode, mais avant l'envoi à la BDD, résupérer les datas du json et les décoder grâce à `json_decode`
Mettre une condition si il n'y a pas d'image dans le Json.
Récupérer donc les datas de l'image dans une variable, et les envoyer en deux dans notre service de décodage de Base64, le code Base64 et le nom original.
Créer le formulaire comme on le ferait sur une Twig, et envoyer le fichier décodé et renommé au formulaire.
Ajouter le tout dans le champ Image de notre Entity, grâce à `->setImage`

Puis repartir sur notre méthode d'App habituelle pour perister et flush dans la BDD... Le tour est joué

```php
    /**
     * Can create a new announce
     * 
     * @Route("/", name="add", methods={"POST"})
     * @IsGranted("ROLE_TEACHER")
     *
     * @param Request $request
     * @param SerializerInterface $serializer
     * @param ValidatorInterface $validator
     * @return JsonResponse
     */
    public function add(Request $request, SerializerInterface $serializer, ValidatorInterface $validator)
    {


        // we take back the JSON
        $jsonData = $request->getContent();

        // We transform the json in object
        // First argument : datas to deserialize
        // Second : The type of object we want
        // Last : Start type
        $announce = $serializer->deserialize($jsonData, Announce::class, 'json');

        // We validate the datas stucked in $announce on criterias of annotations' Entity @assert
        $errors = $validator->validate($announce);

        // If the errors array is not empty, we return an error code 400 that is a Bad Request
        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }

        // Decode the json request to get the image part into an array
        $data = json_decode($request->getContent(), true);
        if (isset($data['images'])) {
            // Send it to the Uploader service to cut the code, get a uniq name 
            $imageFile = new UploadedBase64File($data['images']['value'], $data['images']['name']);
            // Create a form dedicated to the images
            $form = $this->createForm(ImageType::class, $announce, ['csrf_protection' => false]);
            // Submit the form and set the image
            $form->submit(['imageFile'=>$imageFile]);
            $announce->setImage($imageFile);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($announce);
        $em->flush();

        return $this->json($announce, 201);
    }
```

Voici un exemple de base pour le JSon de cette méthode :


```json
{
    "title":"Titre",
    "content":"Contenu de notre post",
    "images": {
        "name": "originalName.png",
        "value":"Base64Image Code"
    },
    "category":[1]
}
```