import User from "../models/usermodel.js";


export const getUsersForSidebar=async(req, res)=>{
    try{
        const loggdInUserId=req.user._id;
        const filteredUers=await User.find({_id: {$ne:loggdInUserId}}).select("-password");

        res.status(200).json(filteredUers);

    }catch(error)
    {
        console.log("Error in getuserforsidebar:", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}
 