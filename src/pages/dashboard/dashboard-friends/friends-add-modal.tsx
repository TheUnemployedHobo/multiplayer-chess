import { UserRoundPlusIcon } from "lucide-react"
import { useState } from "react"

import type { UserAllType } from "@/lib/common-types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ItemGroup } from "@/components/ui/item"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserItem, UserItemPlaceholder } from "@/components/user-item"
import { formatDate } from "@/lib/utils"

type PropsType = {
  data: null | undefined | UserAllType[]
  handleSendFriendReq: ({ id, username }: { id: string; username: string }) => void
}

export default function FriendsAddModal({ data, handleSendFriendReq }: PropsType) {
  const [search, setSearch] = useState("")

  return (
    <>
      <Input
        onInput={(e) => setSearch(e.currentTarget.value)}
        placeholder="Search for users"
        type="search"
        value={search}
      />
      <ScrollArea className="h-80">
        <ItemGroup>
          {!data ? (
            <UserItemPlaceholder quantity={4} />
          ) : !data.length ? (
            <p className="text-muted-foreground">No users found!</p>
          ) : (
            data
              .filter(({ username }) => username.includes(search.toLowerCase()))
              .map(({ avatar, id, signup_date, username }) => (
                <UserItem
                  actions={
                    <Button onClick={() => handleSendFriendReq({ id, username })} size="icon-lg">
                      <UserRoundPlusIcon />
                    </Button>
                  }
                  avatar={avatar}
                  description={`Member since ${formatDate(signup_date)}`}
                  key={id}
                  title={username}
                  variant="muted"
                />
              ))
          )}
        </ItemGroup>
      </ScrollArea>
    </>
  )
}
