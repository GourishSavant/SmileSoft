// import * as UserModel from '../models/staffModel.js';
// //Designation
// export const createDesignation = async (req, res) => {
//     try {
//         const { designation, is_active = 1 } = req.body;
//         console.log('Received Data:', req.body);
//         // Validate required fields
//         if (!designation) {
//           return res.status(400).json({ error: 'Designation is required' });
//         }
//         // Create Designation in the database
//         const designation_id = await UserModel.createDesignation(designation, is_active);
//         console.log('Designation_id:', designation_id);
//         res.status(201).json({success: true, message: 'Designation created successfully', designation_id});
//     } catch (error) {
//         console.error('Designation Creation Error:', error);
//         res.status(500).json({error: 'Designation creation failed', details: error.message});
//     }
//   }
//   export const getIdByDesignation = async (req, res) => {
//     try {
//         const designation =req.query.designation || req.body.designation;
//         console.log('Received Designation:', req.body.designation);
//         if (!designation) {
//           return res.status(400).json({ error: 'Designation is required' });
//         }
//         const designation_id = await UserModel.getIdByDesignation(designation);
//         if (designation_id) {
//             return res.json(designation_id); // Return user data as JSON response
//         } else {
//             return res.status(404).json({ error: 'Designation not found' });
//         }
//     } catch (error) {
//         console.error('Error fetching Designation:', error);
//         res.status(500).json({error: 'Error fetching Designation', details: error.message});
//     }
//   }
//   //Department
//   export const createDepartment = async (req, res) => {
//     try {
//         const { department_name, is_active = 1 } = req.body;
//         console.log('Received Data:', req.body);
//         // Validate required fields
//         if (!department_name) {
//           return res.status(400).json({ error: 'Department is required' });
//         }
//         // Create role in the database
//         const department_id = await UserModel.createDepartment(department_name, is_active);
//         console.log('Department_id:', department_id);
//         res.status(201).json({success: true, message: 'Department created successfully', department_id});
//     } catch (error) {
//         console.error('Department Creation Error:', error);
//         res.status(500).json({error: 'Department creation failed', details: error.message});
//     }
//   }
//   export const getIdByDepartment = async (req, res) => {
//     try {
//         const department_name =req.query.department_name || req.body.department_name;
//         console.log('Received department:', req.body.department_name);
//         if (!department_name) {
//           return res.status(400).json({ error: 'department is required' });
//         }
//         const department_id = await UserModel.getIdByDepartment(department_name);
//         if (department_id) {
//             return res.json(department_id); // Return user data as JSON response
//         } else {
//             return res.status(404).json({ error: 'department not found' });
//         }
//     } catch (error) {
//         console.error('Error fetching department:', error);
//         res.status(500).json({error: 'Error fetching department', details: error.message});
//     }
//   }
//   //Staff
//   export const createStaff = async (req, res) => {
//     try {
//         const { staff_id, role, designation, department, first_name, last_name,
//           father_name, mother_name, email, gender, dob, doj, phone_no, emergency_contact_no,
//           marital_status, photo, address, permanent_address, qualification, work_exp,
//           note, epf_no, basic_salary, contract_type, work_shift, work_location,
//           account_title, account_no, bank_name, ifsc_code, bank_branch,
//           facebook_url, twitter_url, linkedin_url, instagram_url, resume,
//           joining_letter, resignation_letter, other_documents } = req.body;
//         console.log('Received Data:', req.body);
//         // Validate required fields
//         // if (!name) {
//         //     return res.status(400).json({ success: false, message: 'All fields are required' });
//         // }
//         if (!staff_id || !role || !first_name || !email || !gender || !dob || staff_id == null || role == null || first_name == null || email == null || gender == null || dob == null) {
//           return res.status(400).json({ error: 'staff_id, role, first_name, email, gender and date of birth fields are required and should not be null' });
//         }
//          // Check if staff_id already exists
//       const existingStaff = await UserModel.getStaffById(staff_id);
//       if (existingStaff) {
//         return res.status(400).json({ error: 'Staff ID already exists' });
//       }
//         // Fetch role ID, designation ID, and department ID
//       const role_id = await UserModel.getRoleIdByName(role);
//       if (!role_id) {
//         return res.status(400).json({ error: 'Invalid role' });
//       }
//       console.log('Role ID:', role_id);
//       const staff_designation_id = await UserModel.getIdByDesignation(designation);
//       if (!staff_designation_id) {
//         return res.status(400).json({ error: 'Invalid designation' });
//       }
//       console.log('Designation ID:', staff_designation_id);
//       const department_id = await UserModel.getIdByDepartment(department);
//       if (!department_id) {
//         return res.status(400).json({ error: 'Invalid department' });
//       }
//       console.log('Department ID:', department_id);
//         // Create role in the database
//         const staff = await UserModel.createStaff(staff_id, role_id, staff_designation_id, department_id, first_name, last_name,
//           father_name, mother_name, email, gender, dob, doj, phone_no, emergency_contact_no,
//           marital_status, photo, address, permanent_address, qualification, work_exp,
//           note, epf_no, basic_salary, contract_type, work_shift, work_location,
//           account_title, account_no, bank_name, ifsc_code, bank_branch,
//           facebook_url, twitter_url, linkedin_url, instagram_url, resume,
//           joining_letter, resignation_letter, other_documents);
//           console.log('Staff:', staff);
//         res.status(201).json({success: true, message: 'Staff created successfully', staff});
//     } catch (error) {
//         console.error('Staff Creation Error:', error);
//         res.status(500).json({error: 'Staff creation failed', details: error.message});
//     }
//   }
//   export const getAllStaff = async (req, res) => {
//     try {
//         const staff = await UserModel.getAllStaff();
//         if (staff) {
//             return res.json(staff); // Return user data as JSON response
//         } else {
//             return res.status(404).json({ error: 'Staff not found' });
//         }
//     } catch (error) {
//         console.error('Error fetching staff:', error);
//         res.status(500).json({error: 'Error fetching staff', details: error.message});
//     }
//   }
//   export const getStaffByFilter = async (req, res) => {
//     try {
//       const { keyword } = req.body;
//       console.log('Received data:', req.body);
//       if (!keyword || keyword.trim() === '') {
//         return res.status(400).json({ error: 'Keyword is required' });
//       }
//       let staff = null;
//       // Check if the keyword matches a staff ID
//       staff = await UserModel.getStaffById(keyword);
//       if (staff) {
//         return res.json({ success: true, staff });
//       }
//       // Check if the keyword matches a role name
//       const role_id = await UserModel.getRoleIdByName(keyword);
//       if (role_id) {
//         staff = await UserModel.getStaffByRole(role_id);
//         if (staff) {
//           return res.json({ success: true, staff });
//         }
//       }
//       // Check if the keyword matches a name (first or last)
//       staff = await UserModel.getStaffByName(keyword);
//       if (staff) {
//         return res.json({ success: true, staff });
//       }
//       // If no match is found
//       return res.status(404).json({ error: 'Staff not found' });
//     } catch (error) {
//       console.error('Error fetching staff:', error);
//       res.status(500).json({ error: 'An error occurred while fetching staff', details: error.message });
//     }
//   };
//   export const getStaffByRole = async (req, res) => {
//     try {
//       const { role } = req.body;
//       console.log('Received data:', req.body);
//       if (!role || role.trim() === '') {
//         return res.status(400).json({ error: 'Keyword is required' });
//       }
//       // Check if the keyword matches a role name
//       const role_id = await UserModel.getRoleIdByName(role);
//       if (role_id) {
//         const staff = await UserModel.getStaffByRole(role_id);
//         if (staff) {
//           return res.json({ success: true, staff });
//         }
//       }
//       // If no match is found
//       return res.status(404).json({ error: 'Staff not found' });
//     } catch (error) {
//       console.error('Error fetching staff:', error);
//       res.status(500).json({ error: 'An error occurred while fetching staff', details: error.message });
//     }
//   };

