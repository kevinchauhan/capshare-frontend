import { Button } from "../ui/button"
import { Card } from "../ui/card"

const Nav = () => {
    return (
        <Card className="px-5 py-2 mt-3">
            <div>
                <Button className="mr-2 bg-secondary" size='sm' variant='outline'>All</Button>
                <Button className="mr-2" size='sm' variant='outline'>Pending</Button>
                <Button className="mr-2" size='sm' variant='outline'>Completed</Button>
            </div>
        </Card>
    )
}

export default Nav