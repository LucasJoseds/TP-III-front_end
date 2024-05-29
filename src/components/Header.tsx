


export default function Header(){

    return(

        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

        <div className="container flex h-14 max-w-screen-2xl items-center">
            <div className="mr-4 hidden md:flex">

            <nav className="flex items-center gap-8 text-sm lg:gap-6">

                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/">Home</a>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="cardapio/cardapio-list">Cardápio</a>
            </nav>

            </div>
        </div>

        </header>
    );
}