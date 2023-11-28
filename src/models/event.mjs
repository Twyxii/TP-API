import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  nom: String,
  description: String,
  dateDebut: Date,
  dateFin: Date,
  lieu: String,
  photoCouverture: String,
  visibilite: String,
  organisateurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  membres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
  collection: 'events',
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
