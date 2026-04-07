import Content from './CardContent';
import Icon from './Icon';

export default function Card({
    title,
    body,
    colSpan,
    rowSpan,
    href,
    target,
    colorText,
    height,
    children,
}) {
    const linkRel = target === "_blank" ? "noreferrer" : undefined;

    return <div
        className={`card flex flex-col h-max sm:h-auto group overflow-hidden transform-y-[-40%] bg-darkslate-500 shadow-lg rounded-lg p-6 border border-solid border-darkslate-100 hover:border-primary-500 align-start flex-none ${height || "h-full"} justify-start relative transform perspective-1200 w-full transition duration-75 ease-in-out col-span-1 ${colSpan || "md:col-span-2"} ${rowSpan || ""}`}
    >
        {
            href ? (
                <a
                    className={`h-full w-full ${colorText || ""}`}
                    href={href}
                    rel={linkRel}
                    target={target}
                >
                    <Icon
                        className="h-6 float-right group-hover:text-primary-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ease-in-out duration-100 z-20" name="ri:arrow-right-up-line"
                    />
                    <Content body={body} title={title}>
                        {children}
                    </Content>
                </a>
            ) : (
                <Content body={body} title={title}>
                    {children}
                </Content>
            )
        }
    </div>
}
