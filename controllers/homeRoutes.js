const router = require('express').Router();
const withAuthn = require('../utils/authn');
const { Blog, User, Comment } = require('../models');

router.get('/', (req,res)=>{
    Blog.findAll({
        attributes:['id','title','description','date_created'],
        include:[
            {
                model:Comment,
                attributes:['id','comment','blog_id', 'date_created'],
                include:{
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(blogData =>{
        const blogs = blogData.Map(blog => blog.get({ plain: true }));
        res.render('homepage', { blogs, logged_in: req.session.logged_in })
    })
    .catch(err =>{
        console.log(err);
        res.status(400).json(err);
    });
});

router.get('/blog/id:id', (req,res)=>{
    Blog.findOne({
        where: { id: req.params.id},
        attributes:['id','title','description','date_created'],
        include:[
            {
                model: Comment,
                attributes: ['id','comment','blog_id','user_id','date_created'],
                include:{
                    model: User,
                    attributes:['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(blogData => {
        if(!blogData){
            res.status(404).json({ message: 'nothing found'});
            return;
        }
        const blog = blogData.get({ plain: true });
        res.render('single-blog', { blog, logged_in: req.session.logged_in });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});

router.get('/blogs-comments', (res,req)=>{
    Blog.findOne({
        where:{id: req.params.id},
        attributes: ['id','title','description','date_created'],
        include:[
            {
                model:Comment,
                attributes:['id','comment','blog_id', 'user_id','date_created'],
                include:{
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
            
        ]
    })
    .then(blogDate=>{
        if(!blogData){
            res.status(400).json({ message: 'no post found'})
            return;
        }
        const blog = blogData.get({ plain: true })

        res.render('blogs-comments', { blog, logged_in: req.session.logged_in });
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json(err);
    })
})

module.exports = router;