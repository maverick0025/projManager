import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useParams } from "react-router-dom"
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";

const IssueDetails = () => {
  
    const {projectId, issueId} = useParams();

    return (

    <div className="px-20 py-8 text-gray400 ">
        <div className="flex justify-between border p-10 rounded-lg">
            
            <ScrollArea className="h-80[vh] w-[60%]">
                <div>
                    <h1 className="text-lg font-semibold text-gray-400">Create Nav bar</h1>

                    <div className="py-5">
                        <h2 className="font-semibold text-gray-400 ">
                            Description
                        </h2>
                        <p className="text-gray-400 text-sm mt-3"> description.................</p>
                    </div>
                    <div className="mt-5">
                        <h1 className="pb-5">Activity</h1>
                        <Tabs defaultValue="comments" className="w-[400px]">
                            <TabsList className="mb-5">
                                <TabsTrigger value="all">
                                    All
                                </TabsTrigger>
                                <TabsTrigger value="comments">
                                    Comments
                                </TabsTrigger>
                                <TabsTrigger value="history">
                                    History
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="all">
                                all make changes to your account  here
                            </TabsContent>
                            <TabsContent value="history">
                                history make changes to your account  here
                            </TabsContent>
                            <TabsContent value="comments">
                                <CreateCommentForm issueId={issueId}/>
                                <div className="mt-8 space-y-6 border p-5">
                                    {[1,1,1,1].map((item)=><CommentCard key={item}/>)}

                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                </div>
            </ScrollArea>

        </div>


    </div>
  
  
    )
}

export default IssueDetails 