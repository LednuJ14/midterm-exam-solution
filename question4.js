let tasks = [
    { id: 1, name: "Sample Task", description: "This is a sample task description" }
  ];
  
  function generateId() {
    const highestId = tasks.reduce((maxId, task) => 
      task.id > maxId ? task.id : maxId, 0);
    return highestId + 1;
  }
  

  function addTask(name, description) {
    const newTask = {
      id: generateId(),
      name: name,
      description: description
    };
    
    tasks.push(newTask);
    return newTask;
  }
  

  function getAllTasks() {
    return tasks;
  }
  
  
  function getTaskById(id) {
    return tasks.find(task => task.id === id) || null;
  }
  

  function updateTask(id, updates) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return null; 
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...updates
    };

    tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  function deleteTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return false;
    }
    
    tasks.splice(taskIndex, 1);
    return true;
  }
  
  console.log("Initial tasks:");
  console.log(getAllTasks());
  
  console.log("\nAdding a new task:");
  const newTask = addTask("Complete JavaScript assignment", "Finish the CRUD operations task");
  console.log(newTask);
  
  console.log("\nAll tasks after adding:");
  console.log(getAllTasks());
  
  console.log("\nGetting task by ID 2:");
  console.log(getTaskById(2));
  
  console.log("\nUpdating task ID 2:");
  const updatedTask = updateTask(2, { name: "Updated task name", description: "This is an updated description" });
  console.log(updatedTask);
  
  console.log("\nAll tasks after updating:");
  console.log(getAllTasks());
  
  console.log("\nDeleting task ID 1:");
  console.log(deleteTask(1) ? "Task deleted successfully" : "Task not found");
  
  console.log("\nAll tasks after deletion:");
  console.log(getAllTasks());