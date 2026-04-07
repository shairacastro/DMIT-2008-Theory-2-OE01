import Card from './Card';

export default function AboutMe({ about }) {
    return <Card colSpan="md:col-span-1" rowSpan="md:row-span-6" title={about.title}>
        <div className="flex flex-col gap-2">
            <div className="text-sm font-light">
                <p>
                    {about.intro}
                    <br />
                    {about.toolsIntro}
                </p>
                <ul className="list-disc list-inside">
                    {about.tools.map((tool) => (
                        <li key={tool}>{tool}</li>
                    ))}
                </ul>
            </div>
            <p className="text-sm font-light">
                {about.passion}
            </p>
            <p className="text-sm font-light">
                {about.approach}
            </p>
        </div>
    </Card>
}
