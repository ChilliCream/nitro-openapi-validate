import * as core from "@actions/core";
import * as exec from "@actions/exec";
import {
  installNitro,
  getCommentMode,
} from "@chillicream/nitro-github-actions";
import pkg from "../package.json" with { type: "json" };

const nitroVersion: string = pkg.version;

async function executeCommand(): Promise<void> {
  try {
    const stage = core.getInput("stage", { required: true });
    const openapiCollectionId = core.getInput("openapi-collection-id", {
      required: true,
    });
    const apiKey = core.getInput("api-key", { required: true });
    const cloudUrl = core.getInput("cloud-url") || null;
    getCommentMode();

    const patterns = core.getMultilineInput("patterns", { required: true });

    const args: string[] = [
      "openapi",
      "validate",
      "--stage",
      stage,
      "--openapi-collection-id",
      openapiCollectionId,
    ];

    for (const pattern of patterns) {
      args.push("--pattern", pattern);
    }

    if (cloudUrl) {
      args.push("--cloud-url", cloudUrl);
    }

    const env = {
      ...process.env,
      NITRO_API_KEY: apiKey,
    };

    const exitCode = await exec.exec("nitro", args, { env });

    if (exitCode !== 0) {
      core.setFailed(`Nitro CLI exited with code ${exitCode}`);
    }
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
  }
}

async function run(): Promise<void> {
  await installNitro(nitroVersion);

  await executeCommand();
}

run();
