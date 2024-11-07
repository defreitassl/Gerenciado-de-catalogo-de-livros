async function fetchBooks (url, filterType, filterValue) {

    const response = await fetch(url)
    const data = await response.json()

    if (!filterType) {
        return data
    } else {
        if (filterType === "gender") {
            const filteredData = data.filter((book) => book.gender === filterValue)
            return filteredData
        } else if (filterType === "title") {
            const filteredData = data.filter((book) => book.title.toLowerCase().includes(filterValue.toLowerCase()))
            return filteredData
        }
    }
}


async function registerBook (url, bookObj) {

    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bookObj)
    })
    const data = await response.json()
    console.log(data)
}


async function evaluateBook (event, url, bookId) {
    event.preventDefault()

    const finalEvaluation = Number(document.querySelector("#evaluationNote").value)
    
    const response = await fetch(`${url}/${bookId}`)
    const book = await response.json()

    book["evaluation"] = finalEvaluation

    const updateResponse = await fetch(`${url}/${bookId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(book)
    })

    const updatedBook = await updateResponse.json()

    
}


export { fetchBooks, registerBook, evaluateBook }