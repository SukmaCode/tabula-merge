export default function Card({ header, subheader }: { header: string; subheader: string }) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-2 sm:p-3 border-2 border-black shadow-hard">
            <span className="text-2xl sm:text-3xl font-extrabold text-excel-primary font-mono leading-tight mb-1">
                {header}
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-600">
                {subheader}
            </span>
        </div>
    )
}