//   export const updateStaff = async (req, res) => {
//     try {
//       const { staff_emp_id } = req.params; // Original staff_id from params
//       const {
//         staff_id, role, designation, department, first_name, last_name,
//         father_name, mother_name, email, gender, dob, doj, phone_no, emergency_contact_no,
//         marital_status, photo, address, permanent_address, qualification, work_exp,
//         note, epf_no, basic_salary, contract_type, work_shift, work_location,
//         account_title, account_no, bank_name, ifsc_code, bank_branch,
//         facebook_url, twitter_url, linkedin_url, instagram_url, resume,
//         joining_letter, resignation_letter, other_documents
//       } = req.body;
//       console.log('Received Data:', req.body);
//       console.log('staff_emp_id:', staff_emp_id);
//       // Validate required fields
//       if (!role || !first_name || !email || !gender || !dob) {
//         return res.status(400).json({
//           error: 'Role, first_name, email, gender, and dob are required fields.'
//         });
//       }
//       // Check if original staff_id exists
//       const existingStaff = await UserModel.getStaffByStaffempId(staff_emp_id);
//       if (!existingStaff) {
//         return res.status(404).json({ error: 'Staff not found with the given staff_id.' });
//       }
//       // If `edited_staff_id` is provided, ensure it doesn't conflict with an existing record
//       if (staff_id && staff_id !== staff_emp_id) {
//         const conflictStaff = await UserModel.getStaffById(staff_id);
//         if (conflictStaff) {
//           return res.status(400).json({
//             error: 'The edited staff_id is already assigned to another staff member.'
//           });
//         }
//       }
//       // Fetch role ID, designation ID, and department ID
//       const role_id = await UserModel.getRoleIdByName(role);
//       if (!role_id) {
//         return res.status(400).json({ error: 'Invalid role name provided.' });
//       }
//       const staff_designation_id = await UserModel.getIdByDesignation(designation);
//       if (!staff_designation_id) {
//         return res.status(400).json({ error: 'Invalid designation name provided.' });
//       }
//       const department_id = await UserModel.getIdByDepartment(department);
//       if (!department_id) {
//         return res.status(400).json({ error: 'Invalid department name provided.' });
//       }
//       // Perform the update
//       const isUpdated = await UserModel.updateStaffDetails(
//         staff_emp_id, staff_id, role_id, staff_designation_id, department_id,
//         first_name, last_name, father_name, mother_name, email, gender, dob, doj,
//         phone_no, emergency_contact_no, marital_status, photo, address, permanent_address,
//         qualification, work_exp, note, epf_no, basic_salary, contract_type,
//         work_shift, work_location, account_title, account_no, bank_name,
//         ifsc_code, bank_branch, facebook_url, twitter_url, linkedin_url,
//         instagram_url, resume, joining_letter, resignation_letter, other_documents
//       );
//       if (isUpdated) {
//         return res.status(200).json({
//           success: true,
//           message: 'Staff updated successfully.'
//         });
//       } else {
//         return res.status(500).json({
//           success: false,
//           error: 'Failed to update staff details. Please try again later.'
//         });
//       }
//     } catch (error) {
//       console.error('Error updating staff:', error);
//       res.status(500).json({
//         error: 'An error occurred while updating staff.',
//         details: error.message
//       });
//     }
//   };
//   export const deleteStaffHandler = async (req, res) => {
//     try {
//       // Accept staff_id from query or body
//       const staff_emp_id = req.query.staff_emp_id || req.body.staff_emp_id;
//       console.log('Received staff_emp_id:', staff_emp_id);
//       // Validate input
//       if (!staff_emp_id) {
//         return res.status(400).json({ error: 'staff_emp_id is required' });
//       }
//       // Check if staff exists
//       const staff = await UserModel.getStaffByStaffempId(staff_emp_id);
//       if (!staff) {
//         return res.status(404).json({ error: 'Staff not found with the given staff_id.' });
//       }
//       // Check role restrictions
//       const restrictedRoles = [1, 2, 3, 4, 5, 6];
//       if (restrictedRoles.includes(staff.role_id)) {
//         return res.status(403).json({ error: 'Deletion of main roles staff is not allowed' });
//       }
//       // Perform deletion
//       const deleted = await UserModel.deleteStaff(staff_emp_id);
//       if (deleted) {
//         return res.status(200).json({ success: true, message: 'Staff deleted successfully' });
//       } else {
//         return res.status(500).json({ success: false, error: 'Failed to delete staff' });
//       }
//     } catch (error) {
//       console.error('Error deleting staff:', error);
//       res.status(500).json({ error: 'An error occurred while deleting staff', details: error.message });
//     }
//   };
//   export const addStaffPassword = async (req, res) => {
//     try {
//         const { staff_emp_id } = req.params;
//         const { new_password, confirm_password } = req.body;
//         console.log('Received Data:', req.body);
//         console.log('Received staff_emp_id:', staff_emp_id);
//         if ( new_password !== confirm_password ) {
//           return res.status(401).json({ error: 'Password does not match' });
//         }
//         const hashedPassword = await bcrypt.hash(new_password, 10);
//         console.log('Hashed Password:', hashedPassword); // Debugging: Log hashed password
//         const result = await UserModel.addStaffPassword(staff_emp_id, hashedPassword);
//         console.log('Password added:', result);
//         // if (name.toLowerCase() !== 'super admin') {
//         //   const role_id = await UserModel.updateRole(name, is_active, is_system, is_admin);
//         //   console.log('role_id:', role_id);
//         // }
//         // else {
//         //     return res.status(404).json({ error: 'Edit of Super Admin role is not possible' });
//         // }
//         res.status(201).json({success: true, message: 'Password added successfully', result});
//     } catch (error) {
//         console.error('Password adding Error:', error);
//         res.status(500).json({error: 'Password adding failed', details: error.message});
//     }
//   }

