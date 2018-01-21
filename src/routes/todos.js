const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

router.get('/', (req, res) => {
	Todo.find({}, { __v: 0 }, { lean: true }, (err, todos) => {
		if (err) res.status(400).json(err);
		res.json({todos});
	});
});

router.post('/', (req, res) => {
	const task = new Todo({ text: req.body.text, completed: false });
	task.save((err, todo) => {
		if (err) res.status(400).json(err);
		else res.json({ todo });
	});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	Todo.findByIdAndRemove(id, { lean: true })
		.then(
			() => res.json('Deleted')
		)
		.catch(
			err => res.json(err)
		);
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	Todo.findByIdAndUpdate(id, req.body, { lean: true })
		.then(
			() => res.json('Updated!')
		)
		.catch( err => res.json(err) );
})

module.exports = router;