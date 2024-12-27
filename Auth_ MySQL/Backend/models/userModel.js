// / userModel.js
import config from '../config.js';

const db = config.db;

// Function to create a new user
export const createUser = async (role, fullName, email, password) => {
    const [result] = await db.execute('INSERT INTO register (role, fullname, email, password) VALUES (?, ?, ?, ?)', [role, fullName, email, password]);
    return result.insertId;
  };

  // Function to get a user by email
  export const getUserByEmail = async (email) => {
    const [rows] = await db.execute('SELECT * FROM register WHERE email = ?', [email]);
    return rows[0];
  };

  // export const resetUserPassword = async (email, newPassword) => {
  //   const [result] = await db.execute('UPDATE register SET password = ? WHERE email = ?', [email, newPassword]);
  //   return result.registerId;
  // };

  export const resetUserPassword = async (email, newPassword) => {
    const [result] = await db.execute('UPDATE register SET password = ? WHERE email = ?', [newPassword, email]);

    // Return a success status or check rows affected
    return result.affectedRows > 0; // Returns `true` if at least one row is updated
};

// Create a new role in the database
export const createRole = async (name, is_active, is_system, is_admin) => {
  const [result] = await db.execute(
    'INSERT INTO roles (name, is_active, is_system, is_admin) VALUES (?, ?, ?, ?)',
    [name, is_active, is_system, is_admin]
  );
  return result.insertId; // Return the ID of the newly created role
};



export const getRoleById = async (role_id) => {
  try {
    const [rows] = await db.execute('SELECT * FROM roles WHERE role_id = ?', [role_id]);
    return rows.length > 0 ? rows[0] : null; // Return the first result or null if not found
  } catch (error) {
    console.error('Database Error (getRoleById):', error.message);
    throw error;
  }
};
// Update Role
export const updateRole = async (id, name, is_active, is_system, is_admin) => {
  const [result] = await db.execute(
      'UPDATE register SET role = ?, is_active = ?, is_system = ?, is_admin = ? WHERE id = ?',
      [name, is_active, is_system, is_admin, id]
  );
  return result.affectedRows > 0;
};

// Delete Role
export const deleteRole = async (id) => {
  const [result] = await db.execute('DELETE FROM register WHERE id = ?', [id]);
  return result.affectedRows > 0;
};


// permission Usermodel

export const getPermissionsByRole = async (role_id) => {
  const [rows] = await db.execute('SELECT * FROM role_permissions WHERE role_id = ?', [role_id]);
  return rows;
};


  // export const getUserById = async (id) => {
  //   try {
  //     const user = await db.query('SELECT * FROM register WHERE registerId = ?', [id]); // Use parameterized queries to avoid SQL injection
  //     if (user.length === 0) {
  //       throw new Error('User not found');
  //     }
  //     return user[0]; // Assuming you're using an array of users from the query result
  //   } catch (error) {
  //     throw new Error('Error fetching user from database: ' + error.message);
  //   }
  // };