import * as StaffModel from '../models/staffModel.js';

import * as UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import dotenv from 'dotenv';
dotenv.config();
const jwtSecret = config.jwtSecret;
//Designation
export const createDesignation = async (req, res) => {
    try {
        const { designation, is_active = 1 } = req.body;
        console.log('Received Data:', req.body);
        // Validate required fields
        if (!designation) {
          return res.status(400).json({ error: 'Designation is required' });
        }
        // Create Designation in the database
        const designation_id = await StaffModel.createDesignation(designation, is_active);
        console.log('Designation_id:', designation_id);
        res.status(201).json({success: true, message: 'Designation created successfully', designation_id});
    } catch (error) {
        console.error('Designation Creation Error:', error);
        res.status(500).json({error: 'Designation creation failed', details: error.message});
    }
  }
  export const getIdByDesignation = async (req, res) => {
    try {
        const designation =req.query.designation || req.body.designation;
        console.log('Received Designation:', req.body.designation);
        if (!designation) {
          return res.status(400).json({ error: 'Designation is required' });
        }
        const designation_id = await StaffModel.getIdByDesignation(designation);
        if (designation_id) {
            return res.json(designation_id); // Return user data as JSON response
        } else {
            return res.status(404).json({ error: 'Designation not found' });
        }
    } catch (error) {
        console.error('Error fetching Designation:', error);
        res.status(500).json({error: 'Error fetching Designation', details: error.message});
    }
  }
  //Department
  export const createDepartment = async (req, res) => {
    try {
        const { department_name, is_active = 1 } = req.body;
        console.log('Received Data:', req.body);
        // Validate required fields
        if (!department_name) {
          return res.status(400).json({ error: 'Department is required' });
        }
        // Create role in the database
        const department_id = await StaffModel.createDepartment(department_name, is_active);
        console.log('Department_id:', department_id);
        res.status(201).json({success: true, message: 'Department created successfully', department_id});
    } catch (error) {
        console.error('Department Creation Error:', error);
        res.status(500).json({error: 'Department creation failed', details: error.message});
    }
  }
  export const getIdByDepartment = async (req, res) => {
    try {
        const department_name =req.query.department_name || req.body.department_name;
        console.log('Received department:', req.body.department_name);
        if (!department_name) {
          return res.status(400).json({ error: 'department is required' });
        }
        const department_id = await StaffModel.getIdByDepartment(department_name);
        if (department_id) {
            return res.json(department_id); // Return user data as JSON response
        } else {
            return res.status(404).json({ error: 'department not found' });
        }
    } catch (error) {
        console.error('Error fetching department:', error);
        res.status(500).json({error: 'Error fetching department', details: error.message});
    }
  }
