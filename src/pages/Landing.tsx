export default function LandingPage() {
  return (
    <>
      <div className="w-full h-screen min-h-screen">
        <div className="flex flex-col">
          <div className="shadow h-15 w-full">
            <div className="flex flex-col max-w-7xl mx-auto">
              <div className="flex items-center flex-1">
                <img src="/logo.png" className="w-[60px] h-[60px]" />
                <div className="text-[#2DB46A] text-[40px] font-[700]">
                  Agronify
                </div>
                <div className="flex-1 "></div>
                {/*expand*/}
                <div className="flex">
                  <button className="font-semibold text-[#626262] bg-transparent py-3 px-4 border-0 cursor-pointer text-[16px]">
                    Beranda
                  </button>
                  <button className="font-semibold text-[#626262] bg-transparent py-3 px-4 border-0 cursor-pointer text-[16px]">
                    Fitur
                  </button>
                  <button className="font-semibold text-[#626262] bg-transparent py-3 px-4 border-0 cursor-pointer text-[16px]">
                    Tentang Kami
                  </button>
                  <button className="font-semibold text-[#626262] bg-transparent py-3 px-4 border-0 cursor-pointer text-[16px]">
                    Kontak
                  </button>
                  <button className="font-semibold text-white bg-[#2DB46A] py-3 px-4 text-[16px] border-0 rounded-md">
                    Masuk
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mt-24 max-w-7xl mx-auto">
            <div className="flex">
              <div className="flex flex-col w-2/3">
                <div className="text-[54px] font-[700]">
                  Lorem ipsum dolor sit amet. <br />A cursus vestibulum.
                </div>
                <div className="text-[24px] w-4/5 text-[#626262] mt-[30px]">
                  Agronify adalah solusi lengkap untuk memajukan pertanian Anda.
                  Dengan teknologi terbaru dan fitur inovatif, kami membantu
                  petani meningkatkan produktivitas mereka,
                </div>
              </div>
              <img
                src="/landing/image1.png"
                className="ml-auto lg:w-[400px] md:w-[300px] w-[250px]"
              />
            </div>
          </div>
        </div>
        <div>
          <img src="/landing/bottom-vector.png" className="w-full mt-16" />
        </div>
        <div className="flex flex-col w-full mt-6">
          <div className="flex flex-col max-w-4xl mx-auto text-center">
            <div className="text-[48px] font-bold">Fitur Aplikasi</div>
            <div className="text-[20px] text-[#626262]">
              Lorem ipsum dolor sit amet consectetur. Quis ac amet mauris est
              arcu. Orci feugiat lectus sit vel consectetur non. Sollicitudin
              sed ac et malesuada.
            </div>
          </div>
          <div className="flex max-w-7xl mx-auto mt-[80px] pb-16">
            <div className="flex-1 flex flex-col mr-[64px]">
              <div className="flex w-full space-x-8">
                <div className="flex-1 flex flex-col">
                  <div className="text-[24px] font-bold">AgroWeather</div>
                  <div className="">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Hic iste nobis, dicta a provident suscipit quod blanditiis
                    dolores ratione? Earum sed enim provident doloribus
                    laboriosam tempore dignissimos magnam nihil illo.
                  </div>
                </div>
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="50" height="50" rx="10" fill="#33B86A" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M33.1773 22.5534C33.1773 22.5534 33.3308 23.3333 33.3833 23.3408C36.2114 23.7441 38.3333 25.3937 38.3333 28.3333C38.3333 31.555 35.7217 34.1666 32.5 34.1666H17.5C14.2783 34.1666 11.6667 31.555 11.6667 28.3333C11.6667 25.3937 13.841 22.962 16.6691 22.5587C16.7215 22.5512 16.7729 22.5496 16.8227 22.5534C17.5741 18.7231 20.9496 15.8333 25 15.8333C29.0504 15.8333 32.4259 18.7231 33.1773 22.5534Z"
                    fill="#FAEBC8"
                  />
                  <path
                    d="M32.5 34.1666H32.8431C35.8753 34.1666 38.3333 31.7726 38.3333 28.8194C38.3333 26.1152 36.2723 23.8799 33.5967 23.5222C33.2247 19.2156 29.5179 15.8333 25 15.8333C21.0036 15.8333 17.6418 18.4799 16.6615 22.0716C13.8098 22.6471 11.6667 25.1076 11.6667 28.0555C11.6667 31.2862 14.2405 33.9313 17.5 34.1518"
                    stroke="#FAEBC8"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M22.5 33.75C22.5 34.4404 21.9404 35 21.25 35C20.5596 35 20 34.4404 20 33.75C20 33.0596 20.5596 32.5 21.25 32.5C21.9404 32.5 22.5 33.0596 22.5 33.75Z"
                    fill="#FAEBC8"
                  />
                  <path
                    d="M26.25 35.4167C26.25 36.107 25.6904 36.6667 25 36.6667C24.3096 36.6667 23.75 36.107 23.75 35.4167C23.75 34.7263 24.3096 34.1667 25 34.1667C25.6904 34.1667 26.25 34.7263 26.25 35.4167Z"
                    fill="#FAEBC8"
                  />
                  <path
                    d="M26.25 31.25C26.25 31.9404 25.6904 32.5 25 32.5C24.3096 32.5 23.75 31.9404 23.75 31.25C23.75 30.5596 24.3096 30 25 30C25.6904 30 26.25 30.5596 26.25 31.25Z"
                    fill="#FAEBC8"
                  />
                  <path
                    d="M30 33.75C30 34.4404 29.4404 35 28.75 35C28.0596 35 27.5 34.4404 27.5 33.75C27.5 33.0596 28.0596 32.5 28.75 32.5C29.4404 32.5 30 33.0596 30 33.75Z"
                    fill="#FAEBC8"
                  />
                  <path
                    d="M22.5 37.0833C22.5 37.7737 21.9404 38.3333 21.25 38.3333C20.5596 38.3333 20 37.7737 20 37.0833C20 36.393 20.5596 35.8333 21.25 35.8333C21.9404 35.8333 22.5 36.393 22.5 37.0833Z"
                    fill="#FAEBC8"
                  />
                  <path
                    d="M30 37.0833C30 37.7737 29.4404 38.3333 28.75 38.3333C28.0596 38.3333 27.5 37.7737 27.5 37.0833C27.5 36.393 28.0596 35.8333 28.75 35.8333C29.4404 35.8333 30 36.393 30 37.0833Z"
                    fill="#FAEBC8"
                  />
                </svg>
              </div>
            </div>
            <img src="/landing/image2.png" className="w-[320px]" />
            <div className="flex-1 ml-12">aa</div>
          </div>
        </div>
      </div>
    </>
  );
}
