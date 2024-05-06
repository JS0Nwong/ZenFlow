import SettingsPanel from '../components/Settings/SettingsPanel'
import Toolbar from '../components/Builder/Toolbar'

export default function Settings() {
  return (
    <>
            <div className='                
                    bg-neutral-950
                    flex
                    flex-col
                    h-screen
                    w-full
                    items-center
            '>
                <Toolbar />
                <SettingsPanel />
            </div>
        </>
  )
}
