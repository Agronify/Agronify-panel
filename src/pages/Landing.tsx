export default function LandingPage(){
    return (
        <>
            <div className="w-full h-screen max-h-screen min-h-screen">
                <div className="flex flex-col">
                    <div className="shadow h-15 w-full">
                        <div className="flex flex-col max-w-7xl mx-auto">
                            <div className="flex items-center flex-1">
                                <img src="/logo.png" className="w-[60px] h-[60px]"/>
                                <div className="text-[#2DB46A] text-[40px] font-[700]">Agronify</div>
                                <div className="flex-1 "></div>{/*expand*/}
                                <div className="flex">
                                    <button className="font-semibold text-[#626262] bg-transparent py-3 px-4 border-0 cursor-pointer text-[16px]">Beranda</button>
                                    <button className="font-semibold text-[#626262] bg-transparent py-3 px-4 border-0 cursor-pointer text-[16px]">Fitur</button>
                                    <button className="font-semibold text-[#626262] bg-transparent py-3 px-4 border-0 cursor-pointer text-[16px]">Tentang Kami</button>
                                    <button className="font-semibold text-[#626262] bg-transparent py-3 px-4 border-0 cursor-pointer text-[16px]">Kontak</button>
                                    <button className="font-semibold text-white bg-[#2DB46A] py-3 px-4 text-[16px] border-0 rounded-md">Masuk</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full mt-12 max-w-7xl mx-auto">
                        <div className="flex">
                            <div className="flex flex-col w-2/4">
                                <div className="text-[48px] font-[700]">Lorem ipsum dolor sit amet. <br/>A cursus vestibulum.</div>
                                <div>
                                    Lorem ipsum dolor sit amet consectetur. Quis ac amet mauris 
                                    est arcu. Orci feugiat lectus sit vel consectetur non. Sollicitudin 
                                    sed ac et malesuada. Elementum nec pulvinar nunc sit.
                                </div>
                            </div>
                            <img src="/landing/image1.png" className="ml-auto lg:w-[280px] md:w-[200px] w-[150px]"/>
                        </div>
                    </div>
                </div>
                <div>
                    <img src="/landing/bottom-vector.png" className="w-full"/>
                </div>
            </div>
        </>
    )
}