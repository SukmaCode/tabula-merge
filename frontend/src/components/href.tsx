interface HrefProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}
export default function Href({ href, children, className }: HrefProps) {
    return (
        <a href={href} className={`flex items-center justify-center gap-2.5 ${className}`}>
            {children}
        </a>
    )
}
