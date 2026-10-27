import React, { useId } from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-9 w-auto", ...props }) => {
    const rawId = useId();
    const id = rawId.replace(/[^a-zA-Z0-9_-]/g, "");

    const cId = `turrim-c-${id}`;
    const dId = `turrim-d-${id}`;
    const eId = `turrim-e-${id}`;
    const fId = `turrim-f-${id}`;
    const gId = `turrim-g-${id}`;
    const hId = `turrim-h-${id}`;
    const iId = `turrim-i-${id}`;
    const jId = `turrim-j-${id}`;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 342.73 111.424"
            className={className}
            role="img"
            aria-label="Turrim Logo"
            {...props}
        >
            <defs>
                <clipPath id={cId}>
                    <rect width="107.117" height="111.424" fill="none" />
                </clipPath>
                <clipPath id={dId}>
                    <rect width="107.117" height="111.424" fill="none" />
                </clipPath>
                <clipPath id={eId}>
                    <rect x="0.059" y="18.702" width="53.499" height="80.309" fill="none" />
                </clipPath>
                <clipPath id={fId}>
                    <rect x="0.059" y="18.702" width="53.499" height="80.309" fill="none" />
                </clipPath>
                <clipPath id={gId}>
                    <rect x="0.059" y="0.059" width="106.999" height="49.53" fill="none" />
                </clipPath>
                <clipPath id={hId}>
                    <rect x="0.059" y="0.059" width="106.999" height="49.53" fill="none" />
                </clipPath>
                <clipPath id={iId}>
                    <rect x="53.558" y="18.702" width="53.499" height="92.664" fill="none" />
                </clipPath>
                <clipPath id={jId}>
                    <rect x="53.558" y="18.702" width="53.499" height="92.664" fill="none" />
                </clipPath>
            </defs>
            <g id={`artwork-${id}`} data-name="Artwork 3">
                <g clipPath={`url(#${cId})`}>
                    <g clipPath={`url(#${dId})`}>
                        <g clipPath={`url(#${eId})`}>
                            <g clipPath={`url(#${fId})`}>
                                <polygon
                                    points="53.558 49.589 53.558 68.121 32.159 55.766 32.159 99.011 21.458 92.832 21.458 49.589 0.059 37.234 0.059 18.702 53.558 49.589"
                                    fill="#ff9a15"
                                />
                            </g>
                        </g>
                        <g clipPath={`url(#${gId})`}>
                            <g clipPath={`url(#${hId})`}>
                                <path
                                    d="M107.058,18.702l-53.499,30.887L.059,18.702,26.81,3.258c7.385-4.266,19.362-4.266,26.749,0,7.387,4.263,7.387,11.178,0,15.444h53.499Z"
                                    fill="#049300"
                                />
                            </g>
                        </g>
                        <g clipPath={`url(#${iId})`}>
                            <g clipPath={`url(#${jId})`}>
                                <polygon
                                    points="107.058 18.702 107.058 80.477 53.558 111.366 53.558 49.589 80.309 58.856 107.058 18.702"
                                    fill="#ffec00"
                                />
                            </g>
                        </g>
                    </g>
                </g>
            </g>
            <g className="fill-[#1d1939] dark:fill-foreground transition-colors duration-200">
                <path d="M126.59,33.876h-13.033v-10.657h39.892v10.657h-13.033v36.867h-13.825v-36.867Z" />
                <path d="M156.254,59.87v-20.81h4.32c4.536,0,6.192-.144,8.209-.72v18.578c0,3.024,1.224,3.961,3.312,3.961,3.673,0,6.049-2.881,6.049-7.705v-14.113h4.32c4.536,0,6.192-.144,8.209-.72v32.403h-12.529v-4.464c-2.304,3.312-6.336,5.185-11.089,5.185-6.48,0-10.801-3.601-10.801-11.594Z" />
                <path d="M198.589,39.061h4.32c4.393,0,6.192-.144,8.209-.72v6.048c2.016-4.464,5.04-6.048,8.353-6.048,3.673,0,6.696,1.872,8.641,5.617l-8.208,7.705c-1.225-1.872-2.448-2.592-3.961-2.592-2.809,0-4.824,2.592-4.824,6.553v15.121h-12.529v-31.683Z" />
                <path d="M230.629,39.061h4.32c4.392,0,6.192-.144,8.208-.72v6.048c2.017-4.464,5.041-6.048,8.354-6.048,3.672,0,6.696,1.872,8.641,5.617l-8.209,7.705c-1.224-1.872-2.448-2.592-3.96-2.592-2.809,0-4.825,2.592-4.825,6.553v15.121h-12.528v-31.683Z" />
                <path d="M262.092,29.268c0-3.816,2.952-6.769,6.841-6.769s6.84,2.952,6.84,6.769-2.952,6.769-6.84,6.769-6.841-2.952-6.841-6.769ZM262.668,39.061h4.32c3.528,0,5.76-.072,8.208-.72v32.403h-12.528v-31.683Z" />
                <path d="M283.116,39.061h4.32c4.536,0,6.192-.144,8.208-.72v5.256c2.232-3.312,6.265-5.256,10.945-5.256,4.536,0,7.993,1.872,9.648,5.833,2.305-3.672,6.481-5.833,11.737-5.833,6.553,0,10.873,3.601,10.873,11.593v20.81h-12.529v-17.857c0-3.024-1.224-3.96-3.168-3.96-3.528,0-5.904,2.88-5.904,7.705v14.113h-12.529v-17.857c0-3.024-1.225-3.96-3.168-3.96-3.528,0-5.905,2.88-5.905,7.705v14.113h-12.528v-31.683Z" />
            </g>
        </svg>
    );
};

export default Logo;
