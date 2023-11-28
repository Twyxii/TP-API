import PhotoAlbumModel from '../models/photoAlbum.mjs';

const PhotoAlbums = class PhotoAlbums {
  constructor(app, connect) {
    this.app = app;
    this.PhotoAlbumModel = connect.model('PhotoAlbum', PhotoAlbumModel);

    this.run();
  }

  deleteById() {
    this.app.delete('/photoAlbum/:id', (req, res) => {
      try {
        this.PhotoAlbumModel.findByIdAndDelete(req.params.id).then((photoAlbum) => {
          res.status(200).json(photoAlbum || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] photoAlbums/:id -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  showById() {
    this.app.get('/photoAlbum/:id', (req, res) => {
      try {
        this.PhotoAlbumModel.findById(req.params.id).then((photoAlbum) => {
          res.status(200).json(photoAlbum || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] photoAlbums/:id -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  create() {
    this.app.post('/photoAlbum/', (req, res) => {
      try {
        const photoAlbumModel = new this.PhotoAlbumModel(req.body);

        photoAlbumModel.save().then((photoAlbum) => {
          res.status(200).json(photoAlbum || {});
        }).catch(() => {
          res.status(200).json({});
        });
      } catch (err) {
        console.error(`[ERROR] photoAlbums/create -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  updateById() {
    this.app.put('/photoAlbum/:id', (req, res) => {
      try {
        this.PhotoAlbumModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        ).then((photoAlbum) => {
          if (!photoAlbum) {
            return res.status(404).json({ message: 'PhotoAlbum not found' });
          }
          res.status(200).json(photoAlbum);
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] photoAlbums/update/:id -> ${err}`);
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

export default PhotoAlbums;
