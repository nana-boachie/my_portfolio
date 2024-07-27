"use client"

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"

export default function Component() {
  return (
    <Card className="max-w-xs"> <CardContent>
            <h1>Skills</h1>
        </CardContent>
      <CardContent className="flex gap-2 p-8 pb-4">
       
        <ChartContainer
          config={{
            word: {
              label: "Word",
              color: "hsl(var(--chart-5))",
            },
            stand: {
              label: "Stand",
              color: "hsl(var(--chart-2))",
            },
            exercise: {
              label: "Exercise",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[140px] w-full"
        >
          <BarChart
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 10,
            }}
            data={[
              {
                activity: "stand",
                value: (60) * 100,
                label: "60",
                fill: "var(--color-stand)",
              },
              {
                activity: "exercise",
                value: (20) * 100,
                label: "20 ",
                fill: "var(--color-exercise)",
              },
              {
                activity: "word",
                value: (40) * 100,
                label: "40",
                fill: "var(--color-move)",
              },
            ]}
            layout="vertical"
            barSize={32}
            barGap={2}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="activity"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar dataKey="value" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="label"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}
