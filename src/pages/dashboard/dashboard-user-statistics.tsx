import { ChartColumnIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UserStatistics from "@/components/user-statistics"
import useAuthStore from "@/hooks/use-auth-store"

export default function DashboardUserStatistics() {
  const user = useAuthStore((state) => state.user)!

  return (
    <Card className="h-min">
      <CardHeader>
        <CardTitle>
          <Badge className="size-8 rounded-full p-0" variant="secondary">
            <ChartColumnIcon />
          </Badge>
          <span className="ml-2">Your Statistics</span>
        </CardTitle>
        <CardDescription>View your performance metrics and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <UserStatistics withIcons {...user.stats} />
      </CardContent>
    </Card>
  )
}
