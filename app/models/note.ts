import { NoteSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'
import User from '#models/user'

export default class Note extends NoteSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
