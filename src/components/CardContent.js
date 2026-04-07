export default function CardContent({ title, body, children }) {
    return <>
        {title && <h2 className="text-xl font-bold m-0 z-20">{title}</h2>}
        {body && <p className="m-0 font-light text-base flex flex-col">{body}</p>}
        {children}
    </>
}