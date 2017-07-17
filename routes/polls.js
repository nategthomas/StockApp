var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


var User = require('../models/user');
var Poll = require('../models/poll');




router.get('/', function(req, res) {
  Poll.find()
  .exec(function(err, polls) {
    if (err) {
      return res.status(500).json({
        title: "An error occured",
        error: err
      })
    }
    res.status(200).json({
      title: "polls found!",
      obj: polls
    })
  })
})


router.patch('/vote', function(req, res) {
  var decoded = jwt.decode(req.query.token);
  Poll.findById(req.body.pollid, function(err, poll) {
    if (err) {
      return res.status(500).json({
        title: "poll not found",
        error: err
      })
    }
    if (!poll) {
      return res.status(500).json({
        title: "poll not found",
        error: err
      })
    }
    if (poll.voters.indexOf(decoded.user._id) !== -1) {
      return res.status(500).json({
        title: "User can only vote once",
        error: {message: "Only one submission"}
      })
    }
    var index = req.query.index;
    var votes = poll.votes[index];
    poll.votes[index] = votes + 1;
    poll.markModified('votes');
    poll.voters.push(decoded.user._id);
    poll.markModified('voters');
    poll.save(function(err, data) {
      if (err) {
        return res.status(500).json({
          title: "poll not found",
          error: err
        })
      }
      res.status(201).json({
        message: 'vote incremented',
        obj: data
      })
    });

  })
})


router.post('/custom', function(req, res) {
  var decoded = jwt.decode(req.query.token);
  Poll.findById(req.body.pollid, function(err, poll) {
    if (err) {
      return res.status(500).json({
        title: "poll not found",
        error: err
      })
    }
    if (!poll) {
      return res.status(500).json({
        title: "poll not found",
        error: err
      })
    }
    if (poll.voters.indexOf(decoded.user._id) !== -1) {
      return res.status(500).json({
        title: "User can only vote once",
        error: {message: "Only one submission"}
      })
    }
    var custom = req.query.custom;
    poll.options.push(req.query.custom);
    poll.votes.push(1);
    poll.voters.push(decoded.user._id);
    poll.markModified('options');
    poll.markModified('votes');
    poll.markModified('voters');
    poll.save(function(err, data) {
      if (err) {
        return res.status(500).json({
          title: "poll not found",
          error: err
        })
      }
      res.status(201).json({
        message: 'vote incremented',
        obj: data
      })
    })
  })
})


router.get('/mypoll', function(req, res) {
  Poll.findById(req.query.id, function(err, poll) {
    if (err) {
      return res.status(500).json({
        title: "poll not found",
        error: err
      })
    }
    if (!poll) {
      return res.status(500).json({
        title: "poll not found",
        error: err
      })
    }
    res.status(200).json({
      message: "poll found",
      obj: poll
    })
  })
})


router.use('/', function(req, res, next) {
  jwt.verify(req.query.token, 'secret', function(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'You are not authorized',
        error: err
      })
    }
    next();
  })
})



router.post('/', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: "User not found",
        error: err
      })
    }
    if (!user) {
      return res.status(500).json({
        title: "user not found",
        error: err
      })
    }
    var Votes = [];
    while (Votes.length < req.body.options.length) {
      Votes.push(0);
    }
    var poll = new Poll({
      title: req.body.title,
      options: req.body.options,
      creator: user,
      votes: Votes,
      voters: []
    })
    poll.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: "Poll failed to save",
          error: err
        })
      }
      user.polls.push(result);
      user.save(function(err, data) {
        if (err) {
          return res.status(500).json({
            title: "Poll not saved to user",
            error: err
          })
        }
        res.status(201).json({
          message: "User and poll saved",
          obj: result
        })
      })
    })
  })
})

router.get('/mypolls', function(req, res) {
  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: "an error occured",
        error: err
      })
    }
    if (!user) {
      return res.status(500).json({
        title: "user not found",
        error: err
      })
    }
    polls = user.polls;
    Poll.find()
    .where('_id')
    .in(polls)
    .exec(function(err, Polls) {
      if (err) {
        return res.status(500).json({
          title: 'polls not found',
          error: err
        })
      }
      res.status(200).json({
        message: 'polls found',
        obj: Polls
      })
    })
  })
})


router.delete('/:id', function(req, res) {
  var decoded = jwt.decode(req.query.token);
  Poll.findById(req.params.id, function(err, poll) {
    if (err) {
      return res.status(500).json({
        title: "an error occured",
        error: err
      })
    }

  if (!poll) {
    return res.status(500).json({
    title: "poll not found",
    error: {message: 'poll was not found'}
    })
  }
  if (poll.creator != decoded.user._id) {
    return res.status(401).json({
      title: "Not Authenticated",
      error: {message: 'User not Authenticated'}
    })
  }
  User.findById(decoded.user._id, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: "an error occured",
        error: err
      })
    }
    user.polls.pull(poll);
    user.save();
  })
  poll.remove(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      })
    }
    res.status(200).json({
      message: 'Message deleted',
      obj: result
    })
  })
})
})





module.exports = router;
