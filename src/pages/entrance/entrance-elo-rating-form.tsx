import { ArrowLeftIcon, FormIcon, UserRoundPlusIcon } from "lucide-react"
import { useState } from "react"

import SubmitButton from "@/components/submit-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import type { EntranceFormPropsType } from "."

const eloTiers = [
  {
    description: "Just learning the game.",
    elo: 100,
    title: "New to chess",
  },
  {
    description: "Understand the rules and play casually.",
    elo: 600,
    title: "Know the basics",
  },
  {
    description: "Play regularly and know common strategies.",
    elo: 1200,
    title: "Experienced player",
  },
  {
    description: "Strong tournament or competitive player.",
    elo: 2000,
    title: "Expert level",
  },
]

export default function EntranceEloRatingForm({ handleAction, setPage }: EntranceFormPropsType) {
  const [elo, setElo] = useState(eloTiers.at(0)!.elo)

  return (
    <form action={handleAction} className="flex h-dvh items-center justify-center">
      <Card className="z-10 mx-5 w-96">
        <CardHeader>
          <CardTitle>
            <Badge className="size-8 rounded-full p-0" variant="secondary">
              <FormIcon />
            </Badge>
            <span className="ml-2">Select your ELO tier</span>
          </CardTitle>
          <CardDescription>Pick the description that best matches your current chess experience</CardDescription>
        </CardHeader>
        <CardContent>
          <ToggleGroup
            className="w-full flex-col"
            onValueChange={(value) => value && setElo(+value)}
            type="single"
            value={elo.toString()}
            variant="outline"
          >
            {eloTiers.map(({ description, elo, title }) => (
              <ToggleGroupItem
                className="h-auto w-full flex-col items-start py-2 text-start whitespace-normal"
                key={title}
                value={elo.toString()}
              >
                <span className="text-sm">{title}</span>
                <span className="text-muted-foreground text-xs">{description}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardContent>
        <CardFooter className="gap-x-2">
          <Button className="grow" onClick={() => setPage(3)} size="lg">
            <ArrowLeftIcon />
            <span>Go back</span>
          </Button>
          <SubmitButton icon={<UserRoundPlusIcon />} text="Register" />
        </CardFooter>
      </Card>
      <input name="elo" type="hidden" value={elo} />
    </form>
  )
}
