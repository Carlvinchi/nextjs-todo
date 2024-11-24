import React from 'react'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { SquarePen, Trash, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { useTodoStore } from '@/app/store/todoStore';
import { useToast } from "@/hooks/use-toast"


function PendingTask() {

    const { toast } = useToast();
    const {Todos, remove, setCompleted, setEdit, removeAllPending} = useTodoStore();

    const toastAlert = () => {
      toast(
        {
          variant: "destructive",
          title: "Task Deleted",
          description: "Your task has been deleted successfully"
        }
      );

  }

  const handleSingleDelete = (id) => {
    remove(id);
    toastAlert();
  }

  const handleDeleteAllPending = () => {

    removeAllPending();
    toastAlert();
  }


  return (
    <div>


        <Card className="w-auto">
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>Tasks you are yet to do</CardDescription>
          </CardHeader>
          <CardContent>
            
          <div className="grid w-full items-center gap-4">
                
            {
              Todos.map((todo, index) => (
                (!todo.completed && !todo.toggleEdit)  ? 

                <div className="flex items-center space-x-2 mb-3" key={todo.id}>

                    <div>

                    <Checkbox checked={todo.completed} onCheckedChange={()=>setCompleted(todo.id)} />
                    <span className={`flex-1 ml-2 text-lg ${todo.completed ? 'line-through' : ""}`}>{index+1}. {todo.text}</span> 
                      <p className="flex text-start text-sm mt-2">
                        Priority: {todo.priority} |  
                        {
                          todo.priority === "Low" ? (
                            <><Star className='bg-black-600' /></>
                          ) : todo.priority === "Medium" ? (
                            <><Star className='bg-yellow-400'/><Star className='bg-yellow-400'/></>
                          ) : todo.priority === "High" ? (
                            <><Star className='bg-red-500'/><Star className='bg-red-500'/><Star className='bg-red-500'/></>
                          ) : null
                        }
                      </p> 
                      <p className="flex text-start text-sm mt-2">Date Added: {todo.dateCreated} </p>  
                    </div>

                <Button  size="sm" onClick={()=> setEdit(todo.id)}> 
                  <SquarePen/>
                </Button>
                
                <AlertDialog>
                <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" > <Trash/> </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete this task.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=> handleSingleDelete(todo.id)}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>


                </div> 
                
                

                : ""

              ))
            }

          </div>

          </CardContent>
          <CardFooter className="flex justify-center">
            
            
            <AlertDialog>
                <AlertDialogTrigger asChild>
                <Button variant="destructive" >Delete All</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete all your pending task.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=> handleDeleteAllPending()}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </CardFooter>
        </Card>


    </div>
  )
}

export default PendingTask