// import config from '../config.js';

// const db = config.db;

// const RolePermission = {
//   getPermissionsByRole: (roleId, callback) => {
//     db.query(
//       'SELECT * FROM roles_permissions WHERE role_id = ?',
//       [roleId],
//       callback
//     );
//   },
//   assignPermission: (roleId, permissionCategoryId, canView, canAdd, canEdit, canDelete, callback) => {
//     db.query(
//       `INSERT INTO roles_permissions (role_id, permission_category_id, can_view, can_add, can_edit, can_delete) 
//        VALUES (?, ?, ?, ?, ?, ?)`,
//       [roleId, permissionCategoryId, canView, canAdd, canEdit, canDelete],
//       callback
//     );
//   },
// };

// module.exports = RolePermission;




// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
// const Role = require('../models/role')

// const RolePermission = sequelize.define('RolePermission', {
//   role_permission_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   role_id: { type: DataTypes.INTEGER },
//   permission_category_id: { type: DataTypes.INTEGER },
//   can_view: { type: DataTypes.BOOLEAN, defaultValue: false },
//   can_add: { type: DataTypes.BOOLEAN, defaultValue: false },
//   can_edit: { type: DataTypes.BOOLEAN, defaultValue: false },
//   can_delete: { type: DataTypes.BOOLEAN, defaultValue: false },
//   created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
// }, {
//   tableName: 'roles_permissions',
//   timestamps: false,
// });

// RolePermission.belongsTo(Role, { foreignKey: 'role_id' });

// export default RolePermission;
