import { Milliseconds } from "./aliases";

export async function sleep(ms: Milliseconds): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}