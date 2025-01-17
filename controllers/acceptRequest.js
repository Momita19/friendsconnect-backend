const User = require('../models/User');
const mongoose = require('mongoose');

const acceptRequest = async (req, res) => {
  const { requesterId } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(requesterId)) {
//     return res.status(400).json({ message: 'ID is required' });
//   }

//   try {
//     // Validate requester and user existence
//     // const userId = req.user.id;
//     // const [user, requester] = await Promise.all([
//     //   User.findById(req.user.id),
//     //   User.findById(requesterId),
//     // ]);

//     // if (!user) {
//     //     return res.status(404).json({ message: 'User not found' });
//     //   }
  
//     //   if (!requester) {
//     //     return res.status(404).json({ message: 'Requester not found' });
//     //   }
//     const user = await User.findById(req.user.id);
//     const { requesterId } = req.body;

//     // Validate input
//     if (!requesterId) {
//       return res.status(400).json({ message: 'Requester ID is required' });
//     }

//     const requester = await User.findById(requesterId);
//     if (!user || !requester) {
//       return res.status(404).json({ message: 'User or requester not found' });
//     }

//     // Check if the friend request exists
//     if (!user.friendRequests.includes(requesterId)) {
//       return res.status(400).json({ message: 'Friend request not found' });
//     }

//     await Promise.all([
//         User.findByIdAndUpdate(userId, {
//           $push: { friends: requesterId },
//           $pull: { friendRequests: requesterId },
//         }),
//         User.findByIdAndUpdate(requesterId, {
//           $push: { friends: userId },
//           $pull: { sentRequests: userId },
//         }),
//       ]);
  
//       res.status(200).json({
//         message: 'Friend request accepted successfully',
//       });
//   } catch (error) {
//     console.error('Error accepting friend request:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
try {
    // Retrieve the currently authenticated user
    const user = await User.findById(req.user.id);
    const { requesterId } = req.body;
    console.log("request id ka scene", requesterId)
    console.log("user?", user)

    console.log("User's friend requests:", user.friendRequests);

    // Validate input
    if (!requesterId) {
      return res.status(400).json({ message: 'Requester ID is required' });
    }

    // Validate requester existence
    const requester = await User.findById(requesterId);
    if (!user || !requester) {
      return res.status(404).json({ message: 'User or requester not found' });
    }

 

    // Check if the friend request exists
    if (!user.friendRequests.includes(requesterId)) {
      return res.status(400).json({ message: 'Friend request not found' });
    }

    // Update friends lists
    user.friends.push(requesterId);
    requester.friends.push(req.user.id);

    // Remove the friend request
    user.friendRequests = user.friendRequests.filter(
      id => id.toString() !== requesterId
    );
    requester.sentRequests = requester.sentRequests.filter(
      id => id.toString() !== req.user.id
    );

    // Save changes
    await Promise.all([user.save(), requester.save()]);

    res.status(200).json({
      message: 'Friend added successfully',
      friends: user.friends, // Optional: Send updated friends list
    });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = acceptRequest;
