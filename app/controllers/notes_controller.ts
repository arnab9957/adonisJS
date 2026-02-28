import Note from '#models/note'
import { noteValidator } from '#validators/note'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * NotesController handles CRUD operations for notes.
 * Each user can create, view, edit, and delete their own notes.
 */
export default class NotesController {
  /**
   * Display a list of all notes for the authenticated user
   */
  async index({ auth, view }: HttpContext) {
    const user = auth.getUserOrFail()
    const notes = await Note.query().where('userId', user.id).orderBy('createdAt', 'desc')

    return view.render('pages/notes/index', { notes })
  }

  /**
   * Display the form to create a new note
   */
  async create({ view }: HttpContext) {
    return view.render('pages/notes/create')
  }

  /**
   * Store a newly created note in the database
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(noteValidator)

    await Note.create({
      userId: user.id,
      title: data.title,
      content: data.content,
    })

    response.redirect().toRoute('notes.index')
  }

  /**
   * Display a single note
   */
  async show({ auth, params, view }: HttpContext) {
    const user = auth.getUserOrFail()
    const note = await Note.query().where('id', params.id).where('userId', user.id).firstOrFail()

    return view.render('pages/notes/show', { note })
  }

  /**
   * Display the form to edit an existing note
   */
  async edit({ auth, params, view }: HttpContext) {
    const user = auth.getUserOrFail()
    const note = await Note.query().where('id', params.id).where('userId', user.id).firstOrFail()

    return view.render('pages/notes/edit', { note })
  }

  /**
   * Update an existing note in the database
   */
  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const note = await Note.query().where('id', params.id).where('userId', user.id).firstOrFail()

    const data = await request.validateUsing(noteValidator)

    note.title = data.title
    note.content = data.content
    await note.save()

    response.redirect().toRoute('notes.show', { id: note.id })
  }

  /**
   * Delete a note from the database
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const note = await Note.query().where('id', params.id).where('userId', user.id).firstOrFail()

    await note.delete()

    response.redirect().toRoute('notes.index')
  }
}
