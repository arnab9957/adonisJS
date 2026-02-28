import Note from '#models/note'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * HomeController handles the home page display.
 * Shows recent notes for authenticated users.
 */
export default class HomeController {
  /**
   * Display the home page with recent notes for authenticated users
   */
  async index({ auth, view }: HttpContext) {
    let recentNotes: Note[] = []

    if (auth.isAuthenticated) {
      const user = auth.getUserOrFail()
      recentNotes = await Note.query()
        .where('userId', user.id)
        .orderBy('createdAt', 'desc')
        .limit(5)
    }

    return view.render('pages/home', { recentNotes })
  }
}
