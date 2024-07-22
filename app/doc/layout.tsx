import LiveBlocksProviderHigher from "@/components/LiveBlocksProviderHigher";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <LiveBlocksProviderHigher>{children}</LiveBlocksProviderHigher>;
};
export default PageLayout;