export  const convertEmptyToNull = (obj) => {
  for (const key in obj) {
    console.log("convert")
    if (obj[key] === 'null') {
      console.log("im here")
      obj[key] = null;
    // } else if (typeof obj[key] === 'object' && obj[key] !== null) {
    //   convertEmptyToNull(obj[key]); // Recursive call for nested objects
    // }
    }
  }
  return obj;
};

  export const createStaff = async (req, res) => {
    try {
      let staffData = req.body;
      staffData = convertEmptyToNull(staffData);
        
        const { staff_id, role, designation, department, first_name, last_name,
          father_name, mother_name, email, gender, dob, doj, phone_no, emergency_contact_no,
          marital_status, photo, address, permanent_address, qualification, work_exp,
          note, epf_no, basic_salary, contract_type, work_shift, work_location,
          account_title, account_no, bank_name, ifsc_code, bank_branch,
          facebook_url, twitter_url, linkedin_url, instagram_url} = staffData;
          
          const resume = null;
          const joining_letter = null;
          const resignation_letter = null;
          const other_documents = null;

          console.log({
            staff_id: staff_id,
            role: role,
            designation: designation,
            department: department,
            first_name: first_name,
            last_name: last_name,
            father_name: father_name,
            mother_name: mother_name,
            email: email,
            gender: gender,
            dob: dob,
            doj: doj,
            phone_no: phone_no,
            emergency_contact_no: emergency_contact_no,
            marital_status: marital_status,
            photo: photo,
            address: address,
            permanent_address: permanent_address,
            qualification: qualification,
            work_exp: work_exp,
            note: note,
            epf_no: epf_no,
            basic_salary: basic_salary,
            contract_type: contract_type,
            work_shift: work_shift,
            work_location: work_location,
            account_title: account_title,
            account_no: account_no,
            bank_name: bank_name,
            ifsc_code: ifsc_code,
            bank_branch: bank_branch,
            facebook_url: facebook_url,
            twitter_url: twitter_url,
            linkedin_url: linkedin_url,
            instagram_url: instagram_url,
            resume: resume,
            joining_letter: joining_letter,
            resignation_letter: resignation_letter,
            other_documents: other_documents
        });
        // console.log('Received Data:', req.body);
       // console.log('data',staffData);
        // Validate required fields
        // if (!name) {
        //     return res.status(400).json({ success: false, message: 'All fields are required' });
        // }
        if (!staff_id || !role || !first_name || !email  || !dob || staff_id == null || role == null || first_name == null || email == null || gender == null || dob == null) {
          return res.status(400).json({ error: 'staff_id, role, first_name, email, gender and date of birth fields are required and should not be null' });
        }
         // Check if staff_id already exists
      const existingStaff = await StaffModel.getStaffById(staff_id);
      if (existingStaff) {
        return res.status(400).json({ error: 'Staff ID already exists' });
      }
       // Check if staff_id already exists
       const existingEmail = await StaffModel.getStaffByEmail(staff_id);
       if (existingEmail) {
         return res.status(400).json({ error: 'Email already exists' });
       }
        // Fetch role ID, designation ID, and department ID
      const role_id = await UserModel.getRoleIdByName(role);
      if (!role_id) {
        return res.status(400).json({ error: 'Invalid role' });
      }
      console.log('Role ID:', role_id);
      const staff_designation_id = await StaffModel.getIdByDesignation(designation);
      if (!staff_designation_id) {
        return res.status(400).json({ error: 'Invalid designation' });
      }
      console.log('Designation ID:', staff_designation_id);
      const department_id = await StaffModel.getIdByDepartment(department);
      if (!department_id) {
        return res.status(400).json({ error: 'Invalid department' });
      }
      console.log('Department ID:', department_id);
        // Create role in the database
        const staff = await StaffModel.createStaff(staff_id, role_id, staff_designation_id, department_id, first_name, last_name,
          father_name, mother_name, email, gender, dob, doj, phone_no, emergency_contact_no,
          marital_status, photo, address, permanent_address, qualification, work_exp,
          note, epf_no, basic_salary, contract_type, work_shift, work_location,
          account_title, account_no, bank_name, ifsc_code, bank_branch,
          facebook_url, twitter_url, linkedin_url, instagram_url, resume,
          joining_letter, resignation_letter, other_documents);
          console.log('Staff:', staff);
        res.status(201).json({success: true, message: 'Staff created successfully', staff});
    } catch (error) {
        console.error('Staff Creation Error:', error);
        res.status(500).json({error: 'Staff creation failed', details: error.message});
    }
  }
  export const getAllStaff = async (req, res) => {
    try {
        const staff = await StaffModel.getAllStaff();
        if (staff) {
            return res.json(staff); // Return user data as JSON response
        } else {
            return res.status(404).json({ error: 'Staff not found' });
        }
    } catch (error) {
        console.error('Error fetching staff:', error);
        res.status(500).json({error: 'Error fetching staff', details: error.message});
    }
  }
  export const getStaffByFilter = async (req, res) => {
    try {
      const { keyword } = req.body;
      console.log('Received data:', req.body);
      if (!keyword || keyword.trim() === '') {
        return res.status(400).json({ error: 'Keyword is required' });
      }
      let staff = null;
      // Check if the keyword matches a staff ID
      staff = await StaffModel.getStaffById(keyword);
      if (staff) {
        return res.json({ success: true, staff });
      }
      // Check if the keyword matches a role name
      const role_id = await StaffModel.getRoleIdByName(keyword);
      if (role_id) {
        staff = await StaffModel.getStaffByRole(role_id);
        if (staff) {
          return res.json({ success: true, staff });
        }
      }
      // Check if the keyword matches a name (first or last)
      staff = await StaffModel.getStaffByName(keyword);
      if (staff) {
        return res.json({ success: true, staff });
      }
      // If no match is found
      return res.status(404).json({ error: 'Staff not found' });
    } catch (error) {
      console.error('Error fetching staff:', error);
      res.status(500).json({ error: 'An error occurred while fetching staff', details: error.message });
    }
  };

  export const getStaffByRole = async (req, res) => {
    try {
      const { role } = req.body;
      console.log('Received data:', req.body);
      if (!role || role.trim() === '') {
        return res.status(400).json({ error: 'Keyword is required' });
      }
      // Check if the keyword matches a role name
      const role_id = await StaffModel.getRoleIdByName(role);
      if (role_id) {
        const staff = await StaffModel.getStaffByRole(role_id);
        if (staff) {
          return res.json({ success: true, staff });
        }
      }
      // If no match is found
      return res.status(404).json({ error: 'Staff not found' });
    } catch (error) {
      console.error('Error fetching staff:', error);
      res.status(500).json({ error: 'An error occurred while fetching staff', details: error.message });
    }
  };
  export const updateStaff = async (req, res) => {
    try {
      const { staff_emp_id } = req.params; // Original staff_id from params
      const {
        staff_id, role, designation, department, first_name, last_name,
        father_name, mother_name, email, gender, dob, doj, phone_no, emergency_contact_no,
        marital_status, photo, address, permanent_address, qualification, work_exp,
        note, epf_no, basic_salary, contract_type, work_shift, work_location,
        account_title, account_no, bank_name, ifsc_code, bank_branch,
        facebook_url, twitter_url, linkedin_url, instagram_url, resume,
        joining_letter, resignation_letter, other_documents
      } = req.body;
      console.log('Received Data:', req.body);
      console.log('staff_emp_id:', staff_emp_id);
      // Validate required fields
      if (!staff_id || !role || !first_name || !email || !gender || !dob || staff_id == null || role == null || first_name == null || email == null || gender == null || dob == null) {
        return res.status(400).json({ error: 'staff_id, role, first_name, email, gender and date of birth fields are required and should not be null' });
      }
      // Check if original staff_id exists
      const existingStaff = await StaffModel.getStaffByStaffempId(staff_emp_id);
      if (!existingStaff) {
        return res.status(404).json({ error: 'Staff not found with the given staff_id.' });
      }
      // Fetch role ID, designation ID, and department ID
      const role_id = await UserModel.getRoleIdByName(role);
      if (!role_id) {
        return res.status(400).json({ error: 'Invalid role name provided.' });
      }
      const staff_designation_id = await StaffModel.getIdByDesignation(designation);
      if (!staff_designation_id) {
        return res.status(400).json({ error: 'Invalid designation name provided.' });
      }
      const department_id = await StaffModel.getIdByDepartment(department);
      if (!department_id) {
        return res.status(400).json({ error: 'Invalid department name provided.' });
      }
      // Perform the update
      const isUpdated = await StaffModel.updateStaffDetails(
        staff_emp_id, staff_id, role_id, staff_designation_id, department_id,
        first_name, last_name, father_name, mother_name, email, gender, dob, doj,
        phone_no, emergency_contact_no, marital_status, photo, address, permanent_address,
        qualification, work_exp, note, epf_no, basic_salary, contract_type,
        work_shift, work_location, account_title, account_no, bank_name,
        ifsc_code, bank_branch, facebook_url, twitter_url, linkedin_url,
        instagram_url, resume, joining_letter, resignation_letter, other_documents
      );
      if (isUpdated) {
        return res.status(200).json({
          success: true,
          message: 'Staff updated successfully.'
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Failed to update staff details. Please try again later.'
        });
      }
    } catch (error) {
      console.error('Error updating staff:', error);
      res.status(500).json({
        error: 'An error occurred while updating staff.',
        details: error.message
      });
    }
  };
  export const deleteStaffHandler = async (req, res) => {
    try {
      // Accept staff_id from query or body
      const staff_emp_id = req.query.staff_emp_id || req.body.staff_emp_id;
      console.log('Received staff_emp_id:', staff_emp_id);
      // Validate input
      if (!staff_emp_id) {
        return res.status(400).json({ error: 'staff_emp_id is required' });
      }
      // Check if staff exists
      const staff = await StaffModel.getStaffByStaffempId(staff_emp_id);
      if (!staff) {
        return res.status(404).json({ error: 'Staff not found with the given staff_id.' });
      }
      // Check role restrictions
      const restrictedRoles = [1, 2, 3, 4, 5, 6];
      if (restrictedRoles.includes(staff.role_id)) {
        return res.status(403).json({ error: 'Deletion of main roles staff is not allowed' });
      }
      // Perform deletion
      const deleted = await StaffModel.deleteStaff(staff_emp_id);
      if (deleted) {
        return res.status(200).json({ success: true, message: 'Staff deleted successfully' });
      } else {
        return res.status(500).json({ success: false, error: 'Failed to delete staff' });
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
      res.status(500).json({ error: 'An error occurred while deleting staff', details: error.message });
    }
  };
  export const addStaffPassword = async (req, res) => {
    try {
        const { staff_emp_id } = req.params;
        const { new_password, confirm_password } = req.body;
        console.log('Received Data:', req.body);
        console.log('Received staff_emp_id:', staff_emp_id);
        if ( new_password !== confirm_password ) {
          return res.status(401).json({ error: 'Password does not match' });
        }
        const hashedPassword = await bcrypt.hash(new_password, 10);
        console.log('Hashed Password:', hashedPassword); // Debugging: Log hashed password
        const result = await StaffModel.addStaffPassword(staff_emp_id, hashedPassword);
        console.log('Password added:', result);
        // if (name.toLowerCase() !== 'super admin') {
        //   const role_id = await UserModel.updateRole(name, is_active, is_system, is_admin);
        //   console.log('role_id:', role_id);
        // }
        // else {
        //     return res.status(404).json({ error: 'Edit of Super Admin role is not possible' });
        // }
        res.status(201).json({success: true, message: 'Password added successfully', result});
    } catch (error) {
        console.error('Password adding Error:', error);
        res.status(500).json({error: 'Password adding failed', details: error.message});
    }
  }
  //-------------------------------------------------------------------------------------------------------------------------
//   // Staff Login
// export const staffLogin = async (req, res) => {
//   const { email, password } = req.body;
//   // Validate Input
//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required' });
//   }
//   try {
//     // Fetch staff details by email
//     const staff = await StaffModel.getStaffByEmail(email);
//     console.log(staff)
//     if (!staff) {
//       return res.status(404).json({ error: 'Staff not found' });
//     }
//     // Validate password
//     const isPasswordValid = await bcrypt.compare(password, staff.password);
//     console.log(isPasswordValid, staff.password)
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }
//     // Generate Access and Refresh Tokens
//     const accessToken = jwt.sign(
//       { staff_id: staff.staff_id, role_id: staff.role_id ,email:staff.email},
//       jwtSecret,
//       { expiresIn: '15m' }
//     );
//     const refreshToken = jwt.sign(
//       { staff_id: staff.staff_id, role_id: staff.role_id },
//       jwtSecret,
//       { expiresIn: '7d' }
//     );
//     // Set Refresh Token in Cookie
//     res.cookie('refreshToken', refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });
//     // Return response
//     res.status(200).json({
//       message: 'Login successful',
//       accessToken,
//       staff: {
//         staff_id: staff.staff_id,
//         email: staff.email,
//         role_id: staff.role_id,
//         first_name: staff.first_name,
//         last_name: staff.last_name,
//       },
//     });
//   } catch (error) {
//     console.error('Login Error:', error.message);
//     res.status(500).json({ error: 'Login failed', details: error.message });
//   }
// };
// -------------------------------------------
// export const staffLogin = async (req, res) => {
//   const { email, password } = req.body;

