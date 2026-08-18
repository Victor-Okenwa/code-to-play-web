/**
 * OpenNext recreates traced packages with fs.symlinkSync (no link type).
 * On Windows that requires Developer Mode; without it the build dies with EPERM.
 * Use a directory junction, then copy if that still fails.
 */
const fs = require("node:fs");
const path = require("node:path");

if (process.platform === "win32") {
  const originalSymlinkSync = fs.symlinkSync.bind(fs);

  fs.symlinkSync = function symlinkSync(target, linkPath, type) {
    try {
      return originalSymlinkSync(target, linkPath, type ?? "junction");
    } catch (error) {
      if (error && error.code === "EEXIST") {
        return;
      }

      if (
        error &&
        (error.code === "EPERM" ||
          error.code === "ENOTSUP" ||
          error.code === "EISDIR")
      ) {
        const source = path.isAbsolute(target)
          ? target
          : path.resolve(path.dirname(linkPath), target);
        fs.cpSync(source, linkPath, { recursive: true, force: true });
        return;
      }

      throw error;
    }
  };
}
