use Facebook

db.createCollection("Événements", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["nom", "description", "dateDebut", "dateFin", "lieu", "photoCouverture", "visibilite", "organisateurs", "membres"],
         properties: {
            nom: {
               bsonType: "string",
               description: "Nom de l'événement"
            },
            description: {
               bsonType: "string",
               description: "Description de l'événement"
            },
            dateDebut: {
               bsonType: "date",
               description: "Date de début de l'événement"
            },
            dateFin: {
               bsonType: "date",
               description: "Date de fin de l'événement"
            },
            lieu: {
               bsonType: "string",
               description: "Lieu de l'événement"
            },
            photoCouverture: {
               bsonType: "string",
               description: "URL de la photo de couverture de l'événement"
            },
            visibilite: {
               bsonType: "string",
               description: "Visibilité de l'événement (public ou privé)"
            },
            organisateurs: {
               bsonType: "array",
               description: "Tableau des ID des organisateurs",
               items: {
                  bsonType: "objectId"
               }
            },
            membres: {
               bsonType: "array",
               description: "Tableau des ID des membres",
               items: {
                  bsonType: "objectId"
               }
            }
         }
      }
   }
})



use Facebook

db.createCollection("Groupes", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["nom", "description", "icone", "photoCouverture", "typeGroupe", "autoriserPublication", "autoriserCreationEvenements", "membres"],
         properties: {
            nom: {
               bsonType: "string",
               description: "Nom du groupe"
            },
            description: {
               bsonType: "string",
               description: "Description du groupe"
            },
            icone: {
               bsonType: "string",
               description: "URL de l'icône du groupe"
            },
            photoCouverture: {
               bsonType: "string",
               description: "URL de la photo de couverture du groupe"
            },
            typeGroupe: {
               bsonType: "string",
               description: "Type de groupe (public, privé, secret)"
            },
            autoriserPublication: {
               bsonType: "bool",
               description: "Autoriser les membres à publier dans le groupe"
            },
            autoriserCreationEvenements: {
               bsonType: "bool",
               description: "Autoriser les membres à créer des événements dans le groupe"
            },
            membres: {
               bsonType: "array",
               description: "Tableau des ID des membres",
               items: {
                  bsonType: "objectId"
               }
            }
         }
      }
   }
})

// Utilisateurs

use Facebook

db.createCollection("Utilisateurs", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["nom", "prenom", "email", "mot_de_passe"],
         properties: {
            nom: {
               bsonType: "string",
               description: "Nom de l'utilisateur"
            },
            prenom: {
               bsonType: "string",
               description: "Prénom de l'utilisateur"
            },
            email: {
               bsonType: "string",
               description: "Email de l'utilisateur"
            },
            mot_de_passe: {
               bsonType: "string",
               description: "Mot de passe de l'utilisateur"
            }
         }
      }
   }
})



// CRUD Utilisateurs 
use Facebook

db.Utilisateurs.insertMany([
   {
      nom: "NomUtilisateur1",
      prenom: "PrenomUtilisateur1",
      email: "utilisateur1@example.com",
      mot_de_passe: "motdepasse123"
   },
   {
      nom: "NomUtilisateur2",
      prenom: "PrenomUtilisateur2",
      email: "utilisateur2@example.com",
      mot_de_passe: "motdepasse456"
   },
   // Ajoutez d'autres utilisateurs au besoin
])


// Ajout d'un index unique sur le champ "email"
db.Utilisateurs.createIndex({ "email": 1 }, { unique: true })


// Lire tous les utilisateurs
db.Utilisateurs.find()



// Mise à jour de l'email d'un utilisateur
db.Utilisateurs.updateOne(
   { "nom": "NomUtilisateur" },
   { $set: { "email": "nouvel_email@example.com" } }
)


// Suppression d'un utilisateur par email
db.Utilisateurs.deleteOne({ "email": "utilisateur@example.com" })



// Evènement CRUDS

use Facebook

db.createCollection("Événements", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["nom", "description", "dateDebut", "dateFin", "lieu", "organisateurs", "participants"],
         properties: {
            nom: {
               bsonType: "string",
               description: "Nom de l'événement"
            },
            description: {
               bsonType: "string",
               description: "Description de l'événement"
            },
            dateDebut: {
               bsonType: "date",
               description: "Date de début de l'événement"
            },
            dateFin: {
               bsonType: "date",
               description: "Date de fin de l'événement"
            },
            lieu: {
               bsonType: "string",
               description: "Lieu de l'événement"
            },
            organisateurs: {
               bsonType: "array",
               description: "Tableau des ID des organisateurs",
               items: {
                  bsonType: "objectId"
               }
            },
            participants: {
               bsonType: "array",
               description: "Tableau des ID des participants",
               items: {
                  bsonType: "objectId"
               }
            }
         }
      }
   }
})

