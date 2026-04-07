import Card from './Card';
import Pulse from './Pulse';

export default function Now({ nowInfo }) {
    return <Card colSpan="md:col-span-1" rowSpan="md:row-span-2">
        <div className="flex justify-between w-full items-start mb-2">
            <div className="flex flex-col">
                <h2>{nowInfo.title}</h2>
                <a href={nowInfo.helpUrl} rel="noreferrer" target="_blank">
                    <span className="text-xs text-gray-500 cursor-pointer">{nowInfo.helpLabel}</span>
                </a>
            </div>
            <Pulse />
        </div>
        <p className="text-xs">{nowInfo.status}</p>
    </Card>
}
