import { type SyntheticEvent } from 'react';

interface WorldClockFormProps {
    onAddClock: (name: string, timezone: number) => void;
}

export default function WorldClockForm({ onAddClock }: WorldClockFormProps) {
    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('cityName') as string;
        const timezone = formData.get('timezone') as string;

        if (!name || timezone === '') return;

        onAddClock(name.trim(), Number(timezone));
        e.currentTarget.reset();
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', marginBottom: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="cityName" style={{ fontSize: '0.9rem', fontWeight: '500' }}>Название</label>
                <input type="text" id="cityName" name="cityName" required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="timezone" style={{ fontSize: '0.9rem', fontWeight: '500' }}>Временная зона (UTC)</label>
                <input type="number" id="timezone" name="timezone" placeholder="например, 3 или -5" step="0.5" required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '160px' }} />
            </div>

            <button type="submit" style={{ padding: '9px 18px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                Добавить
            </button>
        </form>
    );
}
