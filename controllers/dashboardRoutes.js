const router = require('express').Router();
const withAuthn = require('../utils/authn');
const { Blog, User, Comment } = require('../models');

router.get('/', withAuthn, (req,res)=>{
    Blog.findAll({
        where:{user_id: req.session.user_id},
        attributes:['id','title','description','date_created'],
        include:[
            {
                model: Comment,
                attributes: ['id','comment','blog_id','date_created'],
                include:{
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(blogData=>{
        const blogs = blogData.map(blog => blog.get({ plain: true }))
        res.render('dashboard', {
            blogs,
            logged_in: true
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json(err);
    })
});

router.get('/edit/:id', withAuthn, (req,res)=>{
    Blog.findOne({
        where: {id: req.params.id},
        attributes:['id','title','description','date_created'],
        include:[
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id','comment','blog_id','user_id','date_created'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(blogData=>{
        if(!blogData){
            res.status(400).json({
                message: 'no post'
            })
            return;
        }

        const blog = blogData.get({
            plain: true
        })
        res.render('edit-blog',{
            blog,
            logged_in: true
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json(err)
    })
})

router.get('/new', (req, res)=> {
    res.render('new-blog');
});

module.exports = router;