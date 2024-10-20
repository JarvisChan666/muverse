import getSongs from "@/actions/getSongs";
import { Header } from "@/components/Header";
import { ListItem } from "@/components/ListItem";
import Image from "next/image";
import { PageContent } from "./_components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
   <div className="
   bg-neutral-900
   rounded-lg
   h-full
   w-full
   overflow-hidden
   overflow-y-auto
   ">
     <Header>
      {/* The text under the header, passed as children in header component */}
      <div className="mb-2">
        <h1 className="
          text-white
          text-3xl
          font-semibold
        ">
          Happy birthday to Jelly Chen!!!
        </h1> 
        {/* small device 2 columns, and so on */}
        {/* grid-template-columns: repeat(1, minmax(0, 1fr)); */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl-grid-cols-3
          2xl-grid-cols-4
          gap-3
          mt-4
        ">
          <ListItem 
              image="/images/liked.png" name="Liked Songs" href="liked"          
              />
        </div>
      </div>
     </Header>
     <div className="mt-2 mb-7 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">
          Songs for Jelly
        </h1>
      </div>
      <PageContent songs={songs}/>
     </div>
   </div>
  );
}
