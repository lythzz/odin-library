
let newTitle;
let newAuthor;
let newPages;
let newRead;

const table = document.querySelector('.library')
const modal = document.querySelector('.modal')
const addBook = () =>  modal.style.display = 'block';
const closeModal = () => modal.style.display = 'none';

let myLibrary = [
    sampleBook={
        'title':1984,
        'author': 'George Orwell',
        'pages':328,
        'read':true
    }
]

function Book (title,author,pages,read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function updateBooks () {

        let book = myLibrary[myLibrary.length-1]

        let row = document.createElement('tr')
        let titleCell = document.createElement('td')
        let authorCell = document.createElement('td')
        let pagesCell = document.createElement('td')
        let readCell = document.createElement('td')
        let deleteCell = document.createElement('td')
        let deleteBtn = document.createElement('btn')
        deleteBtn.setAttribute('class', 'delBtn')
        deleteBtn.innerText='Delete'
        deleteBtn.addEventListener('click',()=>{
            table.removeChild(row)
          })
   
        titleCell.innerText = book.title
        authorCell.innerText = book.author
        pagesCell.innerText = book.pages
        readCell.innerHTML = (book.read?`<input type="checkbox" checked>`:`<input type="checkbox">`)
        deleteCell.appendChild(deleteBtn)

        pagesCell.setAttribute('small', 1)
        readCell.setAttribute('small', 1)
        deleteCell.setAttribute('small', 1)

        row.appendChild(titleCell)
        row.appendChild(authorCell)
        row.appendChild(pagesCell)
        row.appendChild(readCell)
        row.appendChild(deleteCell)
        table.appendChild(row)

}

const newBook = () => {
    newTitle = document.querySelector('.newTitle').value
    newAuthor = document.querySelector('.newAuthor').value
    newPages = document.querySelector('.newPages').value
    newRead = document.querySelector('.newRead').checked;
    let isValid = true

    myLibrary.forEach(book => {
        if(book.title==newTitle){
            alert("This book's already on the library!")
            isValid = false
        }
    });

    if(newTitle==''||newPages==''||newAuthor==''){
        alert("Please provide the book info")
        isValid = false
    }

    if(isValid){
    document.querySelector('.newTitle').value = ''
    document.querySelector('.newAuthor').value = ''
    document.querySelector('.newPages').value = ''
    document.querySelector('.newRead').value = ''
    document.querySelector('.newRead').checked = false

    let book = new Book(newTitle, newAuthor, newPages, newRead)
    myLibrary.push(book)
    console.log(myLibrary)
    closeModal()
    updateBooks()
}}

updateBooks()