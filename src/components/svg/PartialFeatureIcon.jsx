export default function PartialFeatureIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>
            <defs>
                <linearGradient id='halfGreenWhite' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='50%' style={{stopColor: '#22c55e'}}/>
                    <stop offset='50%' style={{stopColor: '#d9f99d'}}/>
                </linearGradient>
            </defs>
            <circle cx='8' cy='8' r='8' fill='url(#halfGreenWhite)'/>
        </svg>
    );
} 