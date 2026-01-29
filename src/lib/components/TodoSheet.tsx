"use client";

import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/lib/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateTodo} from "@/queries/todo.queries";



type FormValues = {
  title: string;
  description: string;
  endDate: Date | null;
};

export function CreateTodoSheet() {
  const createTodo = useCreateTodo();

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      endDate: null,
    },
  });

  function onSubmit(values: FormValues) {
    createTodo.mutate(
      {
        title: values.title,
        description: values.description,
        endDate: values.endDate ?? null,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Todo
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full flex flex-col justify-evenly p-5 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-3xl">Create Todo</SheetTitle>
        </SheetHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 py-6"
        >
          <div className="grid gap-2">
            <Label className="p-2 mb-2 text-2xl">Title</Label>
            <Input
              placeholder="Assign the task"
              {...form.register("title")}
            />
          </div>

          <div className="grid gap-2">
            <Label className="p-2 mb-2 text-2xl">Description</Label>
            <Textarea
              rows={4}
              placeholder="Describe the task..."
              {...form.register("description")}
            />
          </div>

          <div className="grid gap-2">
            <Label className="p-2 mb-2 text-2xl">End Date</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.watch("endDate")
                    ? format(form.watch("endDate")!, "PPP")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={form.watch("endDate") ?? undefined}
                  onSelect={(date) =>
                    form.setValue("endDate", date ?? null)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <SheetFooter className="mt-auto">
            <Button
              type="submit"
              disabled={createTodo.isPending}
            >
              {createTodo.isPending ? "Creating..." : "Create"}
            </Button>

            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

