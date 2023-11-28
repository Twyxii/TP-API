import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  nom: String,
  idEvent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evenement',
    required: true
  },
  photos: [{
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    url: String,
    commentaires: [{
      participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      texte: String,
      dateCreation: {
        type: Date,
        default: Date.now
      }
    }],
    dateCreation: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  collection: 'photoAlbums',
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
