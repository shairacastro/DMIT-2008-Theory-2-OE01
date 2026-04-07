import Card from './Card';

export default function ContactsCard({ contacts }) {
    const email = contacts.email;
    const [emailLocalPart, emailDomainPart] = email.split("@");

    return <Card colSpan="md:col-span-1" rowSpan="md:row-span-5">
        <div className="h-full">
            <header className="flex items-center">
                <h1 className="text-white text-xl font-bold">
                    {contacts.title}
                </h1>
            </header>
            <address className="flex flex-col mt-4">
                <h2 className="text-gray-500">{contacts.contactDetailsTitle}</h2>
                <p className="max-w-full leading-tight" title={email}>
                    <span className="block">{emailLocalPart}</span>
                    <span className="block truncate">@{emailDomainPart}</span>
                </p>
                <p>{contacts.location}</p>
            </address>
            <div className="flex flex-col mt-4 w-fit">
                <h2 className="text-gray-500">{contacts.socialsTitle}</h2>
                <ul className="list-none">
                    {contacts.socialLinks.map((socialLink) => (
                        <li key={socialLink.label}>
                            <a href={socialLink.url} rel="noreferrer" target="_blank">
                                {socialLink.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </Card>
}
