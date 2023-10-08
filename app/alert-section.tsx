export interface AlertSectionType {
    imageUrl: string;
    heading: string;
    text: string;
}

export default function AlertSection({
                                         imageUrl, heading, text
                                     }: AlertSectionType) {
    return (
        <>
            <article className="group">
                <img
                    alt="Lava"
                    src={imageUrl}
                    className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
                />

                <div className="pt-4">
                    <a href="#">
                        <h3 className="text-lg font-medium text-gray-900">
                            {heading}
                        </h3>
                    </a>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        {text}
                    </p>
                </div>
            </article>

        </>
    );
}