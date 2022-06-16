const router = require('express').Router();
const withAuthn = require('../../utils/authn');
const { Comment } = require('../../modules');

router.get('/', (req,res) => {
    Comment.findAll({})
    .then(CommentData => res.json(CommentData))
    .catch(err=>{
        console.log(err);
        res.status(400).json(err);
    })
})

router.get('/:id', (req,res)=>{
    Comment.findAll({
        where:{id: req.params.id}
    })
    .then(commentData=> res.json(commentData))

})

router.get('/', withAuthn, (req,res)=>{
    if (req.session){
        Comment.create({
            comment: req.body.comment,
            blog_id:req.body.blog_id,
            user_id: req.session.user_id
        })
        .then(commentData => res.json(commentData))
    }
})

router.put('/:id', withAuthn, (req,res)=>{
    Comment.update(
        {
            comment: req.body.comment
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(commentData =>{
        if(!commentData){
            res.status(400).json({ message: 'no comment'})
            return;
        }
        res.json(commentData);
    })
})

router.delete('/:id', withAuthn, (req,res)=> {
    Comment.destroy({
        where:{ id: req.params.id}
    })
    .then(commentData => {
        if (!commentData) {
            res.status(400).json({ message: 'no comment'})
            return;
        }
        res.json(commentData); 
    })
})

module.exports = router;