const express=require("express")
const router=express.Router()
const Bons =require("../Models/Bons")

router.post("/",async(req,res)=>{

  const alldesg=req.body.Designation.split(",")
  const allquntt=req.body.Quntity.split(",")

  const allprixuni=req.body.Prixuni.split(",")
console.log(req.body.Designation)
      const NewBon=Bons({
        Designation:alldesg,
        Prixuni:allprixuni,
        NBDV:req.body.NBDV,
        IdClient:req.body.IdClient,
        IdUser:req.body.IdUser,
        Quntity:allquntt,
        Prixtotalbon:req.body.prixtotalbon

      })
      const result=await NewBon.save()
      console.log(result)
      return res.status(201).json(result)
})


router.put("/",async(req,res)=>{

  const alldesg=req.body.Designation.split(",")
  const allquntt=req.body.Quntity.split(",")

  const allprixuni=req.body.Prixuni.split(",")

      const NewBon=Bons({
        Designation:alldesg,
        Prixuni:allprixuni,
        NBDV:req.body.NBDV,
        IdClient:req.body.IdClient,
        IdUser:req.body.IdUser,
        Quntity:allquntt,
        Prixtotalbon:req.body.prixtotalbon

      })
      const result=await NewBon.save()
      console.log(result)
      return res.status(201).json(result)
})

router.get("/:IdUser",async(req,res)=>{
  const AllBon=await Bons.find({IdUser:req.params.IdUser}).populate("IdClient",)
  console.log(AllBon)
  return res.status(200).json(AllBon)
})
router.get("/client/:IdClient",async(req,res)=>{
  const AllBon=await Bons.find({IdClient:req.params.IdClient})
  console.log(AllBon)
  return res.status(200).json(AllBon)
})
router.get("/",async(req,res)=>{
  const AllBon=await Bons.find().populate("IdClient")
  // const AllBon=await Bons.find().populate("IdClient","name")

  console.log(AllBon)
  return res.status(200).json(AllBon)
})



///
router.put("/updatebon/:id", async(req,res)  =>{
  console.log(req.body.Versemment)
  try{
      
   const updateBon=await Bons.findByIdAndUpdate(req.params.id,{
     $set:{
       Versemment:req.body.Versemment
     }
   },{new:true})
   
   res.status(200).json(updateBon);
  }catch (error){

     res.status(500).json({message:"something wrong"});
     console.log(error.message)
  }
});

router.put("/updatebonQuntity/:id", async(req,res)  =>{
  console.log("zzzzzzzzzzzzzzzzzzzzzzz")
  console.log(req.body.Designation)


    try{
      
   const updateBon=await Bons.findByIdAndUpdate(req.params.id,{
     $set:{
       Designation:req.body.Designation,
       Quntity:req.body.Quntity,
       Prixuni:req.body.Prixuni,
       Prixtotalbon:req.body.Prixtotalbon
       
     }
   },{new:true})
   
   res.status(200).json(updateBon);
  }catch (error){

     res.status(500).json({message:"something wrong"});
     console.log(error.message)
  }
});



router.delete("/:idclient",async(req,res)=>{
const allbons= await Bons.find({IdClient:req.params.idclient})
for (let index = 0; index < allbons.length; index++) {
  const element = allbons[index];
  console.log(element["_id"])

await  Bons.findByIdAndDelete(element["_id"])
  
}
  return res.status(200).json({message:"delete all bon"})
})
router.get("/client/:IdClient",async(req,res)=>{
  const AllBon=await Bons.find({IdClient:req.params.IdClient})
  console.log(AllBon)
  return res.status(200).json(AllBon)
})
module.exports=router

