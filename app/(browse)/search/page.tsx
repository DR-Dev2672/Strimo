import { redirect } from "next/navigation";
import { Results } from "./_components/results";

interface SearchPageProps{
    searchParams:Promise<{
        term?:string
    }>
}

export default async function  SearchPage ({
    searchParams
}:SearchPageProps){
  const params=await searchParams;
  const term=params.term;
  if(!term){
    redirect("/")
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
        <Results term={term}/>
    </div>
  )
}