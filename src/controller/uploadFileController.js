async function getUploadFileHandler(req,res)
{
   try{
    if(!req.file)return res.status(400).json({error:"file is required"})
    res.json({message:"file uploaded successfully",file:req.file})
   }
   catch(err)
   {
    res.status(500).json({error:"something went wrong"+err})
   }
}
module.exports=getUploadFileHandler