//   // Validate Input
//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   try {
//     // Fetch staff details by email
//     const staff = await UserModel.getStaffByEmail(email);

//     if (!staff) {
//       return res.status(404).json({ error: 'Staff not found' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, staff.password);
//     console.log(isPasswordValid, staff.password)
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }
//     // Generate Access and Refresh Tokens
//     const accessToken = jwt.sign(
//       { staff_id: staff.staff_id, role_id: staff.role_id,email:staff.email },
//       jwtSecret,
//       { expiresIn: '15m' }
//     );

//     const refreshToken = jwt.sign(
//       { staff_id: staff.staff_id, role_id: staff.role_id },
//       jwtSecret,
//       { expiresIn: '7d' }
//     );

//     // Set Refresh Token in Cookie
//     res.cookie('refreshToken', refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     // Return response
//     res.status(200).json({
//       message: 'Login successful',
//       accessToken,
//       staff: {
//         staff_id: staff.staff_id,
//         email: staff.email,
//         role_id: staff.role_id,
//         first_name: staff.first_name,
//         last_name: staff.last_name,
//       },
//     });
//   } catch (error) {
//     console.error('Login Error:', error.message);
//     res.status(500).json({ error: 'Login failed', details: error.message });
//   }
// };


export const staffLogin = async (req, res) => {
  const { email, password } = req.body;
  // Validate Input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    // Fetch staff details by email
    const staff = await UserModel.getStaffByEmail(email);

    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, staff.password);
    console.log(isPasswordValid, staff.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    console.log(isPasswordValid)

    const staffRole = await UserModel.getRoleById(staff.role_id);
    // Generate Access and Refresh Tokens
    const accessToken = jwt.sign(
      { staff_id: staff.staff_id, role_id: staff.role_id, email:staff.email},
      jwtSecret,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { staff_id: staff.staff_id, role_id: staff.role_id, email:staff.email},
      jwtSecret,
      { expiresIn: '7d' }
    );
    // Set Refresh Token in Cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // Return response
    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      staff: {
        staff_id: staff.staff_id,
        email: staff.email,
        role_id: staff.role_id,
        first_name: staff.first_name,
        last_name: staff.last_name,
        role: staffRole.name,
      },
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};
export const staffRefreshToken = async (req, res) => {
  try {
    // Log the request to debug cookies and body data
    console.log('Cookies:', req.cookies);
    console.log('Request Body:', req.body);
    // Retrieve the refresh token from cookies or the request body
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token, authorization denied' });
    }
    // Verify the refresh token
    jwt.verify(refreshToken, jwtSecret, async (err, decoded) => {
      if (err) {
        console.error('JWT Verify Error:', err);
        return res.status(403).json({ error: 'Invalid or expired refresh token' });
      }
      // Log the decoded token
      console.log('Decoded JWT:', decoded);
      const { staff_id, role_id, email } = decoded;
      if (!staff_id || !role_id || !email) {
        return res.status(400).json({ error: 'Invalid token data' });
      }
      // Generate a new access token
      const newAccessToken = jwt.sign(
        { staff_id, role_id, email },
        jwtSecret,
        { expiresIn: '15m' }
      );
      return res.status(200).json({
        message: 'Access token refreshed successfully',
        accessToken: newAccessToken,
      });
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(500).json({ error: 'Error refreshing token' });
  }
};
export const staffLogout = async (req, res) => {
  try{
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true
    });
    res.status(200).json({ message: 'Logout successful'});
  }
  catch (error) {
    res.status(500).json({ error: 'Logout failed', details: error.message });
  }
};