const devUrl = "http://localhost:5000/";
const prodUrl = "https://hackathonbackend-v6i2.onrender.com/";

// Set BASE_URL depending on the environment
export const BASE_URL = process.env.NODE_ENV === "production" ? prodUrl : devUrl;

export const AppRoutes = {
  // Authentication Routes
  login: BASE_URL + "api/v1/employee/emp-login",
  addEmployee: BASE_URL + "api/v1/employee/emp-registration",
  getFindUpdateWithPassword: BASE_URL + "api/v1/employee/update-password",
  
  // Employee Routes
  getAllEmployees: BASE_URL + "api/v1/employee/all-employees",
  deleteEmployee: BASE_URL + "api/v1/employee/:id",
  updateEmployee: BASE_URL + "api/v1/employee/:id",

  // City Routes
  addCity: BASE_URL + "api/v1/city/add-city",
  getAllCities: BASE_URL + "api/v1/city/all-cities",
  getCityById: BASE_URL + "api/v1/city/single-city/:id",
  updateCity: BASE_URL + "api/v1/city/update-city/:id",
  deleteCity: BASE_URL + "api/v1/city/delete-city/:id",

  // Branch Routes
  addBranch: BASE_URL + "api/v1/branch/add-branch",
  getAllBranches: BASE_URL + "api/v1/branch/all-branches",
  updateBranch: BASE_URL + "api/v1/branch/update-branch/:id",
  deleteBranch: BASE_URL + "api/v1/branch/delete-branch/:id",
  getSingleBranch: BASE_URL + "api/v1/branch/single-branch/:id",

  // Departments Routes
  addDepartment: BASE_URL + "api/v1/department/add-department",
  getAllDepartments: BASE_URL + "api/v1/department/all-departments",
  updateDepartment: BASE_URL + "api/v1/department/update-department/:id",
  deleteDepartment: BASE_URL + "api/v1/department/delete-department/:id",
  getSingleDepartment: BASE_URL + "api/v1/department/single-department",

  // Seekers Routes
  addSeeker: BASE_URL + "api/v1/seeker/add-seeker",
  getAllSeekers: BASE_URL + "api/v1/seeker/all-seekers",
  updateSeeker: BASE_URL + "api/v1/seeker/update-seeker/:id",
  deleteSeeker: BASE_URL + "api/v1/seeker/delete-seeker/:id",
  getSingleSeeker: BASE_URL + "api/v1/seeker/single-seeker",

  // // Seekers Routes
  // addClass: BASE_URL + "api/v1/class/add-class",
  // getAllClasses: BASE_URL + "api/v1/class/all-classes",
  // getClassById: BASE_URL + "api/v1/class/single-class/:id",
  // updateClass: BASE_URL + "api/v1/class/update-class/:id",
  // deleteClass: BASE_URL + "api/v1/class/delete-class/:id",
  // classCount: BASE_URL + "api/v1/class/class-count",

  // Batch Sections
  // addSection: BASE_URL + "api/v1/section/add-section",
  // getAllSections: BASE_URL + "api/v1/section/all-sections",
  // updateSection: BASE_URL + "api/v1/section/update-section/:id",
  // deleteSection: BASE_URL + "api/v1/section/delete-section/:id",

  // // Assignment Routes
  // addAssignment: BASE_URL + "api/v1/assignment/add-assignment",
  // getAllAssignments: BASE_URL + "api/v1/assignment/all-assignments",
  // getSingleAssignments: BASE_URL + "api/v1/assignment/single-assignment/:id",
  // updateAssignment: BASE_URL + "api/v1/assignment/update-assignment/:id",
  // deleteAssignment: BASE_URL + "api/v1/assignment/delete-assignment/:id",
};
