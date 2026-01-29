import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

import { isToday } from "date-fns";
import { useTodoQuery } from "@/queries/todo.queries";
import type { Todo } from "@/store/todo/todo.types";

function dataVariation(todos: Todo[]) {
    return [
        {
            label: "Today",
            value: todos.filter((t) =>
                isToday(new Date(t.created))
            ).length,
        },
        {
            label: "Pending",
            value: todos.filter(
                (t) => t.status === "in-progress"
            ).length,
        },
        {
            label: "Completed",
            value: todos.filter(
                (t) => t.status === "completed"
            ).length,
        },
    ];
}

export function TodoStatusChart() {
  const { data: todos = [] } = useTodoQuery();
  const data = dataVariation(todos);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Overview</CardTitle>
      </CardHeader>

      <CardContent className="h-65">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />

            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              fill="hsl(var(--primary))"
            >
              {data.map((entry, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <rect />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs font-medium">
                        {entry.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {entry.value} tasks
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}