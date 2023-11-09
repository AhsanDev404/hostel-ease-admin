"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaUser, FaLock } from "react-icons/fa";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app, db } from "@/utils/firbase";
import ErrorModal from "@/components/ErrorModal";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "@firebase/firestore";
import { setUser } from "@/redux/slices/authSlice";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  useEffect(() => {
    const meData = async () => {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnapshot = await getDoc(userDocRef);
            const userData = userDocSnapshot.data();
            const userRole = userData.role;
            
            dispatch(
              setUser({
                uid: user.uid,
                email: user.email,
                role: userRole,
                // Add more user details here if needed
              })
            );
            if (userRole === "admin") {
              router.push("/admin");
            } else if (userRole === "manager") {
              router.push("/manager");
            } else {
              router.push("/not-found");
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    meData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render
  
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();
      const userRole = userData.role;

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          role: userRole,
          // Add more user details here if needed
        })
      );
      if (userRole === "admin") {
        router.push("/admin");
      } else if (userRole === "manager") {
        router.push("/manager");
      } else {
        router.push("/not-found");
      }
      // You can redirect the user or perform other actions upon successful login
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="block text-sm text-gray-600 mr-3">
                <FaUser />
              </label>
              <Controller
                name="email"
                defaultValue=""
                control={control}
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
          <div className="flex my-2 justify-end">
            <Link href={"/forgot-password"}>Forgot Password</Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
    </div>
  );
};

export default LoginPage;