// Insertion d'un événement
db.Événements.insertOne({
   nom: "NomÉvénement",
   description: "Description de l'événement",
   dateDebut: ISODate("2023-01-01T00:00:00Z"),
   dateFin: ISODate("2023-01-02T00:00:00Z"),
   lieu: "Lieu de l'événement",
   organisateurs: [ObjectId("id_organisateur_1"), ObjectId("id_organisateur_2")],
   participants: [ObjectId("id_participant_1"), ObjectId("id_participant_2")]
})


// Lire tous les événements
db.Événements.find()


// Mise à jour des participants d'un événement
db.Événements.updateOne(
   { "nom": "NomÉvénement" },
   { $set: { "participants": [ObjectId("nouvel_id_participant_1"), ObjectId("nouvel_id_participant_2")] } }
)


// Suppression d'un événement par son nom
db.Événements.deleteOne({ "nom": "NomÉvénement" })




// GROUPES

use Facebook

db.createCollection("Groupes", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["nom", "description", "icone", "photoCouverture", "typeGroupe", "autoriserPublication", "autoriserCreationEvenements", "administrateurs", "membres"],
         properties: {
            nom: {
               bsonType: "string",
               description: "Nom du groupe"
            },
            description: {
               bsonType: "string",
               description: "Description du groupe"
            },
            icone: {
               bsonType: "string",
               description: "URL de l'icône du groupe"
            },
            photoCouverture: {
               bsonType: "string",
               description: "URL de la photo de couverture du groupe"
            },
            typeGroupe: {
               bsonType: "string",
               description: "Type de groupe (public, privé, secret)"
            },
            autoriserPublication: {
               bsonType: "bool",
               description: "Autoriser les membres à publier dans le groupe"
            },
            autoriserCreationEvenements: {
               bsonType: "bool",
               description: "Autoriser les membres à créer des événements dans le groupe"
            },
            administrateurs: {
               bsonType: "array",
               description: "Tableau des ID des administrateurs",
               items: {
                  bsonType: "objectId"
               }
            },
            membres: {
               bsonType: "array",
               description: "Tableau des ID des membres",
               items: {
                  bsonType: "objectId"
               }
            }
         }
      }
   }
})


CRUD Groupes

// Insertion d'un groupe
db.Groupes.insertOne({
   nom: "NomGroupe",
   description: "Description du groupe",
   icone: "URL de l'icône du groupe",
   photoCouverture: "URL de la photo de couverture du groupe",
   typeGroupe: "public",
   autoriserPublication: true,
   autoriserCreationEvenements: true,
   administrateurs: [ObjectId("id_administrateur_1"), ObjectId("id_administrateur_2")],
   membres: [ObjectId("id_membre_1"), ObjectId("id_membre_2")]
})


// Lire tous les groupes
db.Groupes.find()


// Mise à jour des membres d'un groupe
db.Groupes.updateOne(
   { "nom": "NomGroupe" },
   { $set: { "membres": [ObjectId("nouvel_id_membre_1"), ObjectId("nouvel_id_membre_2")] } }
)



// Suppression d'un groupe par son nom
db.Groupes.deleteOne({ "nom": "NomGroupe" })



// Discussion

use Facebook

