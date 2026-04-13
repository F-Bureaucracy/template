import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";

export function NotFound() {
	return (
		<Empty className="h-screen">
			<EmptyHeader>
				<EmptyTitle>404 - Not Found</EmptyTitle>
				<EmptyDescription>
					The page you&apos;re looking for doesn&apos;t exist. Return to your
					home page to get back on track.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent className="flex flex-col items-center gap-4">
				<Button asChild>
					<Link to="/">Go back to home</Link>
				</Button>
			</EmptyContent>
		</Empty>
	);
}
