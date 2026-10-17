import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="w-full py-5">
            <div className="container mx-auto px-4 flex justify-end items-center gap-8">
                <Link
                    href="https://instagram.com"
                    target="_blank"
                    className="text-lg font-medium text-foreground hover:opacity-70 transition-opacity"
                >
                    Instagram.
                </Link>
                <Link
                    href="/contact"
                    className="text-lg font-medium text-foreground hover:opacity-70 transition-opacity"
                >
                    Contact us.
                </Link>
                <Link
                    href="/legal"
                    className="text-lg font-medium text-foreground hover:opacity-70 transition-opacity"
                >
                    Legal notices.
                </Link>
            </div>
        </footer>
    )
}

export default Footer
