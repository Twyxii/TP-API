import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: {
    type: String,
    unique: true, // Assure l'unicité des valeurs dans ce champ
    index: true // Crée un index sur ce champ
  },
  mot_de_passe: String
}, {
  collection: 'users',
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
