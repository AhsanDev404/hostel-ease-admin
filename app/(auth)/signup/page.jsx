"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaUser, FaLock } from "react-icons/fa";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app ,db } from "@/utils/firbase";
import ErrorModal from "@/components/ErrorModal";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import { doc, setDoc } from "@firebase/firestore";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignupPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const auth = getAuth(app);
  const [error, setError] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        role: "manager",
      });
      const userData = {
        uid: user.uid,
        email: user.email,
        role:"manager"
        // Add more user details here if needed
      };
      dispatch(setUser(userData));
     
      router.push('/manager')

      return user;
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="block text-sm text-gray-600 mr-3">
                <FaUser />
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue="" // Set default value if needed
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className={`w-full py-2 border-b focus:outline-none focus:border-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                )}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="block text-sm text-gray-600 mr-3">
                <FaLock />
              </label>
              <div className="relative w-full">
                <Controller
                  name="password"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className={`w-full py-2 border-b focus:outline-none focus:border-blue-500 ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  )}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiTwotoneEyeInvisible fontSize={20} />
                  ) : (
                    <AiTwotoneEye fontSize={20} />
                  )}
                </button>
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="block text-sm text-gray-600 mr-3">
                <FaLock />
              </label>
              <div className="relative w-full">
                <Controller
                  name="confirmPassword"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className={`w-full py-2 border-b focus:outline-none focus:border-blue-500 ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <AiTwotoneEyeInvisible fontSize={20} />
                  ) : (
                    <AiTwotoneEye fontSize={20} />
                  )}
                </button>
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/" className="text-blue-500 hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
    </div>
  );
};

export default SignupPage;
