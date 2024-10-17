import React, { useEffect, useState } from "react"
import { bear, coin, highVoltage, notcoin, rocket, trophy } from "./images"

const App = () => {

  const [points, setPoints] = useState(27362352)
  const [energy, setEnergy] = useState(3535)
  
  const [clicks,setClicks] = useState<{id:number,x:number,y:number}[]>([])
  const pointsToAdd = 12
  const energyToReduce = 12
 
  const handleClick = (e:React.MouseEvent<HTMLDivElement>)=>{

    if(energy - energyToReduce < 0){
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPoints(points + pointsToAdd)
    setEnergy(energy - energyToReduce < 0 ? 0:energy-energyToReduce)

    setClicks([...clicks,{id:Date.now(),x,y}])

  }

  const handleAnimationEnd = (id:number)=>{
    setClicks((prevClicks) =>prevClicks.filter(click => click.id !== id))
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
        setEnergy((prevEnergy)=>Math.min(prevEnergy +1, 6500))
    },100)
    return ()=> clearInterval(interval)
  },[])

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>

        <div className="w-full z-10 min-h-scree flex flex-col items-center text-white"></div>
        {/* top fisex div */}
         <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
          {/* join suqad functionality */}
         <div className="w-full cursor-pointer">
          <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
            <p className="text-lg">Join Squad</p>
          </div>
         </div>
        {/* main coins functionality */}
        <div className="mt-12 text-5xl font-bold flex items-center">
          <img src={coin} alt="Coin" width={44} height={44} />
          <span className="ml-2">{points.toLocaleString()}</span>
        </div>

        {/* trophy icons functionality */}
        <div className="text-base mt-2 flex items-cetner">
          <img src={trophy} alt="trophy" width={24} height={24} />
          <span className="ml-1">Gold</span>
        </div>


         </div>
         {/* bottom fixed div element */}

         <div className="fixed w-full bottom-0 left-0 px-4 pb-8 z-10">
          <div className="w-full flex justify-between gap-2">
            {/* energy points */}
            <div className="w-1/3 flex items-center justify-center max-w-32">
            <div className="flex items-cetner justify-center">
              <img src={highVoltage} alt="high voltage" height={44} width={44} />
              <div className="ml-2 text-left">
                <span className="text-white text-2xl font-bold block">{energy}</span>
                <span className="text-white text-large opacity-75">/ 6500</span>

              </div>
            </div>

            </div>
            {/* frends boosts section */}
            <div className="flex-grow flex items-center max-w-60 text-sm">
              <div className="w-full bg-[#fad258] py-4 rounded-2xl flex justify-around">
                <button className="flex flex-col gap-1 items-center">
                  <img src={bear} alt="br" width={24} height={24} />
                  <span>Frends</span>
                </button>

                <div className="h-[48px] w-[2px] bg-[#fddb]"></div> 

                <button className="flex flex-col gap-1 items-center">
                  <img src={coin} alt="br" width={24} height={24} />
                  <span>Earn</span>
                </button>

                <div className="h-[48px] w-[2px] bg-[#fddb]"></div>

                <button className="flex flex-col gap-1 items-center">
                  <img src={rocket} alt="br" width={24} height={24} />
                  <span>Boosts</span>
                </button>
              </div>
            </div>

          </div>
              {/* progress bar element */}

              <div className="w-full rounded-full bg-[#f9c035] mt-4">
                <div className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full" style={{width:`${(energy/6500)*100}%`}}></div>

              </div>
         </div>

      </div>
         <div className="flex-grow flex items-center justify-center">
          <div className="relative mt-4" onClick={handleClick}>
            <img src={notcoin} height={256} width={256} alt="notcoin" />

              {/* {clicks.map((click)=>{
                <div
                  key={click.id}
                  className = "absolute text-5xl font-bold opacity-0"
                  style={{
                    top: `${click.y - 42}px`,
                    left: `${click.x -28}px`,
                    animation: `float 1s ease-out`
                  }}
                  onAnimationEnd={()=> handleAnimationEnd(click.id)}
                  >
                    12
                </div>
              })} */}

{clicks.map((click) => {
  return (
    <div
      key={click.id}
      className="absolute text-5xl font-bold opacity-0"
      style={{
        top: `${click.y - 42}px`,
        left: `${click.x - 28}px`,
        animation: `float 1s ease-out`
      }}
      onAnimationEnd={() => handleAnimationEnd(click.id)}
    >
      12
    </div>
  );
})}



          </div>
         </div>

    </div>
    
  )
}

export default App