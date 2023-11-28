import ThreadModel from '../models/thread.mjs';

const Threads = class Threads {
  constructor(app, connect) {
    this.app = app;
    this.ThreadModel = connect.model('Thread', ThreadModel);

    this.run();
  }

  deleteById() {
    this.app.delete('/thread/:id', (req, res) => {
      try {
        this.ThreadModel.findByIdAndDelete(req.params.id).then((thread) => {
          res.status(200).json(thread || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] threads/:id -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  showById() {
    this.app.get('/thread/:id', (req, res) => {
      try {
        this.ThreadModel.findById(req.params.id).then((thread) => {
          res.status(200).json(thread || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] threads/:id -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  create() {
    this.app.post('/thread/', (req, res) => {
      try {
        const threadModel = new this.ThreadModel(req.body);

        threadModel.save().then((thread) => {
          res.status(200).json(thread || {});
        }).catch(() => {
          res.status(200).json({});
        });
      } catch (err) {
        console.error(`[ERROR] threads/create -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  updateById() {
    this.app.put('/thread/:id', (req, res) => {
      try {
        this.ThreadModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        ).then((thread) => {
          if (!thread) {
            return res.status(404).json({ message: 'Thread not found' });
          }
          res.status(200).json(thread);
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] threads/update/:id -> ${err}`);
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

export default Threads;
