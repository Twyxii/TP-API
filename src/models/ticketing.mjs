import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  idTypeBillet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeBillet',
    required: true
  },
  donneesPersonne: {
    nom: String,
    prenom: String,
    adresse: String
    // Ajoutez d'autres champs selon vos besoins
  },
  dateAchat: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'ticketings',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    const retUpdated = ret;
    retUpdated.id = ret._id;

    delete retUpdated._id;

    return retUpdated;
  }
});

export default Schema;
