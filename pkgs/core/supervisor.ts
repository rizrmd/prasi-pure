import type { Subprocess, SyncSubprocess } from "bun";

const g = global as unknown as {
  child: SyncSubprocess<"inherit", "inherit">;
};

while (true) {
  g.child = Bun.spawnSync({
    cmd: ["bun", "run", "--hot", "pkgs/core/start.ts"],
    stdio: ["inherit", "inherit", "inherit"],
  });
  console.log("Main process Exit Code:", g.child.exitCode, ", Restarting...");
}
