import ClockHands from './ClockHands';

interface WorldClockProps {
    name: string;
    timezone: number;
    onRemove: () => void;
}

// Geometric calculation of the positioning of the hours (numbers)
const CLOCK_HOURS = Array.from({ length: 12 }, (_, i) => i + 1).map((num) => {
    const angleDegrees = num * 30;
    const angleRadians = (angleDegrees * Math.PI) / 180;
    const radius = 46;
    const center = 60;

    return {
        num,
        left: `${center + radius * Math.sin(angleRadians)}px`,
        top: `${center - radius * Math.cos(angleRadians)}px`,
    };
});

export default function WorldClock({ name, timezone, onRemove }: WorldClockProps) {
    return (
        <div className="clock-card">
            <button className="clock-remove-btn" onClick={onRemove} title="Удалить">
                ✕
            </button>
            <h4 className="clock-title">{name}</h4>

            <div className="analog-clock">
                {CLOCK_HOURS.map(({ num, left, top }) => (
                    <span
                        key={num}
                        className="clock-number"
                        style={{ left, top, transform: 'translate(-50%, -50%)' }}
                    >
                        {num}
                    </span>
                ))}

                <ClockHands timezone={timezone} />

                <div className="clock-center-dot" />
            </div>
        </div>
    );
}
