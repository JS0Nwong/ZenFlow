import { useState } from "react"

export default function useSearch() {
    const [searchResults, setSearchResults] = useState([])
    const [focusedIndex, setFocusedIndex] = useState(0)

    const totalNumberOfResults = searchResults.length

    const focusElements = (res) => {
        if (res.length === 0) return
        setSearchResults(res)
        res.forEach((element) => {
            element.parentNode.classList.toggle('unblur')
        })
        res[0].focus()
    }

    const handleNext = () => {
        if(searchResults.length === 0) return 
        setFocusedIndex((prev) => prev + 1)
        if (focusedIndex > searchResults.length - 1){
            setFocusedIndex(1)
            searchResults[0].focus()
            return
        }
        else {
            searchResults[focusedIndex].focus()
            return
        }
    }
    const handlePrevious = () => {
        if(searchResults.length === 0) return 
        setFocusedIndex((prev) => prev - 1)
        if(focusedIndex === 0){ 
            setFocusedIndex(searchResults.length)
            searchResults[searchResults.length - 1].focus()
            return
        }
        if(focusedIndex > searchResults.length - 1) {
            console.log(focusedIndex)
            setFocusedIndex(searchResults.length - 2)
            searchResults[searchResults.length - 2].focus()
            return
        }
        else {
            searchResults[focusedIndex - 1].focus()
            return

        }
    }

    const handleSearch = (query) => {
        if (query.trim() === '') return
        const listContainers = Array.from(document.querySelectorAll('li > textarea'))
        const res = listContainers.filter((element) => {
            return element.textContent.includes(query)
        })
        focusElements(res)
    }

    return {
        handleNext,
        handlePrevious,
        handleSearch,
        focusElements,
        focusedIndex,
        totalNumberOfResults,
    }
}
