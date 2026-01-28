import { useState } from "react";
import { useTodoStore } from "../../store/todo/todo.store";
import { Button } from "./ui/button";


export default function TodoApp()
{
    const [input , setInput] = useState("");

    const works = useTodoStore((state)=>(state.works));
    const errors = useTodoStore((state)=>(state.error));
    const addWork = useTodoStore((state)=>state.addWork);
    const completeWork = useTodoStore((state)=>(state.completeWork));
    const deleteWork = useTodoStore((state)=>(state.deleteWork));
    function inputString(input :string)
    {
        if(!input)
        {
            alert("No spaces allowed")
            return;
        }
        else
        {
            addWork(input);
        }
    }



    return(
        <section className="w-full flex flex-col items-center  h-screen space-y-10 p-24">
            <h1 className="text-4xl font-semibold"> Add your works </h1>
            <div className="flex flex-row space-x-10 p-10 bg-black/3 shadow-xs shadow-blue-200">
                <input type="text" value={input} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>(setInput(e.target.value))} placeholder="Enter your works" className="px-4 py-1 text-sm border border-blue-500 rounded-2xl"></input>
                <Button variant="secondary" onClick={()=>{inputString(input);setInput("");} }>Add work</Button>
            </div>
            <h1>
             { (  errors ) ? <p className="color :red">{errors}</p> : <></> }
            </h1>
            <ul className="max-w-sm w-full p-2 bg-black/1">
                {works.map((work) =>
                <li className="px-4 py-2 flex justify-between" key ={work.id}>
                    <span onClick={()=>(completeWork(work.id))} className={`${work.completed ? "text-gray-300" : 'text-blue-700' } cursor-pointer bg-black/2 p-3`}>{work.work}</span>
                    <button onClick={()=>(deleteWork(work.id))}>Delete</button>
                </li>)
                }
            </ul>
        </section>
    )
}