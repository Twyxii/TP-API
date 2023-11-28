import TicketModel from '../models/ticket.mjs';

const TicketsController = class TicketsController {
  constructor(app, connect) {
    this.app = app;
    this.TicketModel = connect.model('Ticket', TicketModel);

    this.run();
  }

  deleteById() {
    this.app.delete('/ticket/:id', async (req, res) => {
      try {
        const ticket = await this.TicketModel.findByIdAndDelete(req.params.id);
        res.status(200).json(ticket || {});
      } catch (error) {
        console.error(`[ERROR] tickets/:id -> ${error}`);
        res.status(500).json({
          code: 500,
          message: 'Internal Server error'
        });
      }
    });
  }

  showById() {
    this.app.get('/ticket/:id', async (req, res) => {
      try {
        const ticket = await this.TicketModel.findById(req.params.id);
        res.status(200).json(ticket || {});
      } catch (error) {
        console.error(`[ERROR] tickets/:id -> ${error}`);
        res.status(500).json({
          code: 500,
          message: 'Internal Server error'
        });
      }
    });
  }

  create() {
    this.app.post('/ticket/', async (req, res) => {
      try {
        const ticketModel = new this.TicketModel(req.body);
        const ticket = await ticketModel.save();
        res.status(200).json(ticket || {});
      } catch (error) {
        console.error(`[ERROR] tickets/create -> ${error}`);
        res.status(500).json({
          code: 500,
          message: 'Internal Server error'
        });
      }
    });
  }

  updateById() {
    this.app.put('/ticket/:id', async (req, res) => {
      try {
        const ticket = await this.TicketModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        if (!ticket) {
          return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
      } catch (error) {
        console.error(`[ERROR] tickets/update/:id -> ${error}`);
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

export default TicketsController;
