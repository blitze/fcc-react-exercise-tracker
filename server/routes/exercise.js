const express = require('express');

const Exercise = require('../models/exercise');
const User = require('../models/user');

const router = express.Router();

const getFormatedLog = log => ({
	...log._doc,
	date: log.date.toDateString(),
});

/* GET users listing. */
router.get('/users', async (req, res, next) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post('/new-user', async (req, res, next) => {
	try {
		const existingUser = await User.findOne(req.body);

		if (!existingUser) {
			const newUser = await User.create(req.body);
			res.json(newUser._doc);
		} else {
			throw new Error('User already exists');
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

router.delete('/delete-user', async (req, res, next) => {
	try {
		const { userId } = req.query;
		const userDoc = await User.findByIdAndDelete(userId);

		if (userDoc) {
			await Exercise.deleteMany({ userId });
		}

		res.json(userDoc._doc);
	} catch (error) {
		res.status(500).send(error);
	}
});

/* GET users listing. */
router.get('/log', async (req, res, next) => {
	try {
		const { userId, from, to, offset = 0, limit = 5 } = req.query;

		const user = await User.findById(userId);

		if (!user) {
			throw new Error('User does not exist');
		} else {
			let constraint = { userId };

			if (from || to) {
				constraint.date = {};
				if (from) {
					constraint.date.$gte = new Date(from).getTime();
				}

				if (to) {
					constraint.date.$lte = new Date(to).getTime();
				}
			}

			const count = await Exercise.countDocuments(constraint);
			const logs = await Exercise.find(constraint)
				.sort('-date')
				.skip(+offset)
				.limit(+limit);

			res.json({
				...user._doc,
				count,
				log: logs.map(log => getFormatedLog(log)),
			});
		}
	} catch (error) {
		throw error;
	}
});

router.post('/add', async (req, res, next) => {
	try {
		const userDoc = await User.findById(req.body.userId);

		if (userDoc) {
			const data = req.body;

			if (!data.date) {
				delete data.date;
			}

			const newLog = await Exercise.create(data);
			res.json({
				username: userDoc.username,
				...getFormatedLog(newLog),
			});
		} else {
			throw new Error('User does not exist');
		}
	} catch (error) {
		throw error;
	}
});

module.exports = router;
