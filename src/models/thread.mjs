import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  titre: String,
  typeParent: {
    type: String,
    enum: ['group', 'event'], // Permet de spécifier les types valides (groupe ou événement)
    required: true
  },
  idParent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'typeParent' // Dynamiquement référencer le modèle en fonction du typeParent
  },
  messages: [{
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    texte: String,
    dateCreation: {
      type: Date,
      default: Date.now
    },
    commentaires: [{
      utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      texte: String,
      dateCreation: {
        type: Date,
        default: Date.now
      }
    }]
  }]
}, {
  collection: 'threads',
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
