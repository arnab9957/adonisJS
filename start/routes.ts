/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.get('/', [controllers.Home, 'index']).as('home')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])

    router.get('notes', [controllers.Notes, 'index']).as('notes.index')
    router.get('notes/create', [controllers.Notes, 'create']).as('notes.create')
    router.post('notes', [controllers.Notes, 'store']).as('notes.store')
    router.get('notes/:id', [controllers.Notes, 'show']).as('notes.show')
    router.get('notes/:id/edit', [controllers.Notes, 'edit']).as('notes.edit')
    router.post('notes/:id', [controllers.Notes, 'update']).as('notes.update')
    router.post('notes/:id/delete', [controllers.Notes, 'destroy']).as('notes.destroy')
  })
  .use(middleware.auth())
