import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import React from 'react'
import IssueCard from './IssueCard'
import { Button } from '../../components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import CreateIssueForm from './CreateIssueForm'

const IssueList = ({title, status}) => {
  return (

    <div>
        <Dialog>
            <Card className="w-full md:w-[300px] lg:w-[310px]">
                <CardHeader>
                    <CardTitle>
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-2">
                    <div className='space-y-2'>
                        {[1, 12, 14].map((item=><IssueCard key={item}/>))}

                    </div>
                </CardContent>
                <CardFooter>
                    <DialogTrigger>
                        <Button variant="outline" className="w-fullflex items-center gap-2">
                            Create Issue
                            <PlusIcon/>
                        </Button>
                    </DialogTrigger>
                </CardFooter>

            </Card>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create New Issue
                    </DialogTitle>
                </DialogHeader>
                <CreateIssueForm/>
            </DialogContent>
        </Dialog>
    </div>
  
    )
}

export default IssueList