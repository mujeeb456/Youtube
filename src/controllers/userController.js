import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../model/user.model.js";
import { uploadCloundinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const register = asynchandler(async (req, res) => {

    const { fullName, email, username, password } = req.body

    if (!fullName, !email, !username, !password) {

        throw new ApiError(400, "fields incomplete")

    }
    const userexisted = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (userexisted) {
        throw new ApiError(400, "user already exist")
    }

    const avatarlocalpath = req.files?.avatar[0].path //req.files access files ?. means only go further if files exit avatar[0] access the avaatar elemetn in files [0] first avatar file .path means take the path of first avatar file
    console.log(avatarlocalpath)
    const coverImage = req.files?.coverImage[0].path

    if (!avatarlocalpath) {
        throw new ApiError(400, "avatar field is requried")
    }

    const avatarurl = await uploadCloundinary(avatarlocalpath);
    const coverImageurl = await uploadCloundinary(coverImage);

    if (!avatarurl) {
        throw new ApiError(400, "erro in uploading")
    }


    const user = await User.create({
        fullName,
        email,
        username,
        password,
        avatar: avatarurl.url || "",
        coverImage: coverImageurl?.url || "",

    })

    // optional what it does is remvoe password and refreshtoken while fetching the user as response so the response doens't include them for security
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )


})


export default { register }