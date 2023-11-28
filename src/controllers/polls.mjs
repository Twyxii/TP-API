import PollModel from '../models/poll.mjs';

const Polls = class Polls {
  constructor(app, connect) {
    this.app = app;
    this.PollModel = connect.model('Poll', PollModel);

    this.run();
  }

  deleteById() {
    this.app.delete('/poll/:id', (req, res) => {
      try {
        this.PollModel.findByIdAndDelete(req.params.id).then((poll) => {
          res.status(200).json(poll || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] polls/:id -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  showById() {
    this.app.get('/poll/:id', (req, res) => {
      try {
        this.PollModel.findById(req.params.id).then((poll) => {
          res.status(200).json(poll || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] polls/:id -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  create() {
    this.app.post('/poll/', (req, res) => {
      try {
        const pollModel = new this.PollModel(req.body);

        pollModel.save().then((poll) => {
          res.status(200).json(poll || {});
        }).catch(() => {
          res.status(200).json({});
        });
      } catch (err) {
        console.error(`[ERROR] polls/create -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  updateById() {
    this.app.put('/poll/:id', (req, res) => {
      try {
        this.PollModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        ).then((poll) => {
          if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
          }
          res.status(200).json(poll);
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] polls/update/:id -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
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

export default Polls;
