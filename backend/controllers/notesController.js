const getNotes = (req, res) => {
  res.status(200).json({ message: 'Get Notes' })
}

const setNote = (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add text field')
  }
  res.status(200).json({ message: 'Set Note' })
}

const updateNote = (req, res) => {
  res.status(200).json({ message: `Update Note ${req.params.id}` })
}

const deleteNote = (req, res) => {
  res.status(200).json({ message: `Delete Note ${req.params.id}` })
}

module.exports = {
  getNotes,
  setNote,
  updateNote,
  deleteNote,
}
