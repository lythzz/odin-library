
let newTitle;
let newAuthor;
let newPages;
let newRead;

const table = document.querySelector('.library')
const modal = document.querySelector('.modal')
const addBook = () =>  modal.style.display = 'block';
const closeModal = () => modal.style.display = 'none';

let myLibrary=[]
if(localStorage.length<1){
    const sampleBook={
            'title':1984,
            'author': 'George Orwell',
            'pages':328,
            'read':true
        }
    myLibrary.push(sampleBook)
}else{
    for(let i = 0; i<localStorage.length; i++){
        console.log(i)
        const book = JSON.parse(localStorage[`book${i}`])
        myLibrary.push(book)
    }
}

class Book {
    constructor(title,author,pages,read){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
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
        delete myLibrary[myLibrary.length-1]
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

const displayBooksAtReload = () => {
    for(let i=0;i<myLibrary.length;i++){
        let row = document.createElement('tr')
        let titleCell = document.createElement('td')
        let authorCell = document.createElement('td')
        let pagesCell = document.createElement('td')
        let readCell = document.createElement('td')
        let deleteCell = document.createElement('td')
        let deleteBtn = document.createElement('btn')
        deleteBtn.setAttribute('class', 'delBtn')
        deleteBtn.setAttribute('index', i)
        deleteBtn.innerText='Delete'
        deleteBtn.addEventListener('click',()=>{
            table.removeChild(row)
            const i = deleteBtn.getAttribute('index')
            myLibrary[i]=null
            console.log(i   )
            updateStorage()
          })
   
        titleCell.innerText = myLibrary[i].title
        authorCell.innerText = myLibrary[i].author
        pagesCell.innerText = myLibrary[i].pages
        readCell.innerHTML = (myLibrary[i].read?`<input type="checkbox" checked>`:`<input type="checkbox">`)
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
        };        
}

const updateStorage= () =>{
    localStorage.clear()
        for(let i=0;i<myLibrary.length;i++){
            if(myLibrary[i]!==null){
            const storageIndex = localStorage.length
            const book = JSON.stringify(myLibrary[i])
            localStorage.setItem(`book${storageIndex}`, book)
        }}
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
        alert("Please provide all the book info")
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
    closeModal()
    updateBooks()
    updateStorage()
}}

displayBooksAtReload()