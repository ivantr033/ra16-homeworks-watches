import { useState, useEffect } from 'react';

interface ClockHandsProps {
    timezone: number;
}

export default function ClockHands({ timezone }: ClockHandsProps) {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        let intervalId: number;
        const updateTime = () => {
            const now = new Date();
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            setTime(new Date(utc + timezone * 3600000));
        };

        const msUntilNextSecond = 1000 - new Date().getMilliseconds();

        const timeoutId = setTimeout(() => {
            updateTime();
            intervalId = setInterval(updateTime, 1000);
        }, msUntilNextSecond);

        updateTime();

        return () => {
            clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        };
    }, [timezone]);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondsDeg = seconds * 6;
    const minutesDeg = minutes * 6 + seconds * 0.1;
    const hoursDeg = (hours % 12) * 30 + minutes * 0.5;

    return (
        <>
            <div className="hand hour-hand" style={{ transform: `rotate(${hoursDeg}deg)` }} />
            <div className="hand minute-hand" style={{ transform: `rotate(${minutesDeg}deg)` }} />
            <div className="hand second-hand" style={{ transform: `rotate(${secondsDeg}deg)` }} />
        </>
    );
}
