import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  idEvent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evenement',
    required: true
  },
  organisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sondages: [{
    questions: [{
      texte: String,
      choix: [{
        texte: String
        // Vous pouvez ajouter d'autres propriétés ici selon vos besoins
      }]
      // Vous pouvez ajouter d'autres propriétés ici selon vos besoins
    }]
    // Vous pouvez ajouter d'autres propriétés ici selon vos besoins
  }]
}, {
  collection: 'polls',
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
