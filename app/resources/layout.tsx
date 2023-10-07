export default function ResourcesLayout({
                                            children, // will be a page or nested layout
                                        }: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}