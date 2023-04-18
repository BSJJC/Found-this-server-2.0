import bgIDs from "./randomTopicBgs.json";

const ids: Array<string> = bgIDs.bgIDs;

function generateRandomTopicBd(): string {
  return ids[Math.floor(Math.random() * ids.length)];
}

export default generateRandomTopicBd;
