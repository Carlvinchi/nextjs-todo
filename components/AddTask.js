import React from 'react'

import { useToast } from "@/hooks/use-toast"
import { useState } from "react";
import { useTodoStore} from '@/app/store/todoStore';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Plus, Recycle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"




function AddTask() {
    const { toast } = useToast();
    const {Todos, addTodo, update} = useTodoStore()

    const [todoText, setTodo] = useState("");
    const [updatedTodoText, setUpdatedTodo] = useState("");
    const [updatedTodoPriority, setUpdatedTodoPriority] = useState();
    const [priority, setPriority] = useState("");

    const handleAdd = () => {

        if(!todoText || !priority) return alert("Please enter text and select the priority");
    
        addTodo(todoText, priority); 
    
        setTodo("");
        setPriority("");
    
        toastAlert();
      }

    const handleUpdate = (id) => {
    
        if(updatedTodoText === "" && updatedTodoPriority ===""){
          const item = Todos.find(element => element.id === id);

          update(item.text, item.priority, id);
        }

        else if(updatedTodoText === ""){
          const item = Todos.find(element => element.id === id);

          update(item.text, updatedTodoPriority, id);
        }

        else if(updatedTodoPriority ===""){
          const item = Todos.find(element => element.id === id);

          update(updatedTodoText, item.priority, id);
        }

        else {
          update(updatedTodoText, updatedTodoPriority, id);
        setUpdatedTodo("");
        setUpdatedTodoPriority("");

        }
        
    
      }

    const toastAlert = () => {
        toast(
          {
            
            title: "Task Added",
            description: "Your new task has been added successfully"
          }
        );
  
    }


  return (
    <div>

            <Card className="w-auto">
                <CardHeader>
                  <CardTitle>Add Task</CardTitle>
                  <CardDescription>Add your to do in a few clicks</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Short Text</Label>
                        <Input placeholder="I want to?" value={todoText} onChange = {(e) => setTodo(e.target.value)}/>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="priority">Priority</Label>
                        <Select onValueChange={setPriority} value={priority}>
                          <SelectTrigger id="priority">
                            <SelectValue placeholder="Select"/>
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                            
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  
                <Button onClick={handleAdd}>Add <Plus/> </Button>

                </CardFooter>
              </Card>

              <div className="grid w-full items-center gap-4 pt-10">
              {
                Todos.map((todo, index) => (

                  !todo.toggleEdit ? "":

                  <div key={todo.id}>
                  <Card className="w-auto">
                  <CardHeader>
                    <CardTitle>Update Task</CardTitle>
                    <CardDescription>Edit your to do in a few clicks</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <div className="grid w-full items-center gap-4" >
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Short Text</Label>
                          <Input value={updatedTodoText || todo.text} onChange = {(e) => setUpdatedTodo(e.target.value)}/>
                        </div>
                        <div className="flex flex-col space-y-1.5" >
                          <Label htmlFor="priority">Priority</Label>
                          <Select onValueChange={setUpdatedTodoPriority} value={updatedTodoPriority || todo.priority}>
                            <SelectTrigger id="updatedTodoPriority">
                              <SelectValue placeholder="Select"/>
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                              
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    
                  <Button onClick={()=>handleUpdate(todo.id)}>Update <Recycle/> </Button>
  
                  </CardFooter>
                </Card>
                </div>

                  
                ))


              }
              </div>



    </div>
  )
}

export default AddTask