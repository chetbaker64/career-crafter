import horse3d from "src/assets/horse3d.svg"
import plus_square from "src/assets/plus_square.png"
import lion from 'src/assets/lion.svg'
import scorpion from 'src/assets/scorpion.svg'
import goat from 'src/assets/goat.svg'
import { useEffect, useState } from "react"
import { Outlet, Link } from "react-router-dom"
import { Radar } from "react-chartjs-2"
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS} from 'chart.js/auto'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useAtomValue, useSetAtom } from "jotai"
import { swiperIndex } from "src/data/stores"

const data = {
  labels: [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ],
  datasets: [{
    label: '나의 이전 직무 상황',
    data: [65, 59, 90, 81, 56, 55, 40],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }, {
    label: '나의 현재 직무 상황',
    data: [28, 48, 40, 19, 96, 27, 100],
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]
};

function HeaderTest({user}) {
  
  return (
    <div className="w-full flex flex-col justify-start px-5">
      <h1 className="text-3xl font-bold">Hello, {user?.name}</h1>
      <p>오늘은 어떤 내용을 적을까요?</p>
    </div>
  )
}

const categories = [
  {
    category: '오늘의 질문',
    function: () => {}
  },
  {
    category: 'NPC질문',
    function: () => {}
  },
  {
    category: '직무/회사',
    function: () => {}
  },
  {
    category: '관심 키워드',
    function: () => {}
  },
  {
    category: '키워드 분석',
    function: () => {}
  },

]

function Categories() {
  const swiper = useSwiper();
  const activeIndex = useAtomValue(swiperIndex);
  
  return (
    <ul className="flex overflow-auto w-full gap-3 py-2 px-4 text-nowrap">
      {
        categories.map((item, idx) => {
          return (
            <li key={idx}>
              <button 
                className={`w-full h-full p-3 shadow-md ${activeIndex == idx ? 'bg-white text-black' : 'bg-[#303030]'} rounded-lg`} 
                onClick={() => {swiper.slideTo(idx)}}>{item.category}
              </button>
            </li>
          )
        })
      }
    </ul>
  )
}

function MainCard() {
  return (
    <Link to="/questions/오늘의 질문" className="w-[300px] mx-auto min-w-[300px] h-[450px] text-black font-bold text-xl rounded-2xl relative bg-gradient-to-tl from-white to-[#e0f2ff] flex justify-center items-center">
      <div className="flex absolute top-0 left-0 w-full justify-between p-5">
        <h1>오늘의 질문</h1>
        <button>
          <img src={plus_square} alt="" />
        </button>
      </div>
      <img src={horse3d} alt='Main Character'/>
    </Link>
  )
}

function GraphCard() {
  return (
      <Link to="survey/취향이" className="w-[300px] mx-auto min-w-[300px] h-[450px] text-black font-bold text-xl rounded-2xl relative bg-gradient-to-tl from-white to-[#ebffcc] flex justify-center items-center">
        <div className="flex absolute top-0 left-0 w-full justify-between p-5">
          <h1>직무/회사</h1>
          <button>
            <img src={plus_square} alt="" />
          </button>
        </div>
        <Radar data={data}/>
      </Link>
  )
}

function NPCCard() {
  return (
    <Link to="/questions/NPC 질문" className="w-[300px] mx-auto min-w-[300px] h-[450px] text-black font-bold text-xl rounded-2xl relative bg-gradient-to-tl from-white to-[#fee3ff] flex justify-center items-center">
      <div className="flex absolute top-0 left-0 w-full justify-between p-5">
        <h1>NPC 질문</h1>
        <img src={plus_square} alt="" />
      </div>
      <div>
        <img src={scorpion} className="size-[80px]" alt="" />
        <img src={lion} className="size-[80px]" alt="" />
        <img src={goat} className="size-[80px]" alt="" />
      </div>
    </Link>
  )
}

function CardContainer() {
  const setActiveIndex = useSetAtom(swiperIndex);

  return (
    <Swiper 
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={5}
      slidesPerView={1.2}
      effect="fade"
      centeredSlides={true}
      freeMode={true}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      className="w-full h-full"
      >
      <div slot="container-start" className="mb-5"><Categories/></div>
        <SwiperSlide>
          <MainCard/>
        </SwiperSlide>
        <SwiperSlide>
          <NPCCard/>
        </SwiperSlide>
        <SwiperSlide>
          <GraphCard/>
        </SwiperSlide>
    </Swiper>
  )
}

export function HomePage() {
  const [user, setUser] = useState();

  useEffect(() => {
    if(localStorage.getItem('pocketbase_auth')) {
      const currentUser = JSON.parse(localStorage.getItem('pocketbase_auth'));
      setUser(currentUser.model);
    }
  }, [])


  return (
    <div className="bg-primary-bg text-white relative w-full h-full overflow-auto">
      <div
        className="w-full py-5 flex flex-col items-center justify-center gap-4">
        <HeaderTest user={user}/>
        <CardContainer />
      </div>
      <Outlet/>
    </div>
  )
}