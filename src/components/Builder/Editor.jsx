import Input from './Input'
import History from './History'

export default function Editor() {
    return (
        <>
            <div className='
                flex 
                flex-col 
                w-full 
                h-full
                justify-center 
                items-center 
                pt-8 
                pb-8 
                pr-96 
                pl-96 
                divide-y 
                divide-neutral-800
            '>
                <form className='
                    w-full
                    rounded-lg
                    flex-none
                '>                    
                    <Input />
                </form>
                <History />
            </div>
        </>
    )
}
