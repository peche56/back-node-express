var mongoose = require('mongoose');
mongoose.connect = ('localhost:8080');

const messageSchema = new mongoose.Schema({

  message: {
    type: string
  },
  date: {
    type: Date,
    dafault: new Date()
  }
});

var model = mongoose.model('Message', messageSchema);
export default class Message {

create(request, response) {
                console.log('body', request.body);
                model.create(req.body,
                    (err, search) => {
                        if (err || !message) {
                            console.log('err', err.message);
                            res.status(500).send(err.message);
                        } else {
                            res.json({
                                success: true,
                                search: search
                            });
                        }
                    });
            }
}

// module.exports = Message;
