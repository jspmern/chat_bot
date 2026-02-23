const uploadFile = require("../model/uploadFile")

async function getUploadFileHandler(req,res)
{
  try {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ error: "At least one file is required" });
  }

  const { sessionId, uploadedBy } = req.body;

  if (!sessionId || !uploadedBy) {
    return res.status(400).json({ error: "sessionId and uploadedBy are required" });
  }
  // Prepare documents for bulk insert
  const fileDocs = files.map((item) => ({
    sessionId,
    uploadedBy,
    fileName: item.filename,
    fileUrl: item.path,
    fileSize: item.size,
    mimeType: item.mimetype,
    originalName: item.originalname,
  }));

  // Bulk insert (FAST)
  const savedFiles = await uploadFile.insertMany(fileDocs);

  return res.status(200).json({
    message: "Files uploaded successfully",
    files: savedFiles.map((file) => ({
      id: file._id,
      fileName: file.fileName,
      fileUrl: file.fileUrl,
      fileSize: file.fileSize,
      mimeType: file.mimeType,
      originalName: file.originalName,
    })),
  });

} catch (err) {
  console.error(err);
  return res.status(500).json({
    error: "Something went wrong: " + err.message,
  });
}
}
module.exports=getUploadFileHandler

 