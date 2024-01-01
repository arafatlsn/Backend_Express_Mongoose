import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadHandler } from "../utils/fileUploadHandler.js";
import { User } from "../models/user.model.js";

const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password, fullName } = req.body;
  if (!username || !email || !password || !fullName) {
    throw new ApiError(409, {
      message: "Please fulfilled all required fields",
    });
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverLocalPath = req.files?.coverImage[0]?.path;
  const avatarUrl = await uploadHandler(avatarLocalPath);
  const coverUrl = await uploadHandler(coverLocalPath);

  if (!avatarUrl) {
    throw new ApiError(409, {
      message: "Avatar is required",
    });
  }

  const newUser = await User.create({
    username,
    fullName,
    password,
    email,
    avatar: avatarUrl?.url,
    coverImage: coverUrl?.url,
  });

  console.log(newUser);
  res
    .status(201)
    .json(new ApiResponse(200, newUser, "Successfully created an user"));
});

export { userRegister };
