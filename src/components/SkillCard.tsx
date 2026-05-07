import { Link } from "@tanstack/react-router";
import {
	ArrowBigUp,
	ArrowRight,
	Bookmark,
	Check,
	Copy,
	MessageSquare,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SkillCard = ({
	authorEmail,
	category,
	createdAt,
	description,
	installCommand,
	tags,
	title,
}: SkillRecord) => {
	const [copied, setCopied] = useState(false);
	const timeoutRef = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				window.clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleCopy = () => {
		navigator.clipboard.writeText(installCommand).then(() => {
			setCopied(true);
			if (timeoutRef.current) {
				window.clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
		});
	};

	return (
		<article className="skill-card">
			<Link
				to="/skills"
				tabIndex={-1}
				aria-label={`Open ${title}`}
				className="overlay"
			/>
			<div className="chrome">
				<div className="chrome-bar">
					<div className="lights">
						<div className="light red"></div>
						<div className="light amber"></div>
						<div className="light green"></div>
					</div>
					<div className="host">registry.sh</div>
				</div>
			</div>

			<div className="body">
				<div className="meta">
					<div className="author">
						<img src="/logo512.png" alt="author avater" className="avatar" />
						<div className="author-copy">
							<p>Ragib</p>
							<p>{new Date(createdAt as string).toLocaleDateString()}</p>
						</div>
					</div>
					<p className="category">{category}</p>
				</div>
				<div className="summary">
					<Link to="/skills" className="title-link">
						<h3>{title}</h3>
					</Link>
					<p>{description}</p>
				</div>
				<div className="command">
					<div className="command-copy">
						<span>{">_"}</span>
						<p>{installCommand}</p>
					</div>
					<button
						type="button"
						className="copy"
						aria-label={copied ? "Command copied" : "Copy install command"}
						onClick={handleCopy}
					>
						{copied ? <Check size={16} /> : <Copy size={16} />}
					</button>
				</div>
				<div className="footer">
					<div className="stats">
						<button type="button" className="upvote" disabled>
							<ArrowBigUp size={16} fill="currentColor" />
							<span>{tags.length}</span>
						</button>
						<div className="comments">
							<MessageSquare size={14} />
							<span>{authorEmail ? 1 : 0}</span>
						</div>
					</div>
					<div className="actions">
						<Link to="/skills" className="open" title={`Open ${title}`}>
							<span>Open</span>
							<ArrowRight size={14} />
						</Link>

						<button
							type="button"
							className="save"
							aria-label="Saved state"
							disabled
						>
							<Bookmark size={16} />
						</button>
					</div>
				</div>
			</div>
		</article>
	);
};

export default SkillCard;
