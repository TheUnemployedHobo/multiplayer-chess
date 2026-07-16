import { BotIcon } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import DashboardPlayVsBotButton from "./dashboard-play-button"

const difficulties = [
  { label: "Beginner", skill: 1 },
  { label: "Intermediate", skill: 2 },
  { label: "Advanced", skill: 3 },
  { label: "Expert", skill: 4 },
  { label: "Master", skill: 5 },
] as const

export default function DashboardPlayVsBot() {
  const [difficulty, setDifficulty] = useState(difficulties.at(0)!)

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>
          <Badge className="size-8 rounded-full p-0" variant="secondary">
            <BotIcon />
          </Badge>
          <span className="ml-2">Play vs Bot</span>
        </CardTitle>
        <CardDescription>Select difficulty and start playing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label>Choose a difficulty</Label>
        <Select
          onValueChange={(value) => setDifficulty(difficulties.at(+value - 1)!)}
          value={difficulty.skill.toString()}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {difficulties.map(({ label, skill }) => (
                <SelectItem key={label} value={skill.toString()}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <DashboardPlayVsBotButton difficulty={difficulty} />
      </CardFooter>
    </Card>
  )
}
