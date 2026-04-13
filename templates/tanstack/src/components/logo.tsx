import { cn } from "@/lib/utils";

export const Logo = ({
	className,
	color = "#0B2869",
	scale = 1.2,
}: {
	className?: string;
	color?: string;
	scale?: number;
}) => {
	return (
		<div
			style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
		>
			<svg
				width="100"
				height="100"
				viewBox="0 0 100 100"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={cn("h-5 w-auto text-foreground", className)}
			>
				<title>F-Bureaucracy Logo</title>
				<path
					d="M90 90H0V0H90V90ZM9 81H81V9H9V81ZM70 29H30V40H60V49H30V70H21V20H70V29Z"
					fill={color}
				/>
			</svg>
		</div>
	);
};
