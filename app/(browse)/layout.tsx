import Navbar from "./_components/Navbar";

export default function BrowseLayout({children}: {children: React.ReactNode}) {
    return (
        <>

             <h1>Browse Layout</h1>
            <Navbar />
            {children}
        </>
    );
}