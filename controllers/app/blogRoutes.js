const router = require('express').Router();
const { Blog, Comment, User } = require('../../models')
const withAuthn = require('../../utils/authn')

router.get('/', (req,res)=>{
    Blog.findAll({
        attributes: ['id','title','description','date_created'],
        order:[['date_created', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id','comment','blog_id','user_id','date_created'],
                include:{ 
                    model: User, 
                    attributes:['username']
                }
            }
        ]
    })
    .then(blogData => res.json(blogData.reverse()))
    .catch(err =>{
        console.log(err);
        res.status(400).json(err);
    })
});

router.get('/id', (req,res)=>{
    Blog.findOne({
        where: {id: req.params.id},
        attributes: ['id','title','description','date_created'],
        include:{
            model: User,
            attributes: ['username']
        }
    })
    .then(blogData=>{
        if(!blogdata){
            res.status(400).json({ message: 'no post'});
            return;
        }
        res.json(blogData);
    })
})

router.post('/', withAuthn, (req, res)=>{
    Blog.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user_id
    })
    .then(blogData=> res.json(blogData))
})

router.put('/:id', withAuthn, (req,res)=>{
    Blog.update({
        title: req.body.title, 
        description: req.body.description
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(blogData=>{
        if (!blogData) {
            res.status(400).json({ message: 'no post'});
            return;
        }
        res.json(blogData);
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json(err);
    });
})

router.delete('/:id', withAuthn, (req,res)=> {
    Blog.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(blogData =>{
        if (!blogData) {
            res.status(400).json({ message: 'no post'});
            return;
        }
        res.json(blogData);
    })
})

module.exports = router;