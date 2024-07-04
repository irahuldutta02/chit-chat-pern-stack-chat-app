import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

export const Home = () => {
  return (
    <div className="flex h-[80vh] w-full max-w-6xl md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border-2 border-slate-500">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
