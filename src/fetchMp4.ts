import fs from "fs";

async function run() {
  const res = await fetch("https://coverr.co/videos/vertical-city-traffic-at-night-1080p-unh9");
  const html = await res.text();
  const match = html.match(/https:\/\/[(a-zA-Z0-9\.\/\-)]+\.mp4/g);
  console.log(match ? match.slice(0, 5) : "No MP4s found");
}

run();
