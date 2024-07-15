import GuildMember from "./guild-member"

export default class Guild {
  members?: GuildMember[]
  name: string
  faction: string
  region: string
  realm: string

  constructor(guild: Guild) {
    this.members = guild?.members?.map(m => new GuildMember(m)) || []
    this.name = guild.name
    this.faction = guild.faction
    this.region = guild.region
    this.realm = guild.realm
  }
}