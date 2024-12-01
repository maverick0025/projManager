import { DotFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { Card } from '../../components/ui/card'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'

const ProjectCard = () => {
  return (
    <Card className="p-5 w-full lg:max-w-3xl">
            <div className='space y-5'>
                <div className='space-y-2'>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-5'>
                            <h1 className='cursor-pointer font-bold text-lg'>
                                Create Ecommerce project
                            </h1>
                            <DotFilledIcon />
                            <p className='text-sm text-gray-400'>full stack</p>
                        </div>
                        <div>
                            <DropdownMenu> 
                                <DropdownMenuTrigger>
                                    <Button variant="ghost" size="icon" className="rounded-xl">
                                        <DotsVerticalIcon/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        Update
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>

                            </DropdownMenu>
                        </div>
                    </div>
                    <p className='text-gray-500 text-sm'>
                        Hello world. Whatcha doin?
                    </p>

                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    {[1,1,1,1].map((item)=><Badge key={item} variant='outline'>frontend</Badge>)}
                </div>
            </div>
    </Card>

    )
}

export default ProjectCard