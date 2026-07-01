import { Avatar, Style } from "@dicebear/core"
import definition from "@dicebear/styles/adventurer-neutral.json" with { type: "json" }

const style = new Style(definition)

const avatars = [
  { name: "e8wq4inw", svgSrc: new Avatar(style, { seed: "e8wq4inw" }).toDataUri() },
  { name: "qkbfswrm", svgSrc: new Avatar(style, { seed: "qkbfswrm" }).toDataUri() },
  { name: "4p47cgpe", svgSrc: new Avatar(style, { seed: "4p47cgpe" }).toDataUri() },
  { name: "mprragnf", svgSrc: new Avatar(style, { seed: "mprragnf" }).toDataUri() },
  { name: "2dpqv9g2", svgSrc: new Avatar(style, { seed: "2dpqv9g2" }).toDataUri() },
  { name: "5hjictg4", svgSrc: new Avatar(style, { seed: "5hjictg4" }).toDataUri() },
  { name: "t746slo0", svgSrc: new Avatar(style, { seed: "t746slo0" }).toDataUri() },
  { name: "laa7jbek", svgSrc: new Avatar(style, { seed: "laa7jbek" }).toDataUri() },
  { name: "g61fqmog", svgSrc: new Avatar(style, { seed: "g61fqmog" }).toDataUri() },
  { name: "b7a7b0et", svgSrc: new Avatar(style, { seed: "b7a7b0et" }).toDataUri() },
  { name: "lgfzhxl0", svgSrc: new Avatar(style, { seed: "lgfzhxl0" }).toDataUri() },
  { name: "rbej1snt", svgSrc: new Avatar(style, { seed: "rbej1snt" }).toDataUri() },
] as const

export const findAvatarByName = (name: (typeof avatars)[number]["name"]) =>
  avatars.find((avatar) => avatar.name === name)

export default avatars
