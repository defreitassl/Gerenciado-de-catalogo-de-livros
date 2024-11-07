import { fetchBooks, registerBook, evaluateBook } from "./asyncFunctions.js"

var libraryUrl = "http://localhost:3000/books"


function displayEvaluateScreen (event) {

    document.querySelector("#registerContent").classList.remove("d-none")
    document.querySelector("#consultContent").classList.remove("d-none")
    document.querySelector("#registerContent").classList.add("d-none")
    document.querySelector("#consultContent").classList.add("d-none")

    document.querySelector("#evaluateContent").classList.remove("d-none")

    const idBook = event.target.dataset.id

    document.querySelector("#submitEvaluation").addEventListener("click", async (event) => {
        await evaluateBook(event, libraryUrl, idBook)
    })
}


function distributeEvaluateEvents () {

    const evaluateButtons = document.querySelectorAll("#evaluateButton")
    evaluateButtons.forEach((button) => button.addEventListener('click', displayEvaluateScreen))
}


function loadConsultTableData (dataToLoad) {
    
    let bookId = 1
    const tBody = document.querySelector("#tableBody")
    tBody.innerHTML = ""

    for (const book of dataToLoad) {
        const newBook = document.createElement("tr")

        newBook.innerHTML = `
            <th>${bookId}</th>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.gender}</td>
            <td>${book.publicationYear}</td>
            <td>${book.evaluation}</td>
            <td><button class="btn btn-outline-primary" id="evaluateButton" data-id="${book.id}">Avaliar Livro</button></td>
        `
        tBody.appendChild(newBook)
        bookId++
    }
}


document.querySelector("#submitButton").addEventListener("click", (event) => {
    event.preventDefault()

    const bookTitle = document.querySelector("#title")
    const bookAuthor = document.querySelector("#author")
    const gender = document.querySelector("#gender")
    const publicationYear = document.querySelector("#bookYear")

    const bookObj = {
        title: bookTitle.value,
        author: bookAuthor.value,
        gender: gender.value,
        publicationYear: publicationYear.value,
        evaluation: 0
    }

    registerBook(libraryUrl, bookObj)
})


window.addEventListener('load', async (event) => {
    event.preventDefault()

    const allData = await fetchBooks(libraryUrl)
    loadConsultTableData(allData)
    distributeEvaluateEvents()
    
})


document.querySelector("#switchRegisterButton").addEventListener("click", (event) => {
    event.preventDefault()

    document.querySelector("#registerContent").classList.remove("d-none")
    document.querySelector("#consultContent").classList.add("d-none")
})


document.querySelector("#genderFilter").addEventListener("change", async (event) => {
    
    const genderToFilter = event.target.value

    if (genderToFilter === "none") {
        const allData = await fetchBooks(libraryUrl)
        loadConsultTableData(allData)
    } else {
        const filteredBooks = await fetchBooks(libraryUrl, 'gender', genderToFilter)
        loadConsultTableData(filteredBooks)
    }
})


document.querySelector("#searchBooks").addEventListener("click", async (event) => {
    event.preventDefault()

    const textToFilter = document.querySelector("#searchBooksInput").value
    const filteredBooks = await fetchBooks(libraryUrl, 'title', textToFilter)
    loadConsultTableData(filteredBooks)
})
