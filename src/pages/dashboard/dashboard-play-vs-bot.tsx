import { BotIcon, PlayIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const difficulties = ["beginner", "intermediate", "advanced", "expert", "master"]

export default function DashboardPlayVsBot() {
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
        <Label htmlFor="difficulty">Choose a difficulty</Label>
        <Select defaultValue="beginner">
          <SelectTrigger className="w-full capitalize" id="difficulty">
            <SelectValue placeholder="e.g. Beginner" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {difficulties.map((difficulty) => (
                <SelectItem className="capitalize" key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg">
          <PlayIcon />
          Start the game
        </Button>
      </CardFooter>
    </Card>
  )
}
