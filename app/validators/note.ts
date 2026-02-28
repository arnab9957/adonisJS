import vine from '@vinejs/vine'

/**
 * Validator to use when creating or updating a note
 */
export const noteValidator = vine.compile(
  vine.object({
    title: vine.string().trim().maxLength(255),
    content: vine.string().trim(),
  })
)
