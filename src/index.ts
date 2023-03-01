import { CronJob } from "cron";
import { backup } from "./backup";
import { env } from "./env";
const { Logtail } = require("@logtail/node");
const logtail = new Logtail("DPGZp6h2rCAezgeU5N6QntZN");

const job = new CronJob(env.BACKUP_CRON_SCHEDULE, async () => {
  try {
    await backup();
  } catch (error) {
    console.error("Error while running weekly backup: ", error)
    logtail.error("Error while running weekly backup", error);
  }
});

job.start();

console.log("Backup cron scheduled...")
logtail.info("Backup cron scheduled...");
logtail.flush()