export default class Character {
  activeSpecName: string
  activeSpecRole: string
  class: string
  faction: string
  gender: string
  name: string
  race: string

  constructor(character) {
    this.activeSpecName = character.active_spec_name
    this.activeSpecRole = character.active_spec_role
    this.class = character.class
    this.faction = character.faction
    this.gender = character.gender
    this.name = character.name
    this.race = character.race
  }
}