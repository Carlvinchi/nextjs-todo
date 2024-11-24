"use client"

import AddTask from "@/components/AddTask";
import PendingTask from "@/components/PendingTask";
import CompletedTask from "@/components/CompletedTask";

export default function Home() {


  return (
    <main>
      <div className="w-screen bg-gray-800 h-40 text-center">

        <h1 className="text-3xl text-white pt-10 font-semibold tracking-wide">Welcome To Todooly</h1>

        <p className="mt-2 text-white">A todo app to make your life easier</p>
      
      </div>


      <div className="flex flex-row bg-[url('/images/computer.jpg')] bg-cover h-screen w-screen">

        <div className="basis-1/3 p-5">

          <AddTask/>

        </div>


        <div className="basis-1/3 p-5">

          <PendingTask/>

        </div>

        <div className="basis-1/3 p-5">
          
          <CompletedTask/>

        </div>

       
      </div>

    
    </main>
  );
}
