import React from 'react'

import { Button } from "@/components/ui/button";
import { Star, Trash } from "lucide-react";
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

function CompletedTask() {
    const { toast } = useToast();
    const {Todos, remove, removeAllCompleted} = useTodoStore();

    const toastAlert = () => {
      toast(
        {
          variant: "destructive",
          title: "Task Deleted",
          description: "Your task has been deleted successfully"
        }
      );

  }

  const handleSingleRemove = (id) => {
    remove(id);
    toastAlert();
  }

  const handleDeleteAllCompleted = () => {

    removeAllCompleted();
    toastAlert();
  }

  return (
    <div>
        <Card className="w-auto">
          <CardHeader>
            <CardTitle>Completed Tasks</CardTitle>
            <CardDescription>Hurray! here are tasks you were able to complete</CardDescription>
          </CardHeader>
          <CardContent>
            

          <div className="grid w-full items-center gap-4">
                
                {
                  Todos.map((todo, index) => (
                    todo.completed ? <div className="flex items-center space-x-2 mb-3" key={todo.id}>
    
                    <div>
                      
                      <span className={`flex-1 text-lg ${todo.completed ? 'line-through' : ""}`}>{index+1}. {todo.text}</span> 
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
                      <p className="flex text-start text-sm mt-2">Date Added: {todo.dateCreated} | Date Completed: {todo.dateCompleted}</p> 
                
  
                    </div>
                
  
                  
                    
                <AlertDialog>
                <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm"> <Trash/> </Button>
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
                    <AlertDialogAction onClick={()=> handleSingleRemove(todo.id)}>Continue</AlertDialogAction>
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
                <Button variant="destructive" >Trash Tasks</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete all your completed task.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=> handleDeleteAllCompleted()}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </CardFooter>
        </Card>
    </div>
  )
}

export default CompletedTask