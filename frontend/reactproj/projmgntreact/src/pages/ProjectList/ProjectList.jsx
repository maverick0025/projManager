import { Card, CardContent } from "../../components/ui/card";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import React from "react";
import { ScrollArea } from "../../components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";


const tags = [
    "all","react","nextjs","spring boot", "mysql", "mongodb", "angular", "python", "flask", "django", "java"
];

const ProjectList = () => {
  const handleFilterChange = (filtered, value) => {
    console.log("filtered: "+ filtered + ", value:"  + value);
  };

  return (
    <>
      {/* <div>Hello there from project list</div> */}
      <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
        <section className="filter section">
          <Card className="p-5 sticky top-10">
            <div className="flex justify-between lg:w-[20rem]">
              <p className="text-xl -tracking-wider">Filters</p>
              <Button variant="ghost" size="icon">
                <MixerHorizontalIcon />
              </Button>
            </div>

            <CardContent className="mt-5">
              <ScrollArea className="space-y-7 h-[70vh]">
                
                <div>
                  <h1 className="pb-3 text-gray-400 border-b">Category</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className='space-y-4' 
                      defaultValue="all"
                      onValueChange={(value) =>
                        handleFilterChange("category", value)
                      }
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="all" id="r1" />
                        <Label htmlFor="r1"> all</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="fullstack" id="r2" />
                        <Label htmlFor="r2"> Full-stack</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="frontend" id="r3" />
                        <Label htmlFor="r3"> Frontend</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="backend" id="r4" />
                        <Label htmlFor="r4"> Backend</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="pt-5"></div>
                </div>

                <div className="pt-9">
                  <h1 className="pb-3 text-gray-400 border-b"> Tag </h1>
                  <div className="pt-5">
                    <RadioGroup
                    className='space-y-4'
                      defaultValue="all"
                      onValueChange={(value) =>
                        handleFilterChange("tag", value)
                      }
                    >
                        {tags.map((item)=>
                            <div key={item} className="flex items-center gap-2">
                            <RadioGroupItem value={item} id={`r1-${item}`} />
                            <Label htmlFor={`r1-${item}`}> {item}</Label>
                            </div>
                        )
                        }
                      

                    </RadioGroup>
                  </div>
                  <div className="pt-5"></div>
                </div>

              </ScrollArea>
            </CardContent>
          </Card>
        </section>

        <section className="projectListSection w-full lg:w-[48rem]"></section>
      </div>
    </>
  );
};

export default ProjectList;
