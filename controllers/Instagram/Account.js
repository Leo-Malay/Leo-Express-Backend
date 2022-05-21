const { InstagramAccountModel } = require("../../models/Instagram");
const mongooseObjectId = require("mongoose").Types.ObjectId;
const { response } = require("../../utils/response");

const Register = async (req, res) => {
    if (
        await InstagramAccountModel.exists({
            userId: mongooseObjectId(req.tokenData._id),
        })
    )
        return response(res, true, "Already Registered");
    else {
        const query = InstagramAccountModel({
            username: req.data.username,
            name: req.data.name,
            locked: req.data.locked,
        });
        query.save((err, result) => {
            if (err) throw err;
            return response(res, true, "Registration Successful");
        });
    }
};
const Profile = (req, res) => {
    /**
     * BODY: userId
     */
    InstagramAccountModel.findOne(
        { userId: mongooseObjectId(req.body.userId) },
        (err, data) => {
            if (err) throw err;
            if (data.locked && data.follower.includes(req.tokenData._id))
                return response(res, true, "Profile Fetched", {
                    name: data.name,
                    bio: data.bio,
                    profileIcon: data.profileIcon,
                    posts: data.posts,
                    followers: data.followers,
                    following: data.following,
                });
            else
                return response(res, true, "Profile Fetched", {
                    name: data.name,
                    bio: data.bio,
                    profileIcon: data.profileIcon,
                    posts: data.posts,
                    followers: [],
                    following: [],
                    followerCount: data.followers.length,
                    followingCount: data.following.length,
                });
        }
    );
};
const ProfileIcon = (req, res) => {};
const Bio = (req, res) => {
    /**
     * BODY: bio
     */
    InstagramAccountModel.updateOne(
        { userId: mongooseObjectId(req.tokenData._id) },
        { bio: req.data.bio },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                return response(res, true, "Bio Updated");
            else return response(res, false, "Unable to update Bio");
        }
    );
};
const Follow = async (req, res) => {
    /**
     * BODY: userId
     */
    if (
        await InstagramAccountModel.exists({
            userId: mongooseObjectId(req.data.userId),
            $includes: { following: req.tokenData._id },
        })
    )
        return response(res, false, "You are alreading following this profile");
    else
        InstagramAccountModel.updateOne(
            { userId: mongooseObjectId(req.data.userId) },
            { $push: { pendingFollow: req.tokenData._id } },
            (err, result) => {
                if (err) throw err;
                if (result.modifiedCount === 1)
                    return response(res, true, "Follow request sent");
                else
                    return response(
                        res,
                        false,
                        "Unable to send follow request"
                    );
            }
        );
};
const ApproveFollow = (req, res) => {
    /**
     * BODY: userId
     */
    InstagramAccountModel.updateOne(
        { userId: mongooseObjectId(req.tokenData._id) },
        {
            $pull: { pendingFollow: req.data.userId },
            $push: { followers: req.data.userId },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                InstagramAccountModel.updateOne(
                    { userId: mongooseObjectId(req.data.userId) },
                    { $push: { following: req.tokenData._id } },
                    (err, result1) => {
                        if (err) throw err;
                        if (result1.modifiedCount === 1)
                            return response(res, true, "Follow Accepted");
                        else
                            return response(
                                res,
                                false,
                                "Unable to accept Follow"
                            );
                    }
                );
            else return response(res, false, "Unable to accept Follow");
        }
    );
};
const RejectFollow = (req, res) => {
    /**
     * BODY: userId
     */
    InstagramAccountModel.updateOne(
        { userId: mongooseObjectId(req.tokenData._id) },
        { $pull: { pendingFollow: req.data.userId } },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                return response(res, true, "Follow Rejected");
            else return response(res, false, "Unable to reject follow");
        }
    );
};
const UnFollow = (req, res) => {
    /**
     * BODY: userId
     */
    InstagramAccountModel.updateOne(
        { userId: mongooseObjectId(req.tokenData._id) },
        {
            $pull: { following: req.data.userId },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                InstagramAccountModel.updateOne(
                    { userId: mongooseObjectId(req.data.userId) },
                    { $push: { follower: req.tokenData._id } },
                    (err, result1) => {
                        if (err) throw err;
                        if (result1.modifiedCount === 1)
                            return response(res, true, "Unfollowed");
                        else return response(res, false, "Unable to unollow");
                    }
                );
            else return response(res, false, "Unable to unfollow");
        }
    );
};
const GetFollower = (req, res) => {
    /**
     * BODY: followers
     */
    InstagramAccountModel.find(
        {
            $includes: { userId: req.data.followers },
        },
        { username: 1, userId: 1, profileIcon: 1 },
        (err, data) => {
            if (err) throw err;
            return response(res, true, "Followers fetched", data);
        }
    );
};
const GetFollowing = (req, res) => {
    /**
     * BODY: following
     */
    InstagramAccountModel.find(
        {
            $includes: { userId: req.data.following },
        },
        { username: 1, userId: 1, profileIcon: 1 },
        (err, data) => {
            if (err) throw err;
            return response(res, true, "Following fetched", data);
        }
    );
};
const GetPendingFollow = (req, res) => {
    InstagramAccountModel.find(
        {
            userId: mongooseObjectId(req.tokenData._id),
        },
        { pendingFollow: 1 },
        (err, data) => {
            if (err) throw err;
            return response(res, true, "Pending Follow Fetched", data);
        }
    );
};

module.exports = {
    Register,
    Profile,
    ProfileIcon,
    Bio,
    Follow,
    ApproveFollow,
    RejectFollow,
    UnFollow,
    GetFollower,
    GetFollowing,
    GetPendingFollow,
};
