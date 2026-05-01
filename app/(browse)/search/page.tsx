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
    <div>
        <Results term={term}/>
    </div>
  )
}