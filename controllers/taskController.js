const Task = require('../models/Task');

// Create task
const createTask = async (req, res) => {
  try {
    const { title, description, category, priority, status, dueDate } = req.body;
    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      category,
      priority,
      status,
      dueDate,
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tasks for user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


//search api
const searchtask = async(req,res)=>{
  try {
    let key = req.params.key;

    let tasks = await Task.find({
      $or:[
        {title:{$regex:key,$options:"i"}},
        {description:{$regex:key ,$options:"i"}},
        {category:{$regex:key ,$options:"i"}},
      ]
    })
    res.json({success:true,result:tasks})

    
  } catch (error) {
     res.status(500).json({success:false, errors:error})
    
  }
}

// Get single task
const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Dashboard stats
const getStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ user: req.user.id });
    const completedTasks = await Task.countDocuments({ user: req.user.id, status: 'Completed' });
    const pendingTasks = await Task.countDocuments({ user: req.user.id, status: 'Pending' });

    res.json({ totalTasks, completedTasks, pendingTasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { createTask, getTasks, getTask, updateTask, deleteTask, getStats ,searchtask };
