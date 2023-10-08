"use client";

import { useParams, useRouter } from "next/navigation";

export default function Video() {
  const params = useParams();
  const { videoId } = params;

  const router = useRouter();

  return <div>Video - {videoId}</div>;
}
