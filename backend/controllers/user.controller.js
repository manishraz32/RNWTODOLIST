import User from '../models/user.model.js';

// Fetch a user and populate their tasks
export const getUserWithTask =  async (req, res) => {
  const userId = req.params.userId;
 
  try {
    const user = await User.findById(userId).populate('tasks');
    
    if (!user) {
      return res.status(404).json({
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'User and tasks retrieved successfully',
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user with tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};