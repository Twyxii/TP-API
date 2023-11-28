import EventModel from '../models/event.mjs';
import TicketingModel from '../models/ticketing.mjs';
import TicketModel from '../models/ticket.mjs';

const EventsController = class EventsController {
  constructor(app, connect) {
    this.app = app;
    this.EventModel = connect.model('Event', EventModel);
    this.TicketingModel = connect.model('Ticketing', TicketingModel);
    this.TicketModel = connect.model('Ticket', TicketModel);

    this.run();
  }

  deleteById() {
    this.app.delete('/event/:id', async (req, res) => {
      try {
        const event = await this.EventModel.findByIdAndDelete(req.params.id);
        res.status(200).json(event || {});
      } catch (error) {
        console.error(`[ERROR] events/:id -> ${error}`);
        res.status(500).json({
          code: 500,
          message: 'Internal Server error'
        });
      }
    });
  }

  showById() {
    this.app.get('/event/:id', async (req, res) => {
      try {
        const event = await this.EventModel
          .findById(req.params.id)
          .populate({
            path: 'ticketing',
            model: 'Ticketing',
            populate: {
              path: 'tickets',
              model: 'Ticket'
            }
          });

        res.status(200).json(event || {});
      } catch (error) {
        console.error(`[ERROR] events/:id -> ${error}`);
        res.status(500).json({
          code: 500,
          message: 'Internal Server error'
        });
      }
    });
  }

  create() {
    this.app.post('/event/', async (req, res) => {
      try {
        const { eventDetails, ticketsDetails } = req.body;

        // Créer des tickets
        const tickets = await this.TicketModel.create(ticketsDetails);

        // Créer une ticketing avec les tickets
        const ticketing = await this.TicketingModel.create({ tickets });

        // Créer un event lié à la ticketing
        const event = await this.EventModel.create({ ...eventDetails, ticketing: ticketing._id });

        res.status(200).json(event || {});
      } catch (error) {
        console.error(`[ERROR] events/create -> ${error}`);
        res.status(500).json({
          code: 500,
          message: 'Internal Server error'
        });
      }
    });
  }

  updateById() {
    this.app.put('/event/:id', async (req, res) => {
      try {
        const event = await this.EventModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        ).populate({
          path: 'ticketing',
          model: 'Ticketing',
          populate: {
            path: 'tickets',
            model: 'Ticket'
          }
        });

        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
      } catch (error) {
        console.error(`[ERROR] events/update/:id -> ${error}`);
        res.status(500).json({
          code: 500,
          message: 'Internal Server error'
        });
      }
    });
  }

  run() {
    this.create();
    this.showById();
    this.deleteById();
    this.updateById();
  }
};

export default EventsController;
