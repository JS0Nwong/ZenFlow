import Editor from '../components/Builder/Editor'
import Toolbar from '../components/Builder/Toolbar'
import Search from '../components/Builder/Search'

import useKeyPress from '../hooks/useKeyPress'
import { useBoundStore } from '../stores/storeBinder'

export default function Builder() {
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

    const onHotkeyPress = (e) => {
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
    useKeyPress([70, 66, 90, 84, 67, 86, 17, 16], onHotkeyPress)

    return (
        <>
            <div className='                
                    bg-neutral-950
                    flex
                    flex-col
                    h-full
                    w-full
                    items-center
            '>
                <Search />
                <Toolbar />
                <Editor />
            </div>
        </>
    )
}
