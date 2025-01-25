const devUrl = "http://localhost:4000/";
const prodUrl = "https://lmsportalb.onrender.com/";

// Set BASE_URL depending on the environment
export const BASE_URL = process.env.NODE_ENV === 'production' ? prodUrl : prodUrl;

export const AppRoutes = {
  // Authentication Routes
  login: BASE_URL + "api/v1/user/user-login",
  register: BASE_URL + "api/v1/user/new-register",
  getMyInfo: BASE_URL + "api/v1/user/:id",


  // Campus Routes
  addCampus: BASE_URL + "api/v1/campus/add-campus",
  getAllCampuses: BASE_URL + "api/v1/campus/all-campuses",
  updateCampus: BASE_URL + "api/v1/campus/update-campus/:id",
  deleteCampus: BASE_URL + "api/v1/campus/delete-campus/:id",
  getSingleCampus: BASE_URL + "api/v1/campus/single-campus/:id",

  // City Routes
  addCity: BASE_URL + "api/v1/city/add-city",
  getAllCities: BASE_URL + "api/v1/city/all-cities",
  getCityById: BASE_URL + "api/v1/city/single-city/:id",
  updateCity: BASE_URL + "api/v1/city/update-city/:id",
  deleteCity: BASE_URL + "api/v1/city/delete-city/:id",


  // Course Routes
  addCourse: BASE_URL + "api/v1/course/add-course",
  getAllCourses: BASE_URL + "api/v1/course/all-courses",
  updateCourse: BASE_URL + "api/v1/course/update-course/:id",
  deleteCourse: BASE_URL + "api/v1/course/delete-course/:id",
  getSingleCourse: BASE_URL + "api/v1/course/single-course",
 

  // Batch Routes
  addBatch: BASE_URL + "api/v1/batch/add-batch",
  getAllBatches: BASE_URL + "api/v1/batch/all-batches",
  updateBatch: BASE_URL + "api/v1/batch/update-batch/:id",
  deleteBatch: BASE_URL + "api/v1/batch/delete-batch/:id",
  getSingleBatch: BASE_URL + "api/v1/batch/single-batch",

  // User Routes
  getAllUsers: BASE_URL + "api/v1/user/all-users",
  deleteUser: BASE_URL + "api/v1/user/:id",
  addUser: BASE_URL + "api/v1/user/smit-registration",
  updateUser: BASE_URL + "api/v1/user/:id",
  getSingleUser: BASE_URL + "api/v1/user/single-user",

  // Class Routes
  addClass: BASE_URL + "api/v1/class/add-class",
  getAllClasses: BASE_URL + "api/v1/class/all-classes",
  getClassById: BASE_URL + "api/v1/class/single-class/:id",
  updateClass: BASE_URL + "api/v1/class/update-class/:id",
  deleteClass: BASE_URL + "api/v1/class/delete-class/:id",
  classCount: BASE_URL + "api/v1/class/class-count",

  // Batch Sections
  addSection: BASE_URL + "api/v1/section/add-section",
  getAllSections: BASE_URL + "api/v1/section/all-sections",
  updateSection: BASE_URL + "api/v1/section/update-section/:id",
  deleteSection: BASE_URL + "api/v1/section/delete-section/:id",

  // Assignment Routes
  addAssignment: BASE_URL + "api/v1/assignment/add-assignment",
  getAllAssignments: BASE_URL + "api/v1/assignment/all-assignments",
  getSingleAssignments: BASE_URL + "api/v1/assignment/single-assignment/:id",
  updateAssignment: BASE_URL + "api/v1/assignment/update-assignment/:id",
  deleteAssignment: BASE_URL + "api/v1/assignment/delete-assignment/:id",
};