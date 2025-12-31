import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function MainPage({ name, balance }) {

  const navigate = useNavigate();

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  
  return (
    <div className="min-h-screen w-full p-3">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        {/* LEFT 70% */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          {/* Top-left card */}
          <div className="rounded-lg bg-[#C1CB79] p-4 h-[30vh] p-8">
            <div className="h-10 w-40 b bg-[#F7EF7D] rounded-lg px-3 flex items-center">
              {now.toLocaleString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            <div className="mt-6 flex items-center justify-between h-1/2">
              <div>
                <div className="text-2xl font-bold">good day, {name}</div>
                <div className="text-sm">spend wisely</div>
              </div>
              <img src="moneyman.png" width={225} />
             
            </div>
          </div>

          {/* Bottom-left chart card */}
          <div className="rounded-lg  bg-[#C1CB79] p-4 flex-1 min-h-[66vh]">
            <div className="h-full w-full rounded-lg flex items-center justify-center">
              chart area
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-3">
          {/* Top-right overview */}
          <div className="rounded-lg bg-[#C1CB79] p-4 h-[30vh]">
            <div className="text-2xl font-extrabold tracking-wide  bg-[#F7EF7D] rounded-lg p-4 content-center text-center">OVERVIEW</div>
            <div className="mt-2 text-sm">
              account overview
              <ul className="list-disc pl-5 mt-2">
                <li>{balance}</li>
                <li>savings</li>
              </ul>
            </div>
            <div className="mt-4 flex justify-center">
              <button className="h-10 w-10 rounded-full border-2 border-black bg-lime-100"
              onClick={() => navigate("/transactions")}>
                →
              </button>
            </div>
          </div>

          {/* Bottom-right savings */}
          <div className="rounded-lg bg-[#C1CB79] p-4 flex-1 h-[66vh]">
            <div className="text-2xl font-extrabold tracking-wide bg-[#F7EF7D] rounded-lg p-4 content-center text-center">SAVINGS</div>

            <div className="mt-6 flex justify-center">
              <button className="h-10 w-10 rounded-full border-2 border-black bg-lime-100" 
              onClick={() => navigate("/savings")}>
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
