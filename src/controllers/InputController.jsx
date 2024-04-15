import { useBoundStore } from '../stores/storeBinder'


function onHotkeyPress(e) {
    const {
        toggleBlur,
        toggleZen,
        toggleSearch,
        setToggleZen,
        setToggleSearch,
        clearHistory,
    } = useBoundStore((state) => ({
        toggleSearch: state.toggleSearch,
        toggleZen: state.toggleZen,
        toggleBlur: state.toggleBlur,
        setToggleZen: state.setToggleZen,
        setToggleSearch: state.setToggleSearch,
        clearHistory: state.clearHistory
    }))

    if (e.key.toLowerCase() === 'f' && e.ctrlKey && e.shiftKey) {
        e.preventDefault()
        setToggleSearch(!toggleSearch)
    }
    if (e.key.toLowerCase() === 'b' && e.ctrlKey && e.shiftKey) {
        e.preventDefault()
        console.log('b')
    }
    if (e.key.toLowerCase() === 'z' && e.ctrlKey && e.shiftKey) {
        e.preventDefault()
        setToggleZen(!toggleZen)
    }
    if (e.key.toLowerCase() === 't' && e.ctrlKey && e.shiftKey) {
        e.preventDefault()
        console.log('t')
    }
    if (e.key.toLowerCase() === 'c' && e.ctrlKey && e.shiftKey) {
        e.preventDefault()
        clearHistory()
    }
    if (e.key.toLowerCase() === 'v' && e.ctrlKey && e.shiftKey) {
        e.preventDefault()
        console.log('v')
    }
}

export default onHotkeyPress
