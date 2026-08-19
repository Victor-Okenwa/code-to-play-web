CREATE TABLE `user_entitlements` (
	`user_id` text PRIMARY KEY NOT NULL,
	`is_pro` integer DEFAULT false NOT NULL,
	`polar_subscription_id` text,
	`pro_expires_at` integer,
	`purchased_play_spaces` integer DEFAULT 0 NOT NULL,
	`last_play_space_purchased_at` integer,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
