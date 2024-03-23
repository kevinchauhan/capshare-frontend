import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'

const Header = () => {
    return (
        <header className="border-b">
            <div className="mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div>
                        {/* <Input name="search" placeholder="" /> */}
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="outline">My account</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="border p-5" align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="hover:cursor-pointer">Profile</DropdownMenuItem>
                                <DropdownMenuItem className="hover:cursor-pointer">Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header