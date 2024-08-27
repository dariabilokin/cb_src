const prisma = require('../prisma/prisma')

const NoteController = {
  async createNote(req, res) {
    try {
      const { userId, dayOfWeek, date, noteItems } = req.body

      // Checking if note already exists for the given date
      const existingNote = await prisma.note.findFirst({
        where: { userId, date: new Date(date) },
      })
      if (existingNote) {
        return res
          .status(400)
          .json({ error: 'Note already exists for the given date' })
      }

      const note = await prisma.note.create({
        data: {
          userId,
          dayOfWeek,
          date: new Date(date),
          noteItems: {
            create: noteItems.map((item, index) => ({
              content: item,
              order: index,
            })),
          },
        },
        include: { noteItems: true },
      })

      res.status(201).json(note)
    } catch (error) {
      console.error('Create note error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  async getNotesByUserId(req, res) {
    try {
      const { userId } = req.params
      const { startDate, endDate } = req.query

      const notes = await prisma.note.findMany({
        where: {
          userId: parseInt(userId),
          date: {
            gte: startDate ? new Date(startDate) : undefined,
            lte: endDate ? new Date(endDate) : undefined,
          },
        },
        include: {
          noteItems: {
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { date: 'desc' },
      })

      res.json(notes)
    } catch (error) {
      console.error('Get notes error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  async updateNoteItem(req, res) {
    try {
      const { id } = req.params
      const { content } = req.body

      const updatedItem = await prisma.noteItem.update({
        where: { id: parseInt(id) },
        data: { content },
      })

      res.json(updatedItem)
    } catch (error) {
      console.error('Update note item error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  async updateNoteItemsOrder(req, res) {
    try {
      const { noteId } = req.params
      const { newOrder } = req.body

      await prisma.$transaction(
        newOrder.map((item, index) =>
          prisma.noteItem.update({
            where: { id: item.id },
            data: { order: index },
          })
        )
      )

      const updatedNote = await prisma.note.findUnique({
        where: { id: parseInt(noteId) },
        include: {
          noteItems: {
            orderBy: { order: 'asc' },
          },
        },
      })

      res.json(updatedNote)
    } catch (error) {
      console.error('Update note items order error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  async deleteNoteItem(req, res) {
    try {
      const { id } = req.params

      await prisma.noteItem.delete({
        where: { id: parseInt(id) },
      })

      res.json({ message: 'Note item deleted successfully' })
    } catch (error) {
      console.error('Delete note item error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  async deleteAllNoteItems(req, res) {
    try {
      const { noteId } = req.params

      await prisma.noteItem.deleteMany({
        where: { noteId: parseInt(noteId) },
      })

      res.json({ message: 'All note items deleted successfully' })
    } catch (error) {
      console.error('Delete all note items error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },
}

module.exports = NoteController
