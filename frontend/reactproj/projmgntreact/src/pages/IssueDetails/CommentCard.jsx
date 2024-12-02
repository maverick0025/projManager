import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { TrashIcon } from "@radix-ui/react-icons"

const CommentCard = () => {
  return (

    <div className="flex justify-between border bg-slate-1000 p-4 rounded-xl ">
        <div className="flex items-center gap-4">
            <Avatar>
                <AvatarFallback>
                    R
                </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <p> Code with Ash</p>
                <p> how much time till deadline?</p>
            </div>
            <div>
                <Button className="rounded-full cursor-pointer" variant="ghost" size="icon">
                    <TrashIcon/>
                </Button>
            </div>

        </div>

    </div>

    )
}

export default CommentCard