import GroupModel from '../models/group.mjs';

const Groups = class Groups {
  constructor(app, connect) {
    this.app = app;
    this.GroupModel = connect.model('Group', GroupModel);

    this.run();
  }

  deleteById() {
    this.app.delete('/group/:id', (req, res) => {
      try {
        this.GroupModel.findByIdAndDelete(req.params.id).then((group) => {
          res.status(200).json(group || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] groups/:id -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  showById() {
    this.app.get('/group/:id', (req, res) => {
      try {
        this.GroupModel.findById(req.params.id).then((group) => {
          res.status(200).json(group || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] groups/:id -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  create() {
    this.app.post('/group/', (req, res) => {
      try {
        const groupModel = new this.GroupModel(req.body);

        groupModel.save().then((group) => {
          res.status(200).json(group || {});
        }).catch(() => {
          res.status(200).json({});
        });
      } catch (err) {
        console.error(`[ERROR] groups/create -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }
  updateById() {
    this.app.put('/group/:id', (req, res) => {
      try {
        this.GroupModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        ).then((group) => {
          if (!group) {
            return res.status(404).json({ message: 'Group not found' });
          }
          res.status(200).json(group);
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] groups/update/:id -> ${err}`);
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

export default Groups;
