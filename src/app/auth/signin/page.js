"use client";
import { FormControl, FormLabel } from "@mui/joy";
import { Sheet } from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { routesUrl } from "@/utils/pagesurl";
import InputField from "../../../component/shared/form/InputField";
import { errorMsg, successMsg } from "../../../component/Toastmsg/toaster";
import { signIn, useSession } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginvalidation } from "@/component/Validation/loginvalidation";
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginvalidation) });
  const [error, setError] = useState(null);
  const router = useRouter()
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        errorMsg("Invalid credentials");
      } else {
        router.replace(routesUrl.products);
        successMsg("Login Successfully");
      }
    } catch (error) {
      errorMsg("Login Error");
    }
  };
  return (
    <Sheet
      sx={{
        width: 500,
        mx: "auto",
        my: 4,
        py: 3,
        px: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
      variant="outlined"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Typography variant="h4">
            <b>Welcome!</b>
          </Typography>
          <Typography variant="body2">Sign in to continue.</Typography>
        </div>

        <div>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <InputField
              control={control}
              name="email"
              type="email"
              placeholder="example123@gmail.com"
              required
            />
            <Typography variant="body2" color="error" gutterBottom>
              {" "}
              {errors?.email?.message}
            </Typography>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputField
              control={control}
              name="password"
              type="password"
              required
            />
            <Typography variant="body2" color="error" gutterBottom>
              {" "}
              {errors?.password?.message}
            </Typography>
          </FormControl>
        </div>
        <br />
        <div>
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer px-6 py-2 rounded-md transition duration-300"
          >
            Login
          </Button>
        </div>
        <div className="mt-5 ml-1">
          {error}
          <Typography variant="body2" sx={{ alignSelf: "center" }}>
            Dont have an account?{" "}
            <Link href="/sign-up" className="mr-2">
              Sign up
            </Link>
          </Typography>
        </div>
      </form>
      <button
        onClick={() => signIn("google")}
        className="flex items-center justify-center bg-white border border-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300 shadow-sm"
      >
        <GoogleIcon className="mr-2" /> Sign in with Google
      </button>
      <button
        onClick={() => signIn("twitter")}
        className="flex items-center justify-center bg-blue-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300 shadow-sm"
      >
        <XIcon className="mr-2" /> Sign in with Twitter
      </button>

      <button
        onClick={() => signIn("github")}
        className="flex items-center justify-center bg-gray-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300 shadow-sm"
      >
        <GitHubIcon className="mr-2" /> Sign in with GitHub
      </button>
    </Sheet>
  );
};

export default Login;
