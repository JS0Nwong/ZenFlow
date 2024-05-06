import React from 'react'
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";

export default function SettingsPanel() {
    return (
        <div className='
            flex 
            flex-col 
            w-full 
            h-fit
            justify-center 
            items-center 
            pr-96 
            pl-96 
            bg-neutral-950
        '>
            <Card className="h-[calc(100vh-2rem)] w-full p-4 shadow-xl shadow-blue-gray-900/5">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        Sidebar
                    </Typography>
                </div>
                <List>
                    <ListItem>
                        <ListItemPrefix>
                            {/* <PresentationChartBarIcon className="h-5 w-5" /> */}
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            {/* <ShoppingBagIcon className="h-5 w-5" /> */}
                        </ListItemPrefix>
                        E-Commerce
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            {/* <InboxIcon className="h-5 w-5" /> */}
                        </ListItemPrefix>
                        Inbox
                        <ListItemSuffix>
                            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                        </ListItemSuffix>
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            {/* <UserCircleIcon className="h-5 w-5" /> */}
                        </ListItemPrefix>
                        Profile
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            {/* <Cog6ToothIcon className="h-5 w-5" /> */}
                        </ListItemPrefix>
                        Settings
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            {/* <PowerIcon className="h-5 w-5" /> */}
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
            </Card>
        </div>
    )
}
