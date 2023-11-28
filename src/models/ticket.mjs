// ticket.mjs
import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Type de billet (ex. VIP, Standard, etc.)
  organizerData: {
    // Données de l'organisateur
    // Ajoutez d'autres champs si nécessaire
    name: { type: String }
    // ...
  },
  personData: {
    // Données de la personne
    // Ajoutez d'autres champs si nécessaire
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String }
    // ...
  },
  purchaseDate: { type: Date, default: Date.now }
});

const TicketModel = mongoose.model('Ticket', ticketSchema);

export default TicketModel;
