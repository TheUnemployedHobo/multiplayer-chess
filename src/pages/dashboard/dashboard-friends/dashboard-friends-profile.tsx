import { SwordsIcon, UserRoundMinusIcon } from "lucide-react"

import type { FriendType } from "@/lib/services"

import { Button } from "@/components/ui/button"
import { UserItem } from "@/components/user-item"
import UserStatistics from "@/components/user-statistics"
import { formatDate } from "@/lib/utils"

type PropsType = FriendType & {
  handleInvite: () => void
  handleUnfriend: () => void
}

export default function DashboardFriendsProfile({
  avatar,
  handleInvite,
  handleUnfriend,
  signup_date,
  stats,
  status,
  username,
}: PropsType) {
  return (
    <>
      <UserItem
        avatar={avatar}
        description={`Member since ${formatDate(signup_date)}`}
        status={status}
        title={username}
      />
      <UserStatistics {...stats} size="xs" />
      <div className="flex gap-x-3">
        <Button className="grow" onClick={handleUnfriend} variant="destructive">
          <UserRoundMinusIcon />
          <span>Unfriend</span>
        </Button>
        <Button className="grow" disabled={status !== "online"} onClick={handleInvite} variant="secondary">
          <SwordsIcon />
          <span>Invite to play</span>
        </Button>
      </div>
    </>
  )
}
