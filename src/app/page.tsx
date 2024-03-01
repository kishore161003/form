"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { SignUpForm, signUpSchema } from "../../lib/types";

// with zod we can use useform to register the Fields and handleSubmit only
// But Validations are done by zod and it can be connected through through zodResolver

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<SignUpForm>({
    //  for connecting the schema to the form
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    console.log(data);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        // confirmPassword: data.confirmPassword,
        confirmPassword: 123,
        // if you pass Number on confirmPassword, it will throw an error from the Server by Zod validation
      }),
    });

    const resData = await res.json();

    // if there are errors in the response, we can connect the error to the field
    if (resData.errors) {
      const errors = resData.errors;
      if (errors.email) {
        setError("email", { message: resData.errors.email });
      } else if (errors.password) {
        setError("password", { message: resData.errors.password });
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          message: resData.errors.confirmPassword,
        });
      } else {
        alert("Something went wrong, Please try again");
      }
    }

    // reset();
  };

  return (
    <div className="flex justify-center items-center h-[600px]">
      <form
        className="flex flex-col items-center m-10 p-5 w-[400px] gap-y-2 rounded bg-gray-500 shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="p-2 rounded-md text-black"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="p-2 rounded-md text-black"
        />
        {errors.password && (
          <p className="text-red-800 ml-10">{`${errors.password.message}`}</p>
        )}
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
          className="p-2 rounded-md text-black"
        />
        {errors.confirmPassword && (
          <p className="text-red-800 ml-10">{`${errors.confirmPassword.message}`}</p>
        )}
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-black px-8 disabled:bg-slate-500 py-2 rounded-lg "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
