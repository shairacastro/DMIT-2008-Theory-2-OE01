import { getCurrentTime, formatTimeParts } from "../lib/helpers";
import Card from "./Card";

import { useState, useEffect, useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};


export default function TimeZoneCard({ timeZone }) {
    const [now, setNow] = useState(() => getCurrentTime());
    const isMounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
    const { clock, dayPeriod, timeZone: timeZoneAbbreviation, full } = formatTimeParts(
        now,
        timeZone?.zone
    );

    useEffect(() => {
        const id = setInterval(() => {
            setNow(getCurrentTime());
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <Card
            colSpan="md:col-span-1 lg:col-span-1"
            rowSpan="md:row-span-2"
            title={timeZone?.title || "Time zone"}
        >
            <time
                className="mt-2 flex min-h-0 flex-1 items-center justify-center w-full whitespace-nowrap text-center leading-none font-serif text-[clamp(1.25rem,4vw,2.125rem)]"
                dateTime={isMounted ? now.toISOString() : undefined}
                id="timeDisplay"
                aria-label={isMounted ? full : "Loading time"}
                suppressHydrationWarning
            >
                <span
                    className="inline-block align-baseline"
                    style={{ fontVariantNumeric: "tabular-nums", fontFeatureSettings: '"tnum" 1' }}
                >
                    {isMounted ? clock : "--:--"}
                </span>
                <span className="ml-2 inline-block min-w-[7ch] text-left text-[0.5em] tracking-[0.08em]">
                    {isMounted ? `${dayPeriod} ${timeZoneAbbreviation}` : ""}
                </span>
            </time>
        </Card>
    );
}
