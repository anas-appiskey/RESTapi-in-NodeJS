const express = require('express');
const router = express.Router();
const uuid = require('uuid')
const members = require('../../Members')

router.get('/',(req,res)=>{
    res.json(members);
})

// single memeber by id
router.get('/:id',(req,res)=>{
    const found = members.some (member =>  member.id === parseInt(req.params.id));
    if (found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else{
        res.status(400).json({msg : 'user not found'})
    }
})

router.post('/',(req,res)=>{
 const newMember = {
     id : uuid.v4(),
     name : req.body.name,
     email : req.body.email,
     status : 'active'
 }

 if (!newMember.name || !newMember.email){
    return res.status(400).json({msg : 'pls name '})

 }

     members.push(newMember);
    res.json(members)
})



// update member
router.put('/:id',(req,res)=>{

    const found = members.some (member =>  member.id === parseInt(req.params.id));
    if (found){
        const updMember = req.body;

    members.forEach(member =>{

        if(member.id ===parseInt(req.params.id)) {
      member.name = updMember.name ? updMember.name : member.name;
      member.email = updMember.email ? updMember.email : member.email;
      res.json({msg:'updated',member})
        }
    });
  }  else{
            res.status(400).json({msg : 'user not found'})
        }

    
})

// delete memeber by id
router.delete('/:id',(req,res)=>{
    const found = members.some (member =>  member.id === parseInt(req.params.id));
    if (found){
        res.json({msg :' deleted',member :members.filter(member => member.id !== parseInt(req.params.id))});
    }
    else{
        res.status(400).json({msg : 'user not found'})
    }
})



module.exports = router;