db.createCollection("FilsDeDiscussion", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["titre", "typeParent", "idParent", "messages"],
         properties: {
            titre: {
               bsonType: "string",
               description: "Titre du fil de discussion"
            },
            typeParent: {
               bsonType: "string",
               enum: ["groupe", "evenement"],
               description: "Type du parent (groupe ou evenement)"
            },
            idParent: {
               bsonType: "objectId",
               description: "ID du parent (groupe ou evenement)"
            },
            messages: {
               bsonType: "array",
               description: "Tableau des messages dans le fil de discussion",
               items: {
                  bsonType: "object",
                  required: ["auteur", "contenu", "commentaires"],
                  properties: {
                     auteur: {
                        bsonType: "objectId",
                        description: "ID de l'auteur du message"
                     },
                     contenu: {
                        bsonType: "string",
                        description: "Contenu du message"
                     },
                     commentaires: {
                        bsonType: "array",
                        description: "Tableau des commentaires sur le message",
                        items: {
                           bsonType: "object",
                           required: ["auteur", "contenu"],
                           properties: {
                              auteur: {
                                 bsonType: "objectId",
                                 description: "ID de l'auteur du commentaire"
                              },
                              contenu: {
                                 bsonType: "string",
                                 description: "Contenu du commentaire"
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
      }
   }
})


// CRUD Discussion

// Insertion d'un fil de discussion
db.FilsDeDiscussion.insertOne({
   titre: "TitreDiscussion",
   typeParent: "groupe", // ou "evenement"
   idParent: ObjectId("id_groupe_ou_evenement"),
   messages: [
      {
         auteur: ObjectId("id_auteur_message_1"),
         contenu: "Contenu du message 1",
         commentaires: [
            {
               auteur: ObjectId("id_auteur_commentaire_1"),
               contenu: "Contenu du commentaire 1"
            },
            // Ajoutez d'autres commentaires si nécessaire
         ]
      },
      // Ajoutez d'autres messages si nécessaire
   ]
})


// Lire tous les fils de discussion
db.FilsDeDiscussion.find()

// Mise à jour du contenu d'un message
db.FilsDeDiscussion.updateOne(
   { "titre": "TitreDiscussion", "messages.auteur": ObjectId("id_auteur_message_1") },
   { $set: { "messages.$.contenu": "Nouveau contenu du message 1" } }
)


// Suppression d'un fil de discussion par son titre
db.FilsDeDiscussion.deleteOne({ "titre": "TitreDiscussion" })



// Albumphoto

use Facebook

db.createCollection("AlbumsPhoto", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["nom", "idEvenement", "photos"],
         properties: {
            nom: {
               bsonType: "string",
               description: "Nom de l'album photo"
            },
            idEvenement: {
               bsonType: "objectId",
               description: "ID de l'événement associé à l'album photo"
            },
            photos: {
               bsonType: "array",
               description: "Tableau des photos dans l'album",
               items: {
                  bsonType: "object",
                  required: ["idParticipant", "url", "commentaires"],
                  properties: {
                     idParticipant: {
                        bsonType: "objectId",
                        description: "ID du participant qui a posté la photo"
                     },
                     url: {
                        bsonType: "string",
                        description: "URL de la photo"
                     },
                     commentaires: {
                        bsonType: "array",
                        description: "Tableau des commentaires sur la photo",
                        items: {
                           bsonType: "object",
                           required: ["idParticipant", "contenu"],
                           properties: {
                              idParticipant: {
                                 bsonType: "objectId",
                                 description: "ID du participant qui a commenté la photo"
                              },
                              contenu: {
                                 bsonType: "string",
                                 description: "Contenu du commentaire"
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
      }
   }
})



// CRUD Album

// Insertion d'un album photo
db.AlbumsPhoto.insertOne({
   nom: "AlbumVacances",
   idEvenement: ObjectId("id_evenement_associe"),
   photos: [
      {
         idParticipant: ObjectId("id_participant_1"),
         url: "URL_Photo_1",
         commentaires: [
            {
               idParticipant: ObjectId("id_participant_commentaire_1"),
               contenu: "Super photo !"
            },
            // Ajoutez d'autres commentaires si nécessaire
         ]
      },
      // Ajoutez d'autres photos si nécessaire
   ]
})


// Lire tous les albums photo
db.AlbumsPhoto.find()


// Mise à jour du contenu d'un commentaire sur une photo
db.AlbumsPhoto.updateOne(
   { "nom": "AlbumVacances", "photos.commentaires.idParticipant": ObjectId("id_participant_commentaire_1") },
   { $set: { "photos.$[photo].commentaires.$[commentaire].contenu": "Nouveau commentaire" } },
   { arrayFilters: [{ "photo.idParticipant": ObjectId("id_participant_1") }, { "commentaire.idParticipant": ObjectId("id_participant_commentaire_1") }] }
)


// Suppression d'un album photo par son nom
db.AlbumsPhoto.deleteOne({ "nom": "AlbumVacances" })


// SONDAGE

use Facebook

db.createCollection("Sondages", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["idEvenement", "organisateur", "questions"],
         properties: {
            idEvenement: {
               bsonType: "objectId",
               description: "ID de l'événement associé au sondage"
            },
            organisateur: {
               bsonType: "objectId",
               description: "ID de l'organisateur du sondage"
            },
            questions: {
               bsonType: "array",
               description: "Tableau des questions dans le sondage",
               items: {
                  bsonType: "object",
                  required: ["texte", "reponses"],
                  properties: {
                     texte: {
                        bsonType: "string",
                        description: "Texte de la question"
                     },
                     reponses: {
                        bsonType: "array",
                        description: "Tableau des réponses possibles",
                        items: {
                           bsonType: "object",
                           required: ["texte"],
                           properties: {
                              texte: {
                                 bsonType: "string",
                                 description: "Texte de la réponse"
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
      }
   }
})


// CRUD SONDAGE

// Insertion d'un sondage
db.Sondages.insertOne({
   idEvenement: ObjectId("id_evenement_associe"),
   organisateur: ObjectId("id_organisateur"),
   questions: [
      {
         texte: "Quelle est votre couleur préférée ?",
         reponses: [
            { texte: "Bleu" },
            { texte: "Rouge" },
            { texte: "Vert" }
         ]
      },
      // Ajoutez d'autres questions si nécessaire
   ]
})


// Lire tous les sondages
db.Sondages.find()


// Mise à jour du texte d'une question
db.Sondages.updateOne(
   { "idEvenement": ObjectId("id_evenement_associe"), "questions.texte": "Quelle est votre couleur préférée ?" },
   { $set: { "questions.$.texte": "Quelle est votre nouvelle couleur préférée ?" } }
)


// Suppression d'un sondage par l'ID de l'événement associé
db.Sondages.deleteOne({ "idEvenement": ObjectId("id_evenement_associe") })


// réponses sondages 

use Facebook

db.createCollection("ReponsesSondages", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["idSondage", "idParticipant", "reponses"],
         properties: {
            idSondage: {
               bsonType: "objectId",
               description: "ID du sondage auquel la réponse est associée"
            },
            idParticipant: {
               bsonType: "objectId",
               description: "ID du participant qui répond au sondage"
            },
            reponses: {
               bsonType: "array",
               description: "Tableau des réponses du participant",
               items: {
                  bsonType: "object",
                  required: ["idQuestion", "idReponse"],
                  properties: {
                     idQuestion: {
                        bsonType: "objectId",
                        description: "ID de la question à laquelle le participant répond"
                     },
                     idReponse: {
                        bsonType: "objectId",
                        description: "ID de la réponse choisie par le participant"
                     }
                  }
               }
            }
         }
      }
   }
})


// Billeterie



use Facebook

db.createCollection("Billets", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["idTypeBillet", "donneesPersonne", "dateAchat"],
         properties: {
            idTypeBillet: {
               bsonType: "objectId",
               description: "ID du type de billet associé"
            },
            donneesPersonne: {
               bsonType: "object",
               required: ["nom", "prenom", "adresse"],
               properties: {
                  nom: {
                     bsonType: "string",
                     description: "Nom de la personne"
                  },
                  prenom: {
                     bsonType: "string",
                     description: "Prénom de la personne"
                  },
                  adresse: {
                     bsonType: "string",
                     description: "Adresse complète de la personne"
                  }
               }
            },
            dateAchat: {
               bsonType: "date",
               description: "Date d'achat du billet"
            }
         }
      }
   }
})


// Insertion d'un type de billet
db.TypesBillets.insertOne({
   nom: "Billet VIP",
   montant: 100.0,
   quantiteLimitee: 50
})

// Lire tous les types de billets
db.TypesBillets.find()

// Mise à jour du montant d'un type de billet
db.TypesBillets.updateOne(
   { "nom": "Billet VIP" },
   { $set: { "montant": 120.0 } }
)


// Suppression d'un type de billet par son nom
db.TypesBillets.deleteOne({ "nom": "Billet VIP" })


// Billets 

// Insertion d'un billet
db.Billets.insertOne({
   idTypeBillet: ObjectId("id_type_billet_associe"),
   donneesPersonne: {
      nom: "Doe",
      prenom: "John",
      adresse: "123 Rue Principale, Ville"
   },
   dateAchat: new Date()
})


// Lire tous les billets
db.Billets.find()

// Mise à jour de l'adresse d'un billet
db.Billets.updateOne(
   { "_id": ObjectId("id_billet_a_mettre_a_jour") },
   { $set: { "donneesPersonne.adresse": "Nouvelle adresse" } }
)


// Suppression d'un billet par son ID
db.Billets.deleteOne({ "_id": ObjectId("id_billet_a_supprimer") })











