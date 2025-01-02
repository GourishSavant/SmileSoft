import config from '../config.js';
const db = config.db;
// Create designation in the database
export const createDesignation = async (designation, is_active) => {
    const [result] = await db.execute('INSERT INTO staff_designation (designation, is_active) VALUES (?, ?)', [designation, is_active]);
    return result.insertId; // Return the ID of the newly created role
  };
  // Get designation_id by designation
  export const getIdByDesignation = async (designation) => {
    try {
      const [rows] = await db.execute('SELECT staff_designation_id FROM staff_designation WHERE designation = ?', [designation]);
      return rows.length > 0 ? rows[0].staff_designation_id : null; // Return the designation_id or null if not found
    } catch (error) {
      console.error('Database Error: ', error.message);
      throw error;
    }
  };
  // Create department in the database
  export const createDepartment = async (department_name, is_active) => {
    const [result] = await db.execute('INSERT INTO department (department_name, is_active) VALUES (?, ?)', [department_name, is_active]);
    return result.insertId; // Return the ID of the newly created role
  };
  // Get designation_id by Department
  export const getIdByDepartment = async (department_name) => {
    try {
      const [rows] = await db.execute('SELECT department_id FROM department WHERE department_name = ?', [department_name]);
      return rows.length > 0 ? rows[0].department_id : null; // Return the department_id or null if not found
    } catch (error) {
      console.error('Database Error: ', error.message);
      throw error;
    }
  };
  export const createStaff = async (
    staff_id, role_id, staff_designation_id, department_id, first_name, last_name,
    father_name, mother_name, email, gender, dob, doj, phone_no, emergency_contact_no,
    marital_status, photo, address, permanent_address, qualification, work_exp,
    note, epf_no, basic_salary, contract_type, work_shift, work_location,
    account_title, account_no, bank_name, ifsc_code, bank_branch,
    facebook_url, twitter_url, linkedin_url, instagram_url, resume,
    joining_letter, resignation_letter, other_documents
  ) => {
    try {
      const query = `
        INSERT INTO staff (
          staff_id, role_id, staff_designation_id, department_id, first_name, last_name,
          father_name, mother_name, email, gender, dob, doj, phone_no, emergency_contact_no,
          marital_status, photo, address, permanent_address, qualification, work_exp,
          note, epf_no, basic_salary, contract_type, work_shift, work_location,
          account_title, account_no, bank_name, ifsc_code, bank_branch,
          facebook_url, twitter_url, linkedin_url, instagram_url, resume,
          joining_letter, resignation_letter, other_documents
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const [result] = await db.execute(query, [
        staff_id, role_id, staff_designation_id, department_id, first_name, last_name,
        father_name, mother_name, email, gender, dob, doj, phone_no, emergency_contact_no,
        marital_status, photo, address, permanent_address, qualification, work_exp,
        note, epf_no, basic_salary, contract_type, work_shift, work_location,
        account_title, account_no, bank_name, ifsc_code, bank_branch,
        facebook_url, twitter_url, linkedin_url, instagram_url, resume,
        joining_letter, resignation_letter, other_documents
      ]);
      return { success: true, insertId: result.insertId };
    } catch (error) {
      console.error('Error creating staff:', error);
      return { success: false, error: error.message };
    }
  };
  //attributes
    // staff_id, role_id, staff_designation_id, department_id, first_name, last_name,
    // father_name, mother_name, email, gender, dob, doj, phone_no, emergency_contact_no,
    // marital_status, photo, address, permanent_address, qualification, work_exp,
    // note, epf_no, basic_salary, contract_type, work_shift, work_location,
    // account_title, account_no, bank_name, ifsc_code, bank_branch,
    // facebook_url, twitter_url, linkedin_url, instagram_url, resume,
    // joining_letter, resignation_letter, other_documents
  //fetching staff by staff_emp_id
    export const getStaffByStaffempId = async (staff_emp_id) => {
      try {
        const [rows] = await db.execute('SELECT * FROM staff WHERE staff_emp_id = ?', [staff_emp_id]);
        return rows.length > 0 ? rows[0] : null; // Return the first result or null if not found
      } catch (error) {
        console.error('Database Error: ', error.message);
        throw error;
      }
    };
  //fetching staff by id
  export const getStaffById = async (staff_id) => {
    try {
      const [rows] = await db.execute('SELECT * FROM staff WHERE staff_id = ?', [staff_id]);
      return rows.length > 0 ? rows[0] : null; // Return the first result or null if not found
    } catch (error) {
      console.error('Database Error: ', error.message);
      throw error;
    }
  };
  //fetching staff by name
  export const getStaffByName = async (name) => {
    try {
      const [rows] = await db.execute('SELECT * FROM staff WHERE first_name = ? OR last_name = ?', [name, name]);
      return rows.length > 0 ? rows : null; // Return all matching rows or null if none found
    } catch (error) {
      console.error('Database Error: ', error.message);
      throw error;
    }
  };
  //fetching staff by name
  export const getStaffByRole = async (role_id) => {
    try {
      const [rows] = await db.execute('SELECT * FROM staff WHERE role_id = ?', [role_id]);
      return rows.length > 0 ? rows : null; // Return the first result or null if not found
    } catch (error) {
      console.error('Database Error: ', error.message);
      throw error;
    }
  };
  export const getStaffByEmail = async (email) => {
    const [rows] = await db.execute('SELECT * FROM staff WHERE email = ? AND is_active = 1', [email]);
    return rows[0];
  };
  //fetching all staff
  export const getAllStaff = async () => {
    try {
      const [rows] = await db.execute('SELECT * FROM staff');
      return rows.length > 0 ? rows : null; // Return the first result or null if not found
    } catch (error) {
      console.error('Database Error: ', error.message);
      throw error;
    }
  };
  // Update Staff Details in Database
  export const updateStaffDetails = async (
    staff_emp_id, staff_id, role_id, staff_designation_id, department_id, first_name, last_name,
    father_name, mother_name, email, gender, dob, doj, phone_no, emergency_contact_no,
    marital_status, photo, address, permanent_address, qualification, work_exp,
    note, epf_no, basic_salary, contract_type, work_shift, work_location,
    account_title, account_no, bank_name, ifsc_code, bank_branch,
    facebook_url, twitter_url, linkedin_url, instagram_url, resume,
    joining_letter, resignation_letter, other_documents
  ) => {
    try {
      const query = `
        UPDATE staff SET
          staff_id = ?, role_id = ?, staff_designation_id = ?, department_id = ?, first_name = ?, last_name = ?,
          father_name = ?, mother_name = ?, email = ?, gender = ?, dob = ?, doj = ?, phone_no = ?,
          emergency_contact_no = ?, marital_status = ?, photo = ?, address = ?, permanent_address = ?,
          qualification = ?, work_exp = ?, note = ?, epf_no = ?, basic_salary = ?, contract_type = ?,
          work_shift = ?, work_location = ?, account_title = ?, account_no = ?, bank_name = ?,
          ifsc_code = ?, bank_branch = ?, facebook_url = ?, twitter_url = ?, linkedin_url = ?,
          instagram_url = ?, resume = ?, joining_letter = ?, resignation_letter = ?, other_documents = ?
        WHERE staff_emp_id = ?`;
      const [result] = await db.execute(query, [
        staff_id, role_id, staff_designation_id, department_id, first_name, last_name,
        father_name, mother_name, email, gender, dob, doj, phone_no, emergency_contact_no,
        marital_status, photo, address, permanent_address, qualification, work_exp,
        note, epf_no, basic_salary, contract_type, work_shift, work_location,
        account_title, account_no, bank_name, ifsc_code, bank_branch,
        facebook_url, twitter_url, linkedin_url, instagram_url, resume,
        joining_letter, resignation_letter, other_documents, staff_emp_id
      ]);
      return result.affectedRows > 0; // Return true if rows were updated
    } catch (error) {
      console.error('Error updating staff:', error);
      throw error; // Throw error to be handled by the calling function
    }
  };
  // Delete Staff by id
  export const deleteStaff = async (staff_emp_id) => {
    try {
      const [result] = await db.execute('DELETE FROM staff WHERE staff_emp_id = ?', [staff_emp_id]);
      return result.affectedRows > 0; // Return true if rows were affected, otherwise false
    } catch (error) {
      console.error('Database Error:', error.message);
      throw error;
    }
  };
  //Adding password to the staff
  export const addStaffPassword = async (staff_emp_id, password) => {
    const [result] = await db.execute('UPDATE staff SET password = ? WHERE staff_emp_id = ?', [password, staff_emp_id]);
    return result.affectedRows > 0;
  };

  
