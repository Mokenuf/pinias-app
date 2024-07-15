import Character from "./character"

export default class GuildMember {
  character: Character
  rank: number

  constructor(member: GuildMember) {
    this.character = new Character(member.character)
    this.rank = member.rank
  }
}