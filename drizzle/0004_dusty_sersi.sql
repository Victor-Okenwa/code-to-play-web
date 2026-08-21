CREATE TABLE `extension_changelog` (
	`id` text PRIMARY KEY NOT NULL,
	`markdown` text NOT NULL,
	`fetched_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `extension_stats` (
	`id` text PRIMARY KEY NOT NULL,
	`installs` integer NOT NULL,
	`version` text NOT NULL,
	`vscode_engine` text NOT NULL,
	`fetched_at` integer NOT NULL
);
