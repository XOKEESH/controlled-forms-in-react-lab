import { useState, useEffect } from 'react'

const Bookshelf = () => {
  const [books, setBooks] = useState(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books'))
    return savedBooks || [
    { title: 'Fourth Wing', author: 'Rebecca Yarros' },
    { title: 'The Lion, the Witch and the Wardrobe', author: 'C.S. Lewis' },
  ]
})

  const [newBook, setNewBook] = useState({ title: '', author: '' })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }))
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!newBook.title.trim() || !newBook.author.trim()) {
        alert('Please fill in both the title and author fields.')
        return
      }
      setBooks((prevBooks) => [...prevBooks, newBook])
      setNewBook({ title: '', author: '' })
    }

    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books))
      }, [books])

  return (
    <div className="bookshelfDiv">
        <div className="formDiv">
            <h3>Add a Book</h3>
            <form onSubmit={handleSubmit}>
                <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                />
                </label>
                <label>
                Author:
                <input
                    type="text"
                    name="author"
                    value={newBook.author}
                    onChange={handleInputChange}
                />
                </label>
                <button type="submit">Add Book</button>
            </form>
        </div>

      <div className="bookCardsDiv">
        {books.map((book, index) => (
            <div key={index} className="bookCard">
            <h4>{book.title}</h4>
            <p>by {book.author}</p>
            </div>
        ))}
    </div>
    </div>
  )
}

export default Bookshelf
