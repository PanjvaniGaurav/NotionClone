"use client";
import { LiveblocksProvider } from "@liveblocks/react/suspense";

const LiveBlocksProviderHigher = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  if (!process.env.NEXT_PUBLIC_LIVE_BLOCKS_API_KEY) {
    throw new Error("NEXT_PUBLIC_LIVE_BLOCKS_API_KEY is required");
  }
  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>
      {children}
    </LiveblocksProvider>
  );
};
export default LiveBlocksProviderHigher;
