const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');


router.get('/', (req, res) => {
    User.findAll({
            attributes: {
                exclude: ["password"]
            }
        })
        .then(userData => res.json(userData))
});

router.get('/:id', (req, res) => {
    User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Blog,
                    attributes: ['id', 'title', 'description', 'date_created']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'date_created'],
                    include: {
                        model: Blog,
                        attributes: ['title']
                    }
                },
                {
                    model: Blog,
                    attributes: ['title'],
                }
            ]
        })
        .then(userData => {
            if (!userData) {
                res.status(400).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.json(userData);
        })
});

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(400).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            res
                .status(400)
                .json({
                    message: 'Incorrect email or password, please try again'
                });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({
                    message: 'Incorrect email or password, please try again'
                });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({
                user: userData,
                message: 'You are now logged in!'
            });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(400).end();
        });
    } else {
        res.status(400).end();
    }
});

router.put('/:id', (req, res) => {

    User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(userData => {
            if (!userData[0]) {
                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.json(userData);
        })
});

router.delete('/:id', (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.json(userData);
        })
});

module.exports = router;