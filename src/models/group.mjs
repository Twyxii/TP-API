import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  nom: String,
  description: String,
  icone: String,
  photoCouverture: String,
  typeGroupe: String,
  autoriserPublication: Boolean,
  autoriserCreationEvenements: Boolean,
  membres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  administrateurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
  collection: 'groups',
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
