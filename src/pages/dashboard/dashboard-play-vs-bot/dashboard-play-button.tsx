import { PlayIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type PropsType = { skill: number }

export default function DashboardPlayVsBotButton({ skill }: PropsType) {
  console.log(skill)

  return (
    <Button className="w-full" size="lg">
      <PlayIcon />
      <span>Start the game</span>
    </Button>
  )
}
