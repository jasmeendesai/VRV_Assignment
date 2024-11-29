# Task Manager Backend

This is the backend service for a Task Manager application. It provides APIs for user management, task handling, and role-based access control using Node.js, Express, and MongoDB.

## Features

- User registration and authentication.
- Role-based access control (`Admin`, `Manager`, `Employee`).
- Task creation, updating, and soft deletion.
- Soft deletion of users.
- Error handling and input validation.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **bcrypt**: Password hashing.
- **JWT**: Authentication and authorization.

## Endpoint	Description
-	/auth/register ->	Only Admin can regidter new user
-	/auth/login ->	Log in an existing user
-	/auth/logout-> logout existing user
-	/users/get_all_user ->	Admin and Manager can have access to get list of active employee
-	/users/get_user/:id ->	to get user profile 
-	/users/update/:id ->	only user can update his credentials
-	/users/updateRole-> Only Admin can update role of any user
-	/users/delete/:id	-> Only Admin can delete any user
-	/tasks/create_task -> Only Admin and Manager can Create a new task
-	/tasks/get_task/:id -> Get task details by userId , It returns all tasks assinged to user with userId
- /tasks/get_task_by_taskId/:id ->	Get task using taskId
-	/tasks/update ->	Update task details
-	/tasks/delete ->	Only Admins can delete task details


