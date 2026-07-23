export type FnType<T> = (data: T) => Promise<void> | void
export type FriendType = StatusType & UserType
export type GameFinishedPayloadType = { result: string; winner: ColorType | null }
export type MovePayloadType = { from: string; promotion?: string; to: string }
export type OpponentInfoType = Pick<UserType, "avatar" | "username"> & { color: ColorType; elo: number }
export type StatusType = { status: "online" | "playing" | undefined }
export type UserAllType = Omit<UserType, "stats">
export type UserMeType = Omit<UserType, "id"> & { jwt: string | undefined }

type ColorType = "black" | "white"
type StatsType = { elo: number; games: number; losses: number; wins: number }
type UserType = { avatar: string; id: string; signup_date: string; stats: StatsType; username: string }
