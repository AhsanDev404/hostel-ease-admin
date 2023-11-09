'use client'
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";

const AdminHeader = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle search logic here
    console.log(data.search);
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-8 flex items-center justify-between">
      <h1 className="text-2xl font-bold">My App</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center ml-4">
        <div className="relative">
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Search"
                className="py-2 pr-8 pl-4 rounded-l border-none focus:outline-none focus:ring focus:border-blue-300"
              />
            )}
          />
          <div className="absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-400">
            <AiOutlineSearch />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 ml-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Search
        </button>
      </form>
    </header>
  );
};

export default AdminHeader;
