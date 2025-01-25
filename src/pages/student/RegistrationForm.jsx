import React from 'react'
import { useForm } from "react-hook-form";

const StudentRegistration = () => {


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Student Registration Form
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 outline-none"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* CNIC */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">CNIC</label>
            <input
              type="text"
              {...register("cnic", {
                required: "CNIC is required",
                pattern: {
                  value: /^[0-9]{13}$/,
                  message: "CNIC must be a 13-digit number",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 outline-none"
              placeholder="Enter your CNIC"
            />
            {errors.cnic && (
              <p className="text-red-500 text-sm">{errors.cnic.message}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mobile Number</label>
            <input
              type="text"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^03[0-9]{9}$/,
                  message: "Enter a valid Pakistani mobile number",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 outline-none"
              placeholder="Enter your mobile number"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
            <input
              type="date"
              {...register("dob", { required: "Date of Birth is required" })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 outline-none"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob.message}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Country</label>
            <select
              {...register("country", { required: "Country is required" })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 outline-none"
            >
              <option value="">Select your country</option>
              <option value="Pakistan">Pakistan</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">City</label>
            <select
              {...register("city", { required: "City is required" })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 outline-none"
            >
              <option value="">Select your city</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
            </select>
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          {/* Course */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Course</label>
            <select
              {...register("course", { required: "Course is required" })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 outline-none"
            >
              <option value="">Select your course</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="AI">AI</option>
            </select>
            {errors.course && (
              <p className="text-red-500 text-sm">{errors.course.message}</p>
            )}
          </div>

          {/* Proficiency */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Computer Proficiency</label>
            <select
              {...register("proficiency", { required: "Computer Proficiency is required" })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 outline-none"
            >
              <option value="">Select your proficiency</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            {errors.proficiency && (
              <p className="text-red-500 text-sm">{errors.proficiency.message}</p>
            )}
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Last Qualification</label>
            <select
              {...register("qualification", { required: "Qualification is required" })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 outline-none"
            >
              <option value="">Select your qualification</option>
              <option value="Matric">Matric</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
            </select>
            {errors.qualification && (
              <p className="text-red-500 text-sm">{errors.qualification.message}</p>
            )}
          </div>

          {/* Laptop */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Do you have a Laptop?</label>
            <select
              {...register("laptop", { required: "Laptop status is required" })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 outline-none"
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.laptop && (
              <p className="text-red-500 text-sm">{errors.laptop.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Upload Your Image</label>
            <input
              type="file"
              {...register("image", { required: "Image upload is required" })}
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 outline-none" 
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="outline-none w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;
