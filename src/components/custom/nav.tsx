import { Button } from "../ui/button"
import { Card } from "../ui/card"

type Props = {
    handleFilter: (arg: string) => void
    selectedTab: string
}

const Nav = ({ handleFilter, selectedTab }: Props) => {
    return (
        <Card className="px-5 py-2 mt-3">
            <Button onClick={() => handleFilter('all')} className={`mr-2 ${selectedTab === 'all' ? 'bg-secondary' : ''}`} size='sm' variant='outline'>All</Button>
            <Button onClick={() => handleFilter('pending')} className={`mr-2 ${selectedTab === 'pending' ? 'bg-secondary' : ''}`} size='sm' variant='outline'>Pending</Button>
            <Button onClick={() => handleFilter('completed')} className={`mr-2 ${selectedTab === 'completed' ? 'bg-secondary' : ''}`} size='sm' variant='outline'>Completed</Button>
        </Card>
    )
}

export default